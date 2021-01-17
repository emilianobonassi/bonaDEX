import { ContractInterface } from 'ethers'

import mainnetDeployedAddresses from './addresses'

import GelatoCore from './abis/GelatoCore.json'
import GelatoGasPriceOracle from './abis/GelatoGasPriceOracle.json'
import IERC20 from './abis/IERC20.json'
import PriceOracleResolver from './abis/PriceOracleResolver.json'
import UniswapV2Router from './abis/UniswapV2Router.json'
import UniswapRepayAdapter from './abis/UniswapRepayAdapter.json'
import ChainlinkOracle from './abis/ChainlinkOracle.json'

export { mainnetDeployedAddresses }

export interface IABIs {
  GelatoCore: ContractInterface
  GelatoGasPriceOracle: ContractInterface
  IERC20: ContractInterface
  PriceOracleResolver: ContractInterface
  UniswapV2Router: ContractInterface
  UniswapRepayAdapter: ContractInterface
  ChainlinkOracle: ContractInterface
}

export const ABIs: IABIs = {
  GelatoCore,
  GelatoGasPriceOracle,
  IERC20,
  PriceOracleResolver,
  UniswapV2Router,
  UniswapRepayAdapter,
  ChainlinkOracle,
}
