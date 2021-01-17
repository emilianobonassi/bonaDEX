import { useContext } from 'react'
import SharedStateContext from 'contexts/SharedStateContext'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSharedState = () => useContext(SharedStateContext)

export default useSharedState
