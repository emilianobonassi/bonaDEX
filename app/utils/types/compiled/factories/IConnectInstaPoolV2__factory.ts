/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'

import type { IConnectInstaPoolV2 } from '../IConnectInstaPoolV2'

export class IConnectInstaPoolV2__factory {
  static connect(address: string, signerOrProvider: Signer | Provider): IConnectInstaPoolV2 {
    return new Contract(address, _abi, signerOrProvider) as IConnectInstaPoolV2
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
      {
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'route',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'flashBorrowAndCast',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'getId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'setId',
        type: 'uint256',
      },
    ],
    name: 'flashPayback',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
