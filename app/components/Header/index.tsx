import React, { FC } from 'react'
import { ethers } from 'ethers'
import { Card, makeStyles, Theme, Typography, Box } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    flexGrow: 1,
  },
  item: {
    flexGrow: 1,
    padding: theme.spacing(3),
    textAlign: 'center',
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
}))

interface HeaderProps {
  balance: string
  ethPrice: string
  blockNumber: string
}

const Header: FC<HeaderProps> = ({ balance, ethPrice, blockNumber }) => {
  const classes = useStyles()

  return (
    <Box>
      <Card>
        <Box display="flex">
          <div className={classes.item}>
            <Typography align="center" variant="h4" color="textPrimary">
              {blockNumber}
            </Typography>
            <Typography align="center" component="h4" gutterBottom variant="overline" color="textSecondary">
              Block Number
            </Typography>
          </div>

          <div className={classes.item}>
            <Typography align="center" variant="h4" color="textPrimary">
              {Math.round(parseFloat(ethPrice))} $
            </Typography>
            <Typography align="center" component="h4" gutterBottom variant="overline" color="textSecondary">
              ETH Price
            </Typography>
          </div>

          <div className={classes.item}>
            <Typography align="center" variant="h4" color="textPrimary">
              X %
            </Typography>
            <Typography align="center" component="h4" gutterBottom variant="overline" color="textSecondary">
              Col Ratio
            </Typography>
          </div>

          <div className={classes.item}>
            <Typography align="center" variant="h4" color="textPrimary">
              {ethers.utils.formatUnits(ethers.BigNumber.from(balance ? balance : '0'), 18).slice(0, 6)} ETH
            </Typography>
            <Typography align="center" component="h4" gutterBottom variant="overline" color="textSecondary">
              Balance
            </Typography>
          </div>
        </Box>
      </Card>
    </Box>
  )
}

export default Header
