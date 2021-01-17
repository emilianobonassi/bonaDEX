import { useContext } from 'react'
import SignerContext from 'contexts/SignerContext'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSigner = () => useContext(SignerContext)

export default useSigner
