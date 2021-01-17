import React, { createContext, useEffect, useReducer } from 'react'
import type { FC, ReactNode } from 'react'
import { ethers } from 'ethers'
import Onboard from 'bnc-onboard'
import { Subscriptions, WalletCheckModule, API, Wallet } from 'bnc-onboard/dist/src/interfaces'

type OnboardType = API

const defaultWalletChecks = [{ checkName: 'connect' }, { checkName: 'network' }]

const networkId = 1

const initOnboard = (subscriptions: Subscriptions, walletChecks: WalletCheckModule[]): API => {
  return Onboard({
    hideBranding: true,
    networkId,
    subscriptions,
    walletSelect: {
      heading: 'Connect to Auto Liquidate Simulator',
      description: 'Simulate gelato automated task to auto liquidate maker vault if price goes against you.',
      wallets: [
        { walletName: 'metamask', preferred: true },
        // {
        //   walletName: 'walletConnect',
        //   infuraKey: infuraKey,
        //   preferred: true,
        // },
      ],
    },
    walletCheck: walletChecks,
  })
}

interface SignerState {
  isInitialised: boolean
  hasSigner: boolean
  signer: ethers.providers.JsonRpcSigner | null
  onboard: OnboardType | null
  provider: ethers.providers.JsonRpcProvider
  address: string
  masterSigner: ethers.Signer
  gelatoProvider: ethers.Signer
  gelatoExecutor: ethers.Signer
}

interface SignerContextValue extends SignerState {
  walletSelect(): Promise<boolean>
  walletCheck(): Promise<void>
  walletReset(): void
  updateSigner(signer: ethers.providers.JsonRpcSigner, address: string, balance: string): void
}

interface SignerProviderProps {
  children: ReactNode
}

type SignerStateChangedAction = {
  type: 'SIGNER_STATE_CHANGED'
  payload: {
    signer: ethers.providers.JsonRpcSigner | null
    address: string
    hasSigner: boolean
  }
}

type OnboardStateChangedAction = {
  type: 'ONBOARD_STATE_CHANGED'
  payload: {
    isInitialised: boolean
    onboard: OnboardType | null
  }
}

type Action = SignerStateChangedAction | OnboardStateChangedAction

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/')
const hdNodeWallet = ethers.utils.HDNode.fromMnemonic('test test test test test test test test test test test junk')
const masterSigner = new ethers.Wallet(hdNodeWallet.derivePath(`m/44'/60'/0'/0/0`)).connect(provider)
const gelatoProvider = new ethers.Wallet(hdNodeWallet.derivePath(`m/44'/60'/0'/0/1`)).connect(provider)
const gelatoExecutor = new ethers.Wallet(hdNodeWallet.derivePath(`m/44'/60'/0'/0/2`)).connect(provider)

const initialSignerState: SignerState = {
  isInitialised: false,
  onboard: null,
  signer: null,
  address: '',
  hasSigner: false,
  provider: provider,
  masterSigner: masterSigner,
  gelatoProvider: gelatoProvider,
  gelatoExecutor: gelatoExecutor,
}

const reducer = (state: SignerState, action: Action): SignerState => {
  switch (action.type) {
    case 'SIGNER_STATE_CHANGED': {
      const { signer, address, hasSigner } = action.payload

      return {
        ...state,
        signer,
        address,
        hasSigner,
      }
    }

    case 'ONBOARD_STATE_CHANGED': {
      const { isInitialised, onboard } = action.payload

      return {
        ...state,
        isInitialised,
        onboard,
      }
    }
    default: {
      return { ...state }
    }
  }
}

const SignerContext = createContext<SignerContextValue>({} as SignerContextValue)

export const SignerProvider: FC<SignerProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialSignerState)

  const walletSelect = async (): Promise<boolean> => {
    if (state.onboard) return state.onboard.walletSelect()
    else return false
  }

  const walletCheck = async (): Promise<void> => {
    if (state.onboard) {
      await state.onboard.walletCheck()
      const { wallet, address } = state.onboard.getState()
      updateSigner(new ethers.providers.Web3Provider(wallet.provider).getSigner(), address)
    }
  }

  const walletReset = (): void => {
    if (state.onboard) {
      state.onboard.walletReset()
      resetSigner()
      window.localStorage.setItem('selectedWallet', '')
    }
  }

  const updateSigner = (signer: ethers.providers.JsonRpcSigner, address: string): void => {
    dispatch({
      type: 'SIGNER_STATE_CHANGED',
      payload: {
        address,
        signer,
        hasSigner: true,
      },
    })
  }

  const resetSigner = (): void => {
    dispatch({
      type: 'SIGNER_STATE_CHANGED',
      payload: {
        signer: null,
        address: '',
        hasSigner: false,
      },
    })
  }

  useEffect(() => {
    if (!state.onboard) {
      const walletChecks: WalletCheckModule[] = (defaultWalletChecks as unknown) as WalletCheckModule[]
      const _onboard = initOnboard(
        {
          wallet: (wallet: Wallet) => {
            if (wallet.name) window.localStorage.setItem('selectedWallet', wallet.name)
          },
        },
        walletChecks,
      )
      dispatch({
        type: 'ONBOARD_STATE_CHANGED',
        payload: {
          isInitialised: true,
          onboard: _onboard,
        },
      })
    }
  }, [])

  // Check if wallet is ready to transact
  // Set signer and address
  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem('selectedWallet')
    if (previouslySelectedWallet !== '' && state.onboard) {
      state.onboard.walletSelect(previouslySelectedWallet).then((selected) => {
        if (selected) {
          state.onboard!.walletCheck().then((readyToTransact) => {
            if (readyToTransact) {
              const { wallet, address } = state.onboard!.getState()

              if (wallet.provider) {
                updateSigner(new ethers.providers.Web3Provider(wallet.provider).getSigner(), address)
              }
            }
          })
        }
      })
    }
  }, [state.onboard])

  return (
    <SignerContext.Provider
      value={{
        ...state,
        walletSelect,
        walletCheck,
        walletReset,
        updateSigner,
      }}
    >
      {children}
    </SignerContext.Provider>
  )
}

export default SignerContext
