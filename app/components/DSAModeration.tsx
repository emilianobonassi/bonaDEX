import React, { FC, useEffect, useState } from 'react'
import useSigner from 'hooks/useSigner'
import { Button, Card, CardContent, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { getMainnetDeployedContracts, getDSA } from 'utils/contracts'
import { mainnetDeployedAddresses } from 'utils/addresses'
import { DSA } from 'utils/types/deployed'
import { ethers } from 'ethers'
import * as dsaSdk from 'dsa-sdk'
import Web3 from 'web3'
import useSharedState from 'hooks/useSharedState'

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
  console.log('0')
  const test = await dsa.uniswap.getSellAmount(
    '0x6b175474e89094c44da98b954eedeac495271d0f',
    '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    '1000',
    '2',
  )

  console.log(test)
  dsa.setInstance(accounts[0].id)
  return dsa
}

const createVault = async (signer: ethers.Signer, dsa: DSA, collType: string): Promise<string> => {
  const { GetCDPs, DssCdpManager, ConnectMaker } = getMainnetDeployedContracts(signer)
  const userAddress = await signer.getAddress()

  const openVault = await ConnectMaker.populateTransaction.open(collType)

  const openTx = await dsa.cast([ConnectMaker.address], [openVault.data], userAddress)
  await openTx.wait()
  const cdps = await GetCDPs.getCdpsAsc(DssCdpManager.address, dsa.address)

  let vaultId = cdps.ids[0]

  return vaultId.toString()
}

const depositAndBorrow = async (
  signer: ethers.Signer,
  dsa: DSA,
  depositAmount: string,
  debtAmount: string,
  vaultId: string,
): Promise<void> => {
  const { GetCDPs, DssCdpManager, ConnectMaker } = getMainnetDeployedContracts(signer)
  const userAddress = await signer.getAddress()

  const depositInVault = await ConnectMaker.populateTransaction.deposit(vaultId, depositAmount, 0, 0)
  const borrowDaiFromVault = await ConnectMaker.populateTransaction.borrow(vaultId, debtAmount, 0, 0)

  const depositBorrowTx = await dsa.cast(
    [ConnectMaker.address, ConnectMaker.address],
    [depositInVault.data, borrowDaiFromVault.data],
    userAddress,
    {
      value: depositAmount,
    },
  )
  await depositBorrowTx.wait()
}

const DSAModeration: FC = () => {
  const classes = useStyles()

  const { signer: user, address: userAddress, provider } = useSigner()
  const { gelatoIsAuth, dsaAddress, vaultIsCreated, updateSharedState, vaultId, vaultHasDebt } = useSharedState()

  const [disabled, setDisabled] = useState<string>('')
  const [ethAmountToDeposit, setEthAmountToDeposit] = useState<string>('10')
  const [daiAmountToWithdraw, setDaiAmountToWithdraw] = useState<string>('1000')

  const handleAuthGelato = async () => {
    await getDSAInstance(userAddress)
    try {
      setDisabled('authGelato')
      const { GelatoCore, ConnectAuth } = getMainnetDeployedContracts(provider)
      const { data } = await ConnectAuth.populateTransaction.add(GelatoCore.address)
      const dsa = getDSA(user, dsaAddress)

      try {
        const tx = await dsa.connect(user).cast([ConnectAuth.address], [data], userAddress, { gasLimit: 3000000 })
        await tx.wait()
        const isAuth = await dsa.isAuth(mainnetDeployedAddresses.GelatoCore)
        updateSharedState({ gelatoIsAuth: isAuth })
      } catch (error) {
        console.log(error)
      }

      setDisabled('')
    } catch (error) {
      setDisabled('')
      console.log('Something bad happened: ', error)
    }
  }

  const handleVaultCreation = async () => {
    try {
      setDisabled('createVault')
      const dsa = getDSA(user, dsaAddress)

      try {
        const vaultId = await createVault(user, dsa, 'ETH-A')
        updateSharedState({ vaultId, vaultIsCreated: true })
      } catch (error) {
        console.log(error)
      }

      setDisabled('')
    } catch (error) {
      setDisabled('')
      console.log('Something bad happened: ', error)
    }
  }

  const handleDepositAndBorrow = async () => {
    try {
      if (ethAmountToDeposit == '' || daiAmountToWithdraw == '') return
      if (
        (isNaN(parseInt(ethAmountToDeposit)) && !isNaN(parseFloat(ethAmountToDeposit))) ||
        (isNaN(parseInt(daiAmountToWithdraw)) && !isNaN(parseFloat(daiAmountToWithdraw)))
      ) {
        alert('Input must be a number')
        return
      }
      if (ethAmountToDeposit === '0' || daiAmountToWithdraw === '0') {
        alert('Input must bigger than zero')
        return
      }

      setDisabled('depositAndBorrow')
      const dsa = getDSA(user, dsaAddress)

      try {
        await depositAndBorrow(
          user,
          dsa,
          ethers.utils.parseEther(ethAmountToDeposit).toString(),
          ethers.utils.parseUnits(daiAmountToWithdraw, 18).toString(),
          vaultId,
        )
        updateSharedState({
          vaultHasDebt: true,
          initialCol: ethers.utils.parseEther(ethAmountToDeposit).toString(),
          initialDebt: ethers.utils.parseUnits(daiAmountToWithdraw, 18).toString(),
        })
      } catch (error) {
        console.log(error)
      }

      setDisabled('')
    } catch (error) {
      setDisabled('')
      console.log('Something bad happened: ', error)
    }
  }

  return (
    <>
      <Card className={classes.dsaMod}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography
                  component="span"
                  color="textPrimary"
                  variant="h6"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  gutterBottom
                >
                  {disabled === 'authGelato' ? 'Authorizing Gelato' : 'Authorize Gelato'}
                </Typography>

                <Button
                  onClick={handleAuthGelato}
                  disabled={gelatoIsAuth || disabled === 'authGelato'}
                  color="primary"
                  fullWidth
                  size="large"
                  variant="contained"
                >
                  {gelatoIsAuth ? 'Gelato Authorized' : 'Authorize'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography
                  color="textPrimary"
                  variant="h6"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  gutterBottom
                >
                  {disabled === 'createVault' ? 'Creating Vault' : 'Create Vault'}
                </Typography>

                <Button
                  style={{ marginTop: '20px' }}
                  disabled={vaultIsCreated || disabled === 'createVault'}
                  color="primary"
                  fullWidth
                  href=""
                  size="large"
                  variant="contained"
                  onClick={handleVaultCreation}
                >
                  {vaultIsCreated ? 'Vault Created' : 'Create Vault'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography
                  color="textPrimary"
                  variant="h6"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  gutterBottom
                >
                  {disabled === 'borrowAndDeposit' ? 'Borrowing and Depositing' : 'Borrow and Deposit'}
                </Typography>

                <form>
                  <TextField
                    required
                    disabled={!vaultIsCreated || vaultHasDebt}
                    onChange={(event) => {
                      setEthAmountToDeposit(event.target.value)
                    }}
                    variant="outlined"
                    fullWidth
                    defaultValue={ethAmountToDeposit}
                    label="ETH Amount To Deposit"
                    name="ethAmount"
                  />

                  <TextField
                    style={{ marginTop: '20px' }}
                    required
                    disabled={!vaultIsCreated || vaultHasDebt}
                    onChange={(event) => {
                      setDaiAmountToWithdraw(event.target.value)
                    }}
                    variant="outlined"
                    fullWidth
                    defaultValue={daiAmountToWithdraw}
                    label="DAI Amount To Withdraw"
                    name="ethAmount"
                  />
                  <Button
                    style={{ marginTop: '20px' }}
                    disabled={!vaultIsCreated || vaultHasDebt || disabled === 'depositAndBorrow'}
                    color="primary"
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={handleDepositAndBorrow}
                  >
                    {vaultHasDebt ? 'Borrowed and Deposited' : 'Deposit and Borrow'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default DSAModeration
