import React from 'react'
import type { FC } from 'react'
import {
  AppBar,
  Box,
  Hidden,
  Toolbar,
  makeStyles,
  Typography,
  Badge,
  Theme,
  Card,
  CardContent,
  Grid,
  Tooltip,
} from '@material-ui/core'
import Wallet from './ConnectWallet'
import useSigner from 'hooks/useSigner'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  badge: {
    height: 20,
    width: 35,
    borderRadius: 5,
    marginTop: 20,
    marginRight: 0,
    marginLeft: 30,
  },
}))

const TopBar: FC = () => {
  const classes = useStyles()
  const { address } = useSigner()

  return (
    <>
      {/* <AppBar color="inherit">
        <Toolbar>
          <Hidden mdDown>
            <Badge color="secondary" badgeContent="Beta" classes={{ badge: classes.badge }}>
              <Box p={2} style={{ marginRight: 5 }}>
                <Typography variant="h6" color="inherit">
                  BonaDEX
                </Typography>
              </Box>
            </Badge>
          </Hidden>
          <Box ml={2} flexGrow={1} />
          {address && (
            <Box ml={2}>
              <Typography variant="subtitle1" color="inherit">
                {`${address.substring(0, 6)}...${address.substr(-4)} `}
              </Typography>
            </Box>
          )}
          <Box ml={2}>
            <Wallet />
          </Box>
        </Toolbar>
      </AppBar> */}
      <Grid container spacing={3}>
        <Grid item xl={2}>
          <Badge color="secondary" badgeContent="Beta" classes={{ badge: classes.badge }}>
            <Box py={2} pr={3}>
              <Typography variant="h4" color="inherit">
                BonaDEX
              </Typography>
            </Box>
          </Badge>
        </Grid>
        <Box flexGrow={1} />
        <Grid item>
          {address && (
            <Box py={3}>
              <Tooltip title={address}>
                <Typography variant="subtitle1" color="inherit">
                  {`${address.substring(0, 6)}...${address.substr(-4)} `}
                </Typography>
              </Tooltip>
            </Box>
          )}
        </Grid>
        <Grid item>
          <Box py={2}>
            <Wallet />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default TopBar
