import React, { FC } from 'react'
import { ethers } from 'ethers'
import { Card, CardContent, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    flexGrow: 1,
  },
}))

interface HeaderProps {
  balance: string
  dsaBalance: string
  ethPrice: string
  blockNumber: string
}

const Header: FC<HeaderProps> = ({ balance, dsaBalance, ethPrice, blockNumber }) => {
  const classes = useStyles()

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            color="textSecondary"
            variant="h4"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            gutterBottom
          >
            Auto Liquidator Simulator
          </Typography>
          <Alert severity="warning" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            This is meant to simulate the automation of the auto liquidator task. To do that we mock a price action to
            activate and force gelato bots to execute the auto liquidation. Since only the oracle will be mocked, the
            "actual" ETH price will remain the same as the one in the current block - meaning the ETH - DAI exchange
            rate will not be same as the ETH price mocked. the task is simulated locally and not sent to Gelato network.
          </Alert>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Card className={classes.header}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Block Number
              </Typography>
              <Typography variant="h6" component="h2">
                {blockNumber}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={classes.header}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Real ETH Price
              </Typography>
              <Typography variant="h6" component="h2">
                {Math.round(parseFloat(ethPrice))} $
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={classes.header}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                DSA Balance
              </Typography>
              <Typography variant="h6" component="h2">
                {ethers.utils.formatUnits(ethers.BigNumber.from(dsaBalance ? dsaBalance : '0'), 18).slice(0, 6)} ETH
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={classes.header}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Your Balance
              </Typography>
              <Typography variant="h6" component="h2">
                {ethers.utils.formatUnits(ethers.BigNumber.from(balance ? balance : '0'), 18).slice(0, 6)} ETH
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Header
