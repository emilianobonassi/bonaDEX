import React from 'react'
import type { FC } from 'react'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import DisconnectIcon from '@material-ui/icons/ExitToApp'
import { IconButton, makeStyles, Tooltip, SvgIcon, Button } from '@material-ui/core'
import useSigner from 'hooks/useSigner'

const ConnectWallet: FC = () => {
  const { walletSelect, walletCheck, isInitialised, walletReset, hasSigner } = useSigner()

  const handleWallet = async () => {
    try {
      if (isInitialised && !hasSigner) {
        const walletSelected = await walletSelect()
        if (walletSelected) {
          await walletCheck()
        }
      } else if (hasSigner) {
        walletReset()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Tooltip title={hasSigner ? 'Disconnect wallet' : 'Connect wallet'}>
      <IconButton color="inherit" onClick={handleWallet}>
        <SvgIcon fontSize="small">{hasSigner ? <DisconnectIcon /> : <AccountBalanceWalletIcon />}</SvgIcon>
      </IconButton>
    </Tooltip>
  )
}

export default ConnectWallet
