/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, Overrides, PayableOverrides, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface DSAInterface extends ethers.utils.Interface {
  functions: {
    'cast(address[],bytes[],address)': FunctionFragment
    'disable(address)': FunctionFragment
    'enable(address)': FunctionFragment
    'instaIndex()': FunctionFragment
    'isAuth(address)': FunctionFragment
    'shield()': FunctionFragment
    'switchShield(bool)': FunctionFragment
    'version()': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'cast', values: [string[], BytesLike[], string]): string
  encodeFunctionData(functionFragment: 'disable', values: [string]): string
  encodeFunctionData(functionFragment: 'enable', values: [string]): string
  encodeFunctionData(functionFragment: 'instaIndex', values?: undefined): string
  encodeFunctionData(functionFragment: 'isAuth', values: [string]): string
  encodeFunctionData(functionFragment: 'shield', values?: undefined): string
  encodeFunctionData(functionFragment: 'switchShield', values: [boolean]): string
  encodeFunctionData(functionFragment: 'version', values?: undefined): string

  decodeFunctionResult(functionFragment: 'cast', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'disable', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'enable', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'instaIndex', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isAuth', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'shield', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'switchShield', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'version', data: BytesLike): Result

  events: {
    'LogCast(address,address,uint256)': EventFragment
    'LogDisable(address)': EventFragment
    'LogEnable(address)': EventFragment
    'LogSwitchShield(bool)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'LogCast'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'LogDisable'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'LogEnable'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'LogSwitchShield'): EventFragment
}

export class DSA extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: DSAInterface

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

    disable(user: string, overrides?: Overrides): Promise<ContractTransaction>

    'disable(address)'(user: string, overrides?: Overrides): Promise<ContractTransaction>

    enable(user: string, overrides?: Overrides): Promise<ContractTransaction>

    'enable(address)'(user: string, overrides?: Overrides): Promise<ContractTransaction>

    instaIndex(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'instaIndex()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

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

    switchShield(_shield: boolean, overrides?: Overrides): Promise<ContractTransaction>

    'switchShield(bool)'(_shield: boolean, overrides?: Overrides): Promise<ContractTransaction>

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

  disable(user: string, overrides?: Overrides): Promise<ContractTransaction>

  'disable(address)'(user: string, overrides?: Overrides): Promise<ContractTransaction>

  enable(user: string, overrides?: Overrides): Promise<ContractTransaction>

  'enable(address)'(user: string, overrides?: Overrides): Promise<ContractTransaction>

  instaIndex(overrides?: CallOverrides): Promise<string>

  'instaIndex()'(overrides?: CallOverrides): Promise<string>

  isAuth(user: string, overrides?: CallOverrides): Promise<boolean>

  'isAuth(address)'(user: string, overrides?: CallOverrides): Promise<boolean>

  shield(overrides?: CallOverrides): Promise<boolean>

  'shield()'(overrides?: CallOverrides): Promise<boolean>

  switchShield(_shield: boolean, overrides?: Overrides): Promise<ContractTransaction>

  'switchShield(bool)'(_shield: boolean, overrides?: Overrides): Promise<ContractTransaction>

  version(overrides?: CallOverrides): Promise<BigNumber>

  'version()'(overrides?: CallOverrides): Promise<BigNumber>

  callStatic: {
    cast(_targets: string[], _datas: BytesLike[], _origin: string, overrides?: CallOverrides): Promise<void>

    'cast(address[],bytes[],address)'(
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: CallOverrides,
    ): Promise<void>

    disable(user: string, overrides?: CallOverrides): Promise<void>

    'disable(address)'(user: string, overrides?: CallOverrides): Promise<void>

    enable(user: string, overrides?: CallOverrides): Promise<void>

    'enable(address)'(user: string, overrides?: CallOverrides): Promise<void>

    instaIndex(overrides?: CallOverrides): Promise<string>

    'instaIndex()'(overrides?: CallOverrides): Promise<string>

    isAuth(user: string, overrides?: CallOverrides): Promise<boolean>

    'isAuth(address)'(user: string, overrides?: CallOverrides): Promise<boolean>

    shield(overrides?: CallOverrides): Promise<boolean>

    'shield()'(overrides?: CallOverrides): Promise<boolean>

    switchShield(_shield: boolean, overrides?: CallOverrides): Promise<void>

    'switchShield(bool)'(_shield: boolean, overrides?: CallOverrides): Promise<void>

    version(overrides?: CallOverrides): Promise<BigNumber>

    'version()'(overrides?: CallOverrides): Promise<BigNumber>
  }

  filters: {
    LogCast(origin: string | null, sender: string | null, value: null): EventFilter

    LogDisable(user: string | null): EventFilter

    LogEnable(user: string | null): EventFilter

    LogSwitchShield(_shield: null): EventFilter
  }

  estimateGas: {
    cast(_targets: string[], _datas: BytesLike[], _origin: string, overrides?: PayableOverrides): Promise<BigNumber>

    'cast(address[],bytes[],address)'(
      _targets: string[],
      _datas: BytesLike[],
      _origin: string,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>

    disable(user: string, overrides?: Overrides): Promise<BigNumber>

    'disable(address)'(user: string, overrides?: Overrides): Promise<BigNumber>

    enable(user: string, overrides?: Overrides): Promise<BigNumber>

    'enable(address)'(user: string, overrides?: Overrides): Promise<BigNumber>

    instaIndex(overrides?: CallOverrides): Promise<BigNumber>

    'instaIndex()'(overrides?: CallOverrides): Promise<BigNumber>

    isAuth(user: string, overrides?: CallOverrides): Promise<BigNumber>

    'isAuth(address)'(user: string, overrides?: CallOverrides): Promise<BigNumber>

    shield(overrides?: CallOverrides): Promise<BigNumber>

    'shield()'(overrides?: CallOverrides): Promise<BigNumber>

    switchShield(_shield: boolean, overrides?: Overrides): Promise<BigNumber>

    'switchShield(bool)'(_shield: boolean, overrides?: Overrides): Promise<BigNumber>

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

    disable(user: string, overrides?: Overrides): Promise<PopulatedTransaction>

    'disable(address)'(user: string, overrides?: Overrides): Promise<PopulatedTransaction>

    enable(user: string, overrides?: Overrides): Promise<PopulatedTransaction>

    'enable(address)'(user: string, overrides?: Overrides): Promise<PopulatedTransaction>

    instaIndex(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'instaIndex()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    isAuth(user: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'isAuth(address)'(user: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    shield(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'shield()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    switchShield(_shield: boolean, overrides?: Overrides): Promise<PopulatedTransaction>

    'switchShield(bool)'(_shield: boolean, overrides?: Overrides): Promise<PopulatedTransaction>

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'version()'(overrides?: CallOverrides): Promise<PopulatedTransaction>
  }
}
