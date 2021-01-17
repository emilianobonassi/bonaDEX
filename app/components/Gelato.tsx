import React, { FC, useEffect, useState } from 'react'
import useSigner from 'hooks/useSigner'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core'
import * as dsaSdk from 'dsa-sdk'
import Web3 from 'web3'
import { getAutoLiquidationSpells, getGelatoGasPrice, setupGelato, submitTask } from 'services/gelato'
import useSharedState from 'hooks/useSharedState'
import { getDSA, getMainnetDeployedContracts } from 'utils/contracts'
import { GAS_LIMIT, MIN_COL_RATIO_MAKER } from 'utils/constants'
import { BigNumber, ethers } from 'ethers'
import useSWR from 'swr'

const useStyles = makeStyles(() => ({
  dsaMod: {
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingRight: '20px',
    paddingLeft: '20px',
  },
}))

export const getDSAInstance = async (userAddress: string): Promise<any> => {
  const dsa = new dsaSdk(new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545/')))
  const accounts = await dsa.getAccounts(userAddress)
  dsa.setInstance(accounts[0].id)
  return dsa
}

export const getColRatio = (col: string, price: string, debt: string): string => {
  if (col === '0' || debt === '0') return ethers.utils.parseUnits('0').toString()
  const colRatio = BigNumber.from(ethers.utils.parseUnits(col))
    .mul(ethers.utils.parseUnits(price))
    .div(ethers.utils.parseUnits(debt))
  return colRatio.toString()
}

const getCanExec = async (taskReceipt: any, gelatoExecutor: ethers.providers.JsonRpcSigner) => {
  const { GelatoCore } = getMainnetDeployedContracts(gelatoExecutor)

  const gelatoGasPrice = await getGelatoGasPrice(gelatoExecutor)
  const canExec = await GelatoCore.connect(gelatoExecutor).canExec(taskReceipt, GAS_LIMIT, gelatoGasPrice)
  return canExec
}

const updateMockPrice = async (signer: any, price: string) => {
  const { PriceOracleResolver } = getMainnetDeployedContracts(signer)
  const tx = await PriceOracleResolver.setMockPrice(price)
  await tx.wait()
}

const Gelato: FC<{ dsaBalance: string; mutateDsaBalance(): Promise<string> }> = ({ dsaBalance, mutateDsaBalance }) => {
  const classes = useStyles()

  const { gelatoExecutor, gelatoProvider, address: userAddress, signer: user, masterSigner } = useSigner()
  const {
    vaultIsCreated,
    updateSharedState,
    gelatoIsReady,
    dsaAddress,
    vaultId,
    vaultHasDebt,
    taskReceipt,
    mockedPrice,
    mockPriceExecuted,
    taskExecuted,
    initialCol,
    initialDebt,
  } = useSharedState()

  const [vault, setVault] = useState<any>()
  const [disabled, setDisabled] = useState<string>('')

  const [minColRatio, setMinColRatio] = useState<string>(ethers.utils.formatUnits(MIN_COL_RATIO_MAKER, 18))

  const { data: canExec, mutate: mutateCanExec } = useSWR(
    taskReceipt !== null && gelatoExecutor && mockPriceExecuted ? [taskReceipt, gelatoExecutor] : null,
    getCanExec,
  )

  const { data: gelatoGasPrice } = useSWR(gelatoExecutor ? [gelatoExecutor] : null, getGelatoGasPrice)
  const gasFeesPaid = gelatoGasPrice ? ethers.BigNumber.from(2148384).mul(gelatoGasPrice) : '0'
  const ethUsedToPayFlashLoan =
    gasFeesPaid !== '0' && initialCol && dsaBalance !== '0'
      ? ethers.BigNumber.from(initialCol).sub(gasFeesPaid).sub(dsaBalance)
      : '0'

  useEffect(() => {
    const gelatoSetup = async () => {
      if (!gelatoIsReady) {
        try {
          await setupGelato(gelatoProvider, gelatoExecutor)
          updateSharedState({ gelatoIsReady: true })
        } catch (error) {
          console.log(error)
        }
      }
    }
    gelatoSetup()
  }, [])

  useEffect(() => {
    const getVaultInfo = async (dsaAddress) => {
      try {
        const dsaInstance = await getDSAInstance(userAddress)
        const vaults = await dsaInstance.maker.getVaults(dsaAddress)
        vaults[vaultId].colRatio = getColRatio(
          vaults[vaultId].col.toString(),
          mockedPrice ? ethers.utils.formatUnits(mockedPrice, 18) : Math.round(vaults[vaultId].price).toString(),
          vaults[vaultId].debt.toString(),
        )
        setVault(vaults[vaultId])
      } catch (error) {
        console.log(error)
      }
    }

    if (dsaAddress && user && vaultId) getVaultInfo(dsaAddress)
  }, [vaultId, mockedPrice])

  useEffect(() => {
    const setupMockedPrice = async () => {
      const { PriceOracleResolver } = getMainnetDeployedContracts(masterSigner)
      await PriceOracleResolver.setMockPrice(ethers.utils.parseUnits(Math.round(vault.price).toString(), 18))
      updateSharedState({ mockedPrice: ethers.utils.parseUnits(Math.round(vault.price).toString(), 18).toString() })
    }
    if ((mockedPrice.toString() === '0' || mockedPrice.toString() === '') && vault) setupMockedPrice()
  }, [vault])

  useEffect(() => {
    const execSimulation = async () => {
      try {
        const { GelatoCore } = getMainnetDeployedContracts(gelatoExecutor)
        const tx = await GelatoCore.exec(taskReceipt, {
          gasPrice: gelatoGasPrice, // Executor must use gelatoGasPrice (Chainlink fast gwei)
          gasLimit: GAS_LIMIT,
        })
        tx.wait()
        await mutateDsaBalance()
        updateSharedState({ taskExecuted: true })
      } catch (error) {
        console.log('error simulating auto liq: ', error)
      }
    }
    if (canExec === 'OK' && mockPriceExecuted && !taskExecuted) execSimulation()
  }, [canExec])

  const handleSubmitTask = async () => {
    setDisabled('submitTask')
    const dsa = getDSA(user, dsaAddress)

    try {
      const spells = await getAutoLiquidationSpells(vaultId, gelatoProvider)
      const taskReceipt = await submitTask(
        gelatoProvider,
        userAddress,
        dsa,
        vaultId,
        ethers.utils.parseUnits(minColRatio).toString(),
        spells,
      )
      updateSharedState({ taskReceipt })
    } catch (error) {
      setDisabled('')
      alert('Could not reach the condition contract. Are you sure you deployed the connectors and the condition?')
      console.log('Error submitting task: ', error)
    }
    setDisabled('')
  }

  const handleMockPrice = async (upOrDown: string) => {
    let newMockPrice: string
    if (upOrDown === 'up') {
      setDisabled('mockPriceUp')
      newMockPrice = BigNumber.from(mockedPrice).add(ethers.utils.parseUnits('200', 18)).toString()
    }
    if (upOrDown === 'down') {
      setDisabled('mockPriceDown')
      newMockPrice = BigNumber.from(mockedPrice).sub(ethers.utils.parseUnits('200', 18)).toString()
    }
    try {
      await updateMockPrice(user, newMockPrice)
      updateSharedState({ mockedPrice: newMockPrice })
      await mutateCanExec()
      // eslint-disable-next-line no-empty
    } catch (error) {}

    if (!mockPriceExecuted) updateSharedState({ mockPriceExecuted: true })
    setDisabled('')
  }

  return (
    <>
      <Card className={classes.dsaMod}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card>
              <CardContent>
                <Typography
                  component="span"
                  color="secondary"
                  variant="h6"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  gutterBottom
                >
                  {taskReceipt === null ? 'Submit automated Auto Liquidation task to Gelato via DSA' : ''}
                </Typography>

                <Typography
                  component="span"
                  color="textSecondary"
                  variant="subtitle2"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  gutterBottom
                  align="justify"
                >
                  {taskReceipt === null
                    ? 'Below provide the minimum collateralization ratio allowed. If your vault will go under the ratio provided, Gelato bots will execute the auto liquidation on your behalf. Regarding this simulator, this behavior is mocked and never submitted to the Gelato network.'
                    : ''}
                </Typography>

                <Typography
                  component="span"
                  color="textPrimary"
                  variant="h6"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  gutterBottom
                >
                  Current ratio: {vault ? ethers.utils.formatUnits(vault.colRatio, 18) : '0'}
                </Typography>
                <Box>
                  <TextField
                    size="small"
                    style={{
                      marginBottom: '10px',
                    }}
                    fullWidth
                    required
                    disabled={!vaultIsCreated || taskReceipt !== null || !vaultIsCreated || !vaultHasDebt}
                    onChange={(event) => {
                      setMinColRatio(event.target.value)
                    }}
                    variant="outlined"
                    defaultValue={minColRatio}
                    label="Min Col Ratio"
                    name="minColRatio"
                  />
                </Box>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={handleSubmitTask}
                  disabled={disabled === 'submitTask' || taskReceipt !== null || !vaultIsCreated || !vaultHasDebt}
                >
                  {!vaultIsCreated
                    ? 'First you need to create a Vault'
                    : !vaultHasDebt
                    ? 'You dont have any ETH in the vault. Vault is empty.'
                    : taskReceipt
                    ? 'Task Submitted'
                    : 'Submit Task'}
                </Button>
                {taskReceipt ? (
                  <Box>
                    <Grid container spacing={3} style={{ marginTop: '20px' }}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>Expire Date</TableCell>
                            <TableCell>
                              <Typography variant="body2" color="textSecondary">
                                {taskReceipt.expiryDate}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>DSA Associated</TableCell>
                            <TableCell>
                              <Typography variant="body2" color="textSecondary">
                                {taskReceipt.userProxy}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Gelato Provider</TableCell>
                            <TableCell>
                              <Typography variant="body2" color="textSecondary">
                                {taskReceipt.provider.addr}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Condition [If vault unsafe] at</TableCell>
                            <TableCell>
                              <Typography variant="body2" color="textSecondary">
                                {taskReceipt.tasks[0] ? taskReceipt.tasks[0].conditions[0].inst : 'empty'}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Action [Auto liquidation]</TableCell>
                            <TableCell>
                              <Typography variant="body2" color="textSecondary">
                                {taskReceipt.tasks[0] ? taskReceipt.tasks[0].actions[0].addr : 'empty'}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Grid>
                  </Box>
                ) : null}
              </CardContent>
            </Card>
          </Grid>
          {taskReceipt ? (
            <>
              {taskExecuted ? (
                <Grid item xs={12} sm={12}>
                  <Card>
                    <CardContent>
                      <Typography
                        component="span"
                        color="textPrimary"
                        variant="h6"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        gutterBottom
                      >
                        Task executed and Vault auto liquidated
                      </Typography>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>Gas fees paid: </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="textSecondary">
                                {ethers.utils.formatUnits(gasFeesPaid, 18)} ETH
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              ETH used to pay flashloan of{' '}
                              {initialDebt ? ethers.utils.formatUnits(initialDebt, 18) : '0'} DAI
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="textSecondary">
                                {ethUsedToPayFlashLoan ? ethers.utils.formatUnits(ethUsedToPayFlashLoan, 18) : '0'} ETH
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </Grid>
              ) : (
                <Grid item xs={12} sm={12}>
                  <Card>
                    <CardContent>
                      <Typography
                        component="span"
                        color="textPrimary"
                        variant="h6"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        gutterBottom
                      >
                        Can execute action?
                      </Typography>

                      <Typography
                        component="span"
                        color="textPrimary"
                        variant="h6"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        gutterBottom
                      >
                        <b> {mockPriceExecuted ? canExec : 'ConditionNotOk:MakerVaultNotUnsafe'}</b>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      ETH Mock Price
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {mockedPrice ? ethers.utils.formatUnits(mockedPrice) : '0'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={() => handleMockPrice('up')}
                      disabled={disabled === 'mockPriceUp' ? true : false}
                    >
                      {disabled === 'mockPriceUp' ? 'Mocking price up 200$' : 'Mock Price Up 200$'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Button
                      color="secondary"
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={() => handleMockPrice('down')}
                      disabled={disabled === 'mockPriceDown' ? true : false}
                    >
                      {disabled === 'mockPriceDown' ? 'Mocking price down 200$' : 'Mock Price Down 200$'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>{' '}
            </>
          ) : null}
        </Grid>
      </Card>
    </>
  )
}

export default Gelato
