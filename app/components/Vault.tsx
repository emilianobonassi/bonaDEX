import React, { FC, useEffect, useState } from 'react'
import useSigner from 'hooks/useSigner'
import { Card, Grid, makeStyles, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core'

import * as dsaSdk from 'dsa-sdk'
import Web3 from 'web3'
import useSharedState from 'hooks/useSharedState'
import { BigNumber, ethers } from 'ethers'

const useStyles = makeStyles(() => ({
  vault: {
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

const Vault: FC = () => {
  const classes = useStyles()

  const { signer: user, address: userAddress, provider } = useSigner()
  const { vaultId, dsaAddress, mockedPrice } = useSharedState()

  const [vault, setVault] = useState<any>()

  useEffect(() => {
    const getVaultInfo = async (dsaAddress) => {
      try {
        const dsaInstance = await getDSAInstance(userAddress)
        const vaults = await dsaInstance.maker.getVaults(dsaAddress)

        try {
          vaults[vaultId].colRatio = getColRatio(
            vaults[vaultId].col.toString(),
            mockedPrice ? ethers.utils.formatUnits(mockedPrice, 18) : Math.round(vaults[vaultId].price).toString(),
            vaults[vaultId].debt.toString(),
          )
        } catch (error) {
          console.log(error)
        }

        setVault(vaults[vaultId])
      } catch (error) {}
    }

    if (dsaAddress && user && vaultId) getVaultInfo(dsaAddress)
  }, [vaultId, mockedPrice])

  if (!vault) return null
  return (
    <>
      <Card className={classes.vault}>
        <Grid container spacing={3}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Collateral Name</TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {vault.colName}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Collateral Token</TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {vault.token}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Collateral Deposited</TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {vault.col} ETH
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Debt</TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {vault.debt} DAI
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Col Ratio</TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {ethers.utils.formatUnits(vault.colRatio, 18)}
                  </Typography>
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {parseFloat(vault.status) * 100} %
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Will be liquidated when status reaches</TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {parseFloat(vault.liquidation) * 100} %
                  </Typography>
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </Grid>
      </Card>
    </>
  )
}

export default Vault
