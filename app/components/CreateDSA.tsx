import React, { FC, useState } from 'react'
import useSigner from 'hooks/useSigner'
import { Box, Button } from '@material-ui/core'
import { getDSA, getMainnetDeployedContracts } from 'utils/contracts'
import useSharedState from 'hooks/useSharedState'

const CreateDSA: FC = () => {
  const { address: userAddress, masterSigner } = useSigner()
  const { dsaIsCreated, dsaAddress, updateSharedState } = useSharedState()
  const [disabled, setDisabled] = useState<boolean>(false)

  const handleCreateDSA = async () => {
    try {
      setDisabled(true)
      const { InstaList, InstaIndex } = getMainnetDeployedContracts(masterSigner)

      const lastDsaId = await InstaList.accounts()

      await InstaIndex.build(userAddress, 1, userAddress)
      await InstaList.accounts()
      const dsaId = lastDsaId.add(1)

      const dsaAddress = await InstaList.accountAddr(dsaId)

      updateSharedState({ dsaIsCreated: true, dsaAddress })
      setDisabled(false)
    } catch (error) {
      setDisabled(false)
      console.log('Something bad happened: ', error)
    }
  }

  return (
    <>
      <Box mt={2}>
        {!dsaIsCreated ? (
          <Button
            color="secondary"
            onClick={handleCreateDSA}
            disabled={disabled}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            {disabled ? 'Deploying a new DSA for you...' : 'Create DSA (Defi Smart Account)'}
          </Button>
        ) : (
          <Button color="secondary" disabled fullWidth size="large" type="submit" variant="contained">
            DSA Deployed at {dsaAddress}
          </Button>
        )}
      </Box>
    </>
  )
}

export default CreateDSA
