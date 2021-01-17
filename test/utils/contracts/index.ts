import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { mainnetDeployedAddresses } from '../../../constants'

import {
  GelatoCore,
  GelatoCore__factory,
  GelatoGasPriceOracle,
  GelatoGasPriceOracle__factory,
  PriceOracleResolver,
  PriceOracleResolver__factory,
  UniswapV2Router,
  UniswapV2Router__factory,
  UniswapRepayAdapter,
  UniswapRepayAdapter__factory,
  ChainlinkOracle,
  ChainlinkOracle__factory,
} from '../../../types/deployed'

export interface IContracts {
  GelatoCore: GelatoCore
  GelatoGasPriceOracle: GelatoGasPriceOracle
  PriceOracleResolver: PriceOracleResolver
  UniswapV2Router: UniswapV2Router
  UniswapRepayAdapter: UniswapRepayAdapter
  ChainlinkOracleETHUSD: ChainlinkOracle
}

export interface IAccounts {
  user: Signer
  gelatoProvider: Signer
  gelatoExecutor: Signer
}

export const getMainnetDeployedContracts = (providerOrSigner: Provider | Signer): IContracts => {
  const GelatoCore = GelatoCore__factory.connect(mainnetDeployedAddresses.GelatoCore, providerOrSigner)
  const GelatoGasPriceOracle = GelatoGasPriceOracle__factory.connect(
    mainnetDeployedAddresses.GelatoGasPriceOracle,
    providerOrSigner,
  )

  const PriceOracleResolver = PriceOracleResolver__factory.connect(
    mainnetDeployedAddresses.PriceOracleResolver,
    providerOrSigner,
  )

  const UniswapV2Router = UniswapV2Router__factory.connect(mainnetDeployedAddresses.UniswapV2Router, providerOrSigner)

  const UniswapRepayAdapter = UniswapRepayAdapter__factory.connect(
    mainnetDeployedAddresses.UniswapRepayAdapter,
    providerOrSigner,
  )

  const ChainlinkOracleETHUSD = ChainlinkOracle__factory.connect(
    mainnetDeployedAddresses.ChainlinkOracleETHUSD,
    providerOrSigner,
  )

  return {
    GelatoCore,
    GelatoGasPriceOracle,
    PriceOracleResolver,
    UniswapV2Router,
    UniswapRepayAdapter,
    ChainlinkOracleETHUSD,
  }
}
