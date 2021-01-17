import { ethers } from 'ethers'
import { ABIs } from '../../../constants'

export const GAS_LIMIT = '5000000'
export const GAS_PRICE_CEIL = ethers.utils.parseUnits('1000', 'gwei')

export { ABIs }

export const ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
