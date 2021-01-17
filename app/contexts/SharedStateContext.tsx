import React, { createContext, useEffect, useReducer } from 'react'
import type { FC, ReactNode } from 'react'
import { ethers } from 'ethers'

interface SharedStateState {
  dsaAddress?: string
  mockedPrice?: string
  vaultId?: string
  latestBlock?: ethers.providers.Block
  dsaIsCreated?: boolean
  vaultIsCreated?: boolean
  vaultHasDebt?: boolean
  gelatoIsAuth?: boolean
  gelatoIsReady?: boolean
  taskReceipt?: any
  mockPriceExecuted?: boolean
  taskExecuted?: boolean
  initialCol?: string
  initialDebt?: string
}

interface SharedStateContextValue extends SharedStateState {
  updateSharedState(sharedState: SharedStateState): void
  resetSharedState(): void
}

interface SharedStateProps {
  children: ReactNode
}

type SharedStateChangedAction = {
  type: 'SHARED_STATE_CHANGED'
  payload: SharedStateState
}

type Action = SharedStateChangedAction

const initialSharedState: SharedStateState = {
  dsaAddress: '',
  vaultId: '',
  dsaIsCreated: false,
  vaultIsCreated: false,
  vaultHasDebt: false,
  gelatoIsAuth: false,
  gelatoIsReady: false,
  latestBlock: null,
  taskReceipt: null,
  mockedPrice: '',
  mockPriceExecuted: false,
  taskExecuted: false,
  initialCol: '',
  initialDebt: '',
}

const reducer = (state: SharedStateState, action: Action): SharedStateState => {
  switch (action.type) {
    case 'SHARED_STATE_CHANGED': {
      const sharedState = action.payload

      return {
        ...sharedState,
      }
    }
    default: {
      return { ...state }
    }
  }
}

const SharedStateContext = createContext<SharedStateContextValue>({} as SharedStateContextValue)

export const SharedStateProvider: FC<SharedStateProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialSharedState)

  const updateSharedState = (newState: SharedStateState): void => {
    const sharedState = Object.assign(state, newState)
    window.localStorage.setItem('sharedState', JSON.stringify(sharedState))
    dispatch({
      type: 'SHARED_STATE_CHANGED',
      payload: {
        ...sharedState,
      },
    })
  }

  const resetSharedState = (): void => {
    window.localStorage.setItem('sharedState', '')
    dispatch({
      type: 'SHARED_STATE_CHANGED',
      payload: {
        ...initialSharedState,
      },
    })
  }

  // Check if theres shared state saved
  useEffect(() => {
    const getSharedState = async () => {
      const sharedState = window.localStorage.getItem('sharedState')
      if (sharedState) {
        updateSharedState(JSON.parse(sharedState))
      }
    }
    getSharedState()
  }, [])

  return (
    <SharedStateContext.Provider
      value={{
        ...state,
        updateSharedState,
        resetSharedState,
      }}
    >
      {children}
    </SharedStateContext.Provider>
  )
}

export default SharedStateContext
