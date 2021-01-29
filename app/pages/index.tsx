import React, { FC, useEffect, useState } from 'react'
import { Container, makeStyles, Theme, Grid, Typography, CircularProgress, Box } from '@material-ui/core'
import useSigner from 'hooks/useSigner'
import { request } from 'graphql-request'
import useSWR from 'swr'
import { ethers } from 'ethers'
import { UNISWAP_V2_SUBGRAPH, PRICES_BY_BLOCK, TOKEN_CHART } from 'utils/queries'
import Header from 'components/Header'
import { mainnetDeployedAddresses } from 'utils/addresses'
import useSharedState from 'hooks/useSharedState'
import Chart from 'components/Chart'
import TopBar from 'components/TopBar'
import RepayCard from 'components/RepayCard'
import OrdersCard from 'components/OrdersCard'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(3),
  },
}))

const getTokenData = async () => {
  const { tokenDayDatas } = await request(UNISWAP_V2_SUBGRAPH, TOKEN_CHART(mainnetDeployedAddresses.WETH))
  return tokenDayDatas
}

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

const IndexPage: FC = () => {
  const classes = useStyles()
  const { signer, address, provider } = useSigner()
  const [latestBlock, setLatestBlock] = useState<ethers.providers.Block>()

  const { data: prices, error: subgraphDataError } = useSWR(
    latestBlock ? [latestBlock, 'getSubgraphData'] : null,
    getUniswapPrices,
  )

  const { data: balance } = useSWR(signer ? [provider, address, 'getUserBalance'] : null, getBalance)

  const { data: tokenData } = useSWR(['getTokenData'], getTokenData)

  useEffect(() => {
    const getBlock = async () => {
      const latestBlockGot = await provider.getBlock(await provider.getBlockNumber())
      setLatestBlock(latestBlockGot)
    }
    getBlock()
  }, [])

  if (!latestBlock || !prices || !tokenData)
    return (
      <Box mt={30}>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography gutterBottom component="span">
              <CircularProgress />
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom>Fetching some data from the graph...</Typography>
          </Grid>
        </Grid>
      </Box>
    )

  // if (subgraphDataError)
  //   return (
  //     <Box mt={30}>
  //       <Grid container alignItems="center" justify="center">
  //         <Grid item>
  //           <Typography gutterBottom>Error fetching ETH price from the subgraph...</Typography>
  //         </Grid>
  //       </Grid>
  //     </Box>
  //   )

  return (
    <div className={classes.root}>
      <Container>
        <TopBar />
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Header
                balance={balance}
                ethPrice={prices?.ethPrice}
                blockNumber={latestBlock ? latestBlock.number.toString() : '0'}
              />
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12}>
              <RepayCard />
            </Grid>

            <Grid item lg={8} md={8} sm={6} xs={12}>
              <Chart tokenData={tokenData ?? []} />
            </Grid>
            <Grid item lg={12} xs={12}>
              <OrdersCard />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default IndexPage
