/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, PayableOverrides, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface IConnectCompoundInterface extends ethers.utils.Interface {
  functions: {
    'borrow(address,uint256,uint256,uint256)': FunctionFragment
    'deposit(address,uint256,uint256,uint256)': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'borrow', values: [string, BigNumberish, BigNumberish, BigNumberish]): string
  encodeFunctionData(functionFragment: 'deposit', values: [string, BigNumberish, BigNumberish, BigNumberish]): string

  decodeFunctionResult(functionFragment: 'borrow', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'deposit', data: BytesLike): Result

  events: {}
}

export class IConnectCompound extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: IConnectCompoundInterface

  functions: {
    borrow(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>

    'borrow(address,uint256,uint256,uint256)'(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>

    deposit(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>

    'deposit(address,uint256,uint256,uint256)'(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>
  }

  borrow(
    token: string,
    amt: BigNumberish,
    getId: BigNumberish,
    setId: BigNumberish,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  'borrow(address,uint256,uint256,uint256)'(
    token: string,
    amt: BigNumberish,
    getId: BigNumberish,
    setId: BigNumberish,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  deposit(
    token: string,
    amt: BigNumberish,
    getId: BigNumberish,
    setId: BigNumberish,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  'deposit(address,uint256,uint256,uint256)'(
    token: string,
    amt: BigNumberish,
    getId: BigNumberish,
    setId: BigNumberish,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  callStatic: {
    borrow(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>

    'borrow(address,uint256,uint256,uint256)'(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>

    deposit(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>

    'deposit(address,uint256,uint256,uint256)'(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>
  }

  filters: {}

  estimateGas: {
    borrow(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>

    'borrow(address,uint256,uint256,uint256)'(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>

    deposit(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>

    'deposit(address,uint256,uint256,uint256)'(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>
  }

  populateTransaction: {
    borrow(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>

    'borrow(address,uint256,uint256,uint256)'(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>

    deposit(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>

    'deposit(address,uint256,uint256,uint256)'(
      token: string,
      amt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>
  }
}
