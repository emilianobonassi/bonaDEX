/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'

import type { IConnectCompound } from '../IConnectCompound'

export class IConnectCompound__factory {
  static connect(address: string, signerOrProvider: Signer | Provider): IConnectCompound {
    return new Contract(address, _abi, signerOrProvider) as IConnectCompound
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
        name: 'getId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'setId',
        type: 'uint256',
      },
    ],
    name: 'borrow',
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
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
