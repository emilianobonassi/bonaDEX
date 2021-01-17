/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, PayableOverrides, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface AccountInterfaceInterface extends ethers.utils.Interface {
  functions: {
    'cast(address[],bytes[],address)': FunctionFragment
    'isAuth(address)': FunctionFragment
    'shield()': FunctionFragment
    'version()': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'cast', values: [string[], BytesLike[], string]): string
  encodeFunctionData(functionFragment: 'isAuth', values: [string]): string
  encodeFunctionData(functionFragment: 'shield', values?: undefined): string
  encodeFunctionData(functionFragment: 'version', values?: undefined): string

  decodeFunctionResult(functionFragment: 'cast', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isAuth', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'shield', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'version', data: BytesLike): Result

  events: {}
}

export class AccountInterface extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: AccountInterfaceInterface

  functions: {
    cast(
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>

    'cast(address[],bytes[],address)'(
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>

    isAuth(
      user: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: boolean
    }>

    'isAuth(address)'(
      user: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: boolean
    }>

    shield(
      overrides?: CallOverrides,
    ): Promise<{
      0: boolean
    }>

    'shield()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: boolean
    }>

    version(
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    'version()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>
  }

  cast(
    _targets: string[],
    _datas: BytesLike[],
    _origin: string,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  'cast(address[],bytes[],address)'(
    _targets: string[],
    _datas: BytesLike[],
    _origin: string,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  isAuth(user: string, overrides?: CallOverrides): Promise<boolean>

  'isAuth(address)'(user: string, overrides?: CallOverrides): Promise<boolean>

  shield(overrides?: CallOverrides): Promise<boolean>

  'shield()'(overrides?: CallOverrides): Promise<boolean>

  version(overrides?: CallOverrides): Promise<BigNumber>

  'version()'(overrides?: CallOverrides): Promise<BigNumber>

  callStatic: {
    cast(_targets: string[], _datas: BytesLike[], _origin: string, overrides?: CallOverrides): Promise<string[]>

    'cast(address[],bytes[],address)'(
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: CallOverrides,
    ): Promise<string[]>

    isAuth(user: string, overrides?: CallOverrides): Promise<boolean>

    'isAuth(address)'(user: string, overrides?: CallOverrides): Promise<boolean>

    shield(overrides?: CallOverrides): Promise<boolean>

    'shield()'(overrides?: CallOverrides): Promise<boolean>

    version(overrides?: CallOverrides): Promise<BigNumber>

    'version()'(overrides?: CallOverrides): Promise<BigNumber>
  }

  filters: {}

  estimateGas: {
    cast(_targets: string[], _datas: BytesLike[], _origin: string, overrides?: PayableOverrides): Promise<BigNumber>

    'cast(address[],bytes[],address)'(
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>

    isAuth(user: string, overrides?: CallOverrides): Promise<BigNumber>

    'isAuth(address)'(user: string, overrides?: CallOverrides): Promise<BigNumber>

    shield(overrides?: CallOverrides): Promise<BigNumber>

    'shield()'(overrides?: CallOverrides): Promise<BigNumber>

    version(overrides?: CallOverrides): Promise<BigNumber>

    'version()'(overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    cast(
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>

    'cast(address[],bytes[],address)'(
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>

    isAuth(user: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'isAuth(address)'(user: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    shield(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'shield()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'version()'(overrides?: CallOverrides): Promise<PopulatedTransaction>
  }
}