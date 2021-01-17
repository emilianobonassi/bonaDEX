/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from 'ethers'
import { Provider, TransactionRequest } from '@ethersproject/providers'
import { Contract, ContractFactory, Overrides } from '@ethersproject/contracts'

import type { MakerResolver } from '../MakerResolver'

export class MakerResolver__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer)
  }

  deploy(overrides?: Overrides): Promise<MakerResolver> {
    return super.deploy(overrides || {}) as Promise<MakerResolver>
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {})
  }
  attach(address: string): MakerResolver {
    return super.attach(address) as MakerResolver
  }
  connect(signer: Signer): MakerResolver__factory {
    return super.connect(signer) as MakerResolver__factory
  }
  static connect(address: string, signerOrProvider: Signer | Provider): MakerResolver {
    return new Contract(address, _abi, signerOrProvider) as MakerResolver
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_vaultId',
        type: 'uint256',
      },
    ],
    name: 'getMakerVaulsssstDebt',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_vaultId',
        type: 'uint256',
      },
    ],
    name: 'getMakerVaultCosssllateralBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_vaultId',
        type: 'uint256',
      },
    ],
    name: 'getMakerVaultsssRawDebt',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const _bytecode =
  '0x608060405234801561001057600080fd5b50610991806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063298f38da146100465780634102cfbf14610075578063e9ef81e414610092575b600080fd5b6100636004803603602081101561005c57600080fd5b50356100af565b60408051918252519081900360200190f35b6100636004803603602081101561008b57600080fd5b50356100c0565b610063600480360360208110156100a857600080fd5b50356100cb565b60006100ba826100d6565b92915050565b60006100ba8261021e565b60006100ba82610502565b600080735ef30b9986345249bc32d8928b7ee64de9435e39905060008173ffffffffffffffffffffffffffffffffffffffff166336569e776040518163ffffffff1660e01b815260040160206040518083038186803b15801561013857600080fd5b505afa15801561014c573d6000803e3d6000fd5b505050506040513d602081101561016257600080fd5b50519050600080610173848761073b565b9150915060008373ffffffffffffffffffffffffffffffffffffffff16632424be5c84846040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff16815260200192505050604080518083038186803b1580156101e757600080fd5b505afa1580156101fb573d6000803e3d6000fd5b505050506040513d604081101561021157600080fd5b5051979650505050505050565b6000735ef30b9986345249bc32d8928b7ee64de9435e398180610241838661073b565b9150915060008373ffffffffffffffffffffffffffffffffffffffff166336569e776040518163ffffffff1660e01b815260040160206040518083038186803b15801561028d57600080fd5b505afa1580156102a1573d6000803e3d6000fd5b505050506040513d60208110156102b757600080fd5b5051604080517fd9638d3600000000000000000000000000000000000000000000000000000000815260048101869052905191925060009173ffffffffffffffffffffffffffffffffffffffff84169163d9638d369160248083019260a0929190829003018186803b15801561032c57600080fd5b505afa158015610340573d6000803e3d6000fd5b505050506040513d60a081101561035657600080fd5b5060200151604080517f2424be5c0000000000000000000000000000000000000000000000000000000081526004810187905273ffffffffffffffffffffffffffffffffffffffff8681166024830152825193945060009390861692632424be5c9260448082019391829003018186803b1580156103d357600080fd5b505afa1580156103e7573d6000803e3d6000fd5b505050506040513d60408110156103fd57600080fd5b50602090810151604080517f6c25b34600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8881166004830152915192945060009391871692636c25b34692602480840193919291829003018186803b15801561047757600080fd5b505afa15801561048b573d6000803e3d6000fd5b505050506040513d60208110156104a157600080fd5b5051905060006104ba6104b48486610863565b836108e9565b90506b033b2e3c9fd0803ce800000081049850806104e48a6b033b2e3c9fd0803ce8000000610863565b106104ef57886104f4565b886001015b9a9950505050505050505050565b6000735ef30b9986345249bc32d8928b7ee64de9435e398180610525838661073b565b9150915060008373ffffffffffffffffffffffffffffffffffffffff166336569e776040518163ffffffff1660e01b815260040160206040518083038186803b15801561057157600080fd5b505afa158015610585573d6000803e3d6000fd5b505050506040513d602081101561059b57600080fd5b5051604080517fd9638d3600000000000000000000000000000000000000000000000000000000815260048101869052905191925060009173ffffffffffffffffffffffffffffffffffffffff84169163d9638d369160248083019260a0929190829003018186803b15801561061057600080fd5b505afa158015610624573d6000803e3d6000fd5b505050506040513d60a081101561063a57600080fd5b5060200151604080517f2424be5c0000000000000000000000000000000000000000000000000000000081526004810187905273ffffffffffffffffffffffffffffffffffffffff8681166024830152825193945060009390861692632424be5c9260448082019391829003018186803b1580156106b757600080fd5b505afa1580156106cb573d6000803e3d6000fd5b505050506040513d60408110156106e157600080fd5b5060200151905060006106f48284610863565b90506b033b2e3c9fd0803ce8000000810497508061071e896b033b2e3c9fd0803ce8000000610863565b10610729578761072e565b876001015b9998505050505050505050565b6000808373ffffffffffffffffffffffffffffffffffffffff16632c2cb9fd846040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b15801561078f57600080fd5b505afa1580156107a3573d6000803e3d6000fd5b505050506040513d60208110156107b957600080fd5b5051604080517f2726b07300000000000000000000000000000000000000000000000000000000815260048101869052905191935073ffffffffffffffffffffffffffffffffffffffff861691632726b07391602480820192602092909190829003018186803b15801561082c57600080fd5b505afa158015610840573d6000803e3d6000fd5b505050506040513d602081101561085657600080fd5b5051919491935090915050565b600081158061087e5750508082028282828161087b57fe5b04145b6100ba57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f64732d6d6174682d6d756c2d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd5b808203828111156100ba57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f64732d6d6174682d7375622d756e646572666c6f770000000000000000000000604482015290519081900360640190fdfea26469706673582212209c9f69f39b7393d0dc73905e26b94587ea5067112a2aea74ee15c7d9e59c242764736f6c63430007040033'