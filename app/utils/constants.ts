import { ethers } from 'ethers'

export const FORKED_BLOCK = 11322881

export const GAS_LIMIT = '5000000'
export const GAS_PRICE_CEIL = ethers.utils.parseUnits('1000', 'gwei')
export const MIN_COL_RATIO_MAKER = ethers.utils.parseUnits('3', 18)
