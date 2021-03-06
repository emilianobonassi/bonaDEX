/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'

import type { IInstaPoolResolver } from '../IInstaPoolResolver'

export class IInstaPoolResolver__factory {
  static connect(address: string, signerOrProvider: Signer | Provider): IInstaPoolResolver {
    return new Contract(address, _abi, signerOrProvider) as IInstaPoolResolver
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'getTokenLimit',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'dydx',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maker',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'compound',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'aave',
            type: 'uint256',
          },
        ],
        internalType: 'struct IInstaPoolResolver.RouteData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
