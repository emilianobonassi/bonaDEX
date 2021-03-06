/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'

import type { IGelatoGasPriceOracle } from '../IGelatoGasPriceOracle'

export class IGelatoGasPriceOracle__factory {
  static connect(address: string, signerOrProvider: Signer | Provider): IGelatoGasPriceOracle {
    return new Contract(address, _abi, signerOrProvider) as IGelatoGasPriceOracle
  }
}

const _abi = [
  {
    inputs: [],
    name: 'latestAnswer',
    outputs: [
      {
        internalType: 'int256',
        name: '',
        type: 'int256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
