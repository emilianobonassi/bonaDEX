import React, { FC, useState } from 'react'
import { ethers } from 'ethers'
import useSigner from 'hooks/useSigner'
import { Box, Button } from '@material-ui/core'

interface EtherFaucetProps {
  updateBalance: () => Promise<void>
}

function wait(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000))
}

const EtherFaucet: FC<EtherFaucetProps> = ({ updateBalance }) => {
  const { signer: user, address: userAddress, masterSigner } = useSigner()

  const [disabled, setDisabled] = useState<boolean>(false)

  const handleGetETH = async () => {
    try {
      setDisabled(true)

      masterSigner.sendTransaction({
        to: userAddress,
        value: ethers.utils.parseEther('20'),
        gasPrice: 100000000000, // 100 GWEI
      })

      await wait(2)
      await updateBalance()

      setDisabled(false)
    } catch (error) {
      setDisabled(false)
      console.log('Something bad happened: ', error)
    }
  }
  return (
    <>
      <Box mt={2}>
        {user ? (
          <Button
            disabled={disabled}
            color="secondary"
            onClick={handleGetETH}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            {disabled ? 'Sending you 20 sweet ETH...' : 'Get Some ETH (will send you 20 ETH)'}
          </Button>
        ) : (
          <Button color="secondary" disabled fullWidth size="large" type="submit" variant="contained">
            No signer injected :(
          </Button>
        )}
      </Box>
    </>
  )
}

export default EtherFaucet
