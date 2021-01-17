import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import {
  Container,
  makeStyles,
  Theme,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Divider,
  Box,
  Tabs,
  Tab,
} from '@material-ui/core'
import useSigner from 'hooks/useSigner'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import DisconnectIcon from '@material-ui/icons/ExitToApp'
import { request } from 'graphql-request'
import useSWR from 'swr'
import { ethers } from 'ethers'
import { UNISWAP_V2_SUBGRAPH, PRICES_BY_BLOCK } from 'utils/queries'
import CreateDSA from 'components/CreateDSA'
import EtherFaucet from 'components/EtherFaucet'
import Header from 'components/Header'
import { getDSA } from 'utils/contracts'
import { DSA } from 'utils/types/deployed'
import DSAModeration from 'components/DSAModeration'
import Vault from 'components/Vault'
import Gelato from 'components/Gelato'
import { mainnetDeployedAddresses } from 'utils/addresses'
import useSharedState from 'hooks/useSharedState'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  connectButton: {
    backgroundColor: theme.palette.common.white,
  },
  accountIcon: {
    marginRight: theme.spacing(2),
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '100px',
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    marginTop: '100px',
    color: theme.palette.text.secondary,
  },
  prices: {
    paddingTop: theme.spacing(10),
  },
}))

const getUniswapPrices = async (block) => {
  const result = await request(UNISWAP_V2_SUBGRAPH, PRICES_BY_BLOCK([mainnetDeployedAddresses.WBTC], [block]))
  let ethPrice: string
  const values = []
  for (var row in result) {
    let timestamp = row.split('t')[1]
    let derivedETH = parseFloat(result[row]?.derivedETH)
    if (timestamp) {
      values.push({
        timestamp,
        derivedETH,
      })
    }
  }

  let index = 0
  for (var brow in result) {
    let timestamp = brow.split('b')[1]
    if (timestamp) {
      ethPrice = result[brow].ethPrice
      values[index].priceUSD = result[brow].ethPrice * values[index].derivedETH
      index += 1
    }
  }
  return { ethPrice, wbtcPrice: values[0] }
}

const getBalance = async (provider: ethers.providers.JsonRpcProvider, signerAddress: string) => {
  const balance = await provider.getBalance(signerAddress)
  return balance.toString()
}

const getDsaBalance = async (provider: ethers.providers.JsonRpcProvider, dsaAddress: string) => {
  const balance = await provider.getBalance(dsaAddress)
  return balance.toString()
}

const IndexPage: FC = () => {
  const classes = useStyles()
  const { walletSelect, walletCheck, isInitialised, walletReset, hasSigner, signer, address, provider } = useSigner()
  const {
    latestBlock,
    dsaIsCreated,
    updateSharedState,
    resetSharedState,
    vaultIsCreated,
    dsaAddress,
    gelatoIsAuth,
  } = useSharedState()

  const [currentTab, setCurrentTab] = useState<string>('dsa')

  const { data: prices, error: subgraphDataError } = useSWR(
    latestBlock ? [latestBlock, 'getSubgraphData'] : null,
    getUniswapPrices,
  )
  const { data: balance, mutate: mutateUserBalance } = useSWR(
    signer ? [provider, address, 'getUserBalance'] : null,
    getBalance,
  )
  const { data: dsaBalance, mutate: mutateDsaBalance } = useSWR(
    dsaIsCreated ? [provider, dsaAddress, 'getDsaBalance'] : null,
    getDsaBalance,
  )

  useEffect(() => {
    const getBlock = async () => {
      const latestBlockGot = await provider.getBlock(await provider.getBlockNumber())
      updateSharedState({ latestBlock: latestBlockGot })
    }

    getBlock()
  }, [])

  const updateUserBalance = async () => {
    await mutateUserBalance()
  }

  const handleWallet = async () => {
    try {
      if (isInitialised) {
        const walletSelected = await walletSelect()
        if (walletSelected) {
          await walletCheck()
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDisconnectWallet = () => {
    try {
      walletReset()
    } catch (err) {
      console.error(err)
    }
  }

  const tabs = [
    { value: 'dsa', label: 'DSA Options' },
    { value: 'vault', label: 'Vault' },
    { value: 'gelato', label: 'Gelato' },
  ]

  const handleTabsChange = (event: ChangeEvent<unknown>, value: string): void => {
    setCurrentTab(value)
  }

  if (!prices || !latestBlock)
    return (
      <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', paddingTop: '200px', width: '50%' }}>
        <Container className={classes.prices} component="main" maxWidth="xl">
          <Grid container>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography gutterBottom component="span">
                <CircularProgress />
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '10px' }}
            >
              <Typography gutterBottom>Fetching some data from the graph...</Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    )

  if (subgraphDataError)
    return (
      <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', paddingTop: '200px', width: '50%' }}>
        <Container className={classes.prices} component="main" maxWidth="xl">
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '10px' }}
            >
              <Typography gutterBottom>Error fetching ETH price from the graph...</Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    )

  return (
    <div className={classes.root}>
      <Container className={classes.prices} component="main" maxWidth="md">
        <>
          {hasSigner ? (
            <Grid container>
              <Grid item xs={12}>
                <Button style={{ float: 'right' }} onClick={handleDisconnectWallet} size="large">
                  <DisconnectIcon className={classes.accountIcon} />
                  Disconnect
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="secondary"
                  style={{ float: 'right' }}
                  onClick={() => {
                    resetSharedState()
                    location.reload()
                  }}
                  size="large"
                >
                  Reset State
                </Button>
              </Grid>
            </Grid>
          ) : null}
        </>
        <Header
          balance={balance}
          dsaBalance={dsaBalance}
          ethPrice={prices.ethPrice}
          blockNumber={latestBlock ? latestBlock.number.toString() : '0'}
        />
        {hasSigner ? (
          <Grid item xs={12} style={{ paddingTop: '30px' }}>
            <EtherFaucet updateBalance={updateUserBalance} />
            <CreateDSA />
            <Container style={{ paddingTop: '30px' }}>
              {dsaIsCreated ? (
                <>
                  <Divider />
                  <Box mt={3}>
                    <Tabs
                      onChange={handleTabsChange}
                      scrollButtons="auto"
                      value={currentTab}
                      variant="scrollable"
                      textColor="secondary"
                    >
                      {tabs.map((tab) => (
                        <Tab
                          key={tab.value}
                          label={tab.label}
                          value={tab.value}
                          disabled={
                            tab.value === 'vault' && !vaultIsCreated
                              ? true
                              : false || (tab.value === 'gelato' && !gelatoIsAuth)
                              ? true
                              : false
                          }
                        />
                      ))}
                    </Tabs>
                  </Box>

                  <Box>
                    {currentTab === 'dsa' && <DSAModeration />}
                    {currentTab === 'vault' && <Vault />}
                    {currentTab === 'gelato' && <Gelato dsaBalance={dsaBalance} mutateDsaBalance={mutateDsaBalance} />}
                  </Box>
                </>
              ) : (
                <></>
              )}
            </Container>
          </Grid>
        ) : null}

        <div className={classes.main}>
          <>
            {!hasSigner ? (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    gutterBottom
                  >
                    To use this simulator you need to connect a wallet.
                  </Typography>
                </Grid>

                <Button
                  className={classes.connectButton}
                  fullWidth
                  onClick={handleWallet}
                  size="large"
                  variant="contained"
                >
                  <AccountBalanceWalletIcon className={classes.accountIcon} />
                  Connect Wallet
                </Button>
              </Grid>
            ) : null}
          </>
        </div>
      </Container>
    </div>
  )
}

export default IndexPage
