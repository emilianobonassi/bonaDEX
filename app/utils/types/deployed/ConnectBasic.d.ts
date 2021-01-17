/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, PayableOverrides, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface ConnectBasicInterface extends ethers.utils.Interface {
  functions: {
    'connectorID()': FunctionFragment
    'deposit(address,uint256,uint256,uint256)': FunctionFragment
    'name()': FunctionFragment
    'withdraw(address,uint256,address,uint256,uint256)': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'connectorID', values?: undefined): string
  encodeFunctionData(functionFragment: 'deposit', values: [string, BigNumberish, BigNumberish, BigNumberish]): string
  encodeFunctionData(functionFragment: 'name', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'withdraw',
    values: [string, BigNumberish, string, BigNumberish, BigNumberish],
  ): string

  decodeFunctionResult(functionFragment: 'connectorID', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'deposit', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'withdraw', data: BytesLike): Result

  events: {
    'LogDeposit(address,uint256,uint256,uint256)': EventFragment
    'LogWithdraw(address,uint256,address,uint256,uint256)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'LogDeposit'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'LogWithdraw'): EventFragment
}

export class ConnectBasic extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: ConnectBasicInterface

  functions: {
    connectorID(
      overrides?: CallOverrides,
    ): Promise<{
      model: BigNumber
      id: BigNumber
      0: BigNumber
      1: BigNumber
    }>

    'connectorID()'(
      overrides?: CallOverrides,
    ): Promise<{
      model: BigNumber
      id: BigNumber
      0: BigNumber
      1: BigNumber
    }>

    deposit(
      erc20: string,
      tokenAmt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>

    'deposit(address,uint256,uint256,uint256)'(
      erc20: string,
      tokenAmt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>

    name(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'name()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    withdraw(
      erc20: string,
      tokenAmt: BigNumberish,
      to: string,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>

    'withdraw(address,uint256,address,uint256,uint256)'(
      erc20: string,
      tokenAmt: BigNumberish,
      to: string,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>
  }

  connectorID(
    overrides?: CallOverrides,
  ): Promise<{
    model: BigNumber
    id: BigNumber
    0: BigNumber
    1: BigNumber
  }>

  'connectorID()'(
    overrides?: CallOverrides,
  ): Promise<{
    model: BigNumber
    id: BigNumber
    0: BigNumber
    1: BigNumber
  }>

  deposit(
    erc20: string,
    tokenAmt: BigNumberish,
    getId: BigNumberish,
    setId: BigNumberish,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  'deposit(address,uint256,uint256,uint256)'(
    erc20: string,
    tokenAmt: BigNumberish,
    getId: BigNumberish,
    setId: BigNumberish,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  name(overrides?: CallOverrides): Promise<string>

  'name()'(overrides?: CallOverrides): Promise<string>

  withdraw(
    erc20: string,
    tokenAmt: BigNumberish,
    to: string,
    getId: BigNumberish,
    setId: BigNumberish,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  'withdraw(address,uint256,address,uint256,uint256)'(
    erc20: string,
    tokenAmt: BigNumberish,
    to: string,
    getId: BigNumberish,
    setId: BigNumberish,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>

  callStatic: {
    connectorID(
      overrides?: CallOverrides,
    ): Promise<{
      model: BigNumber
      id: BigNumber
      0: BigNumber
      1: BigNumber
    }>

    'connectorID()'(
      overrides?: CallOverrides,
    ): Promise<{
      model: BigNumber
      id: BigNumber
      0: BigNumber
      1: BigNumber
    }>

    deposit(
      erc20: string,
      tokenAmt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>

    'deposit(address,uint256,uint256,uint256)'(
      erc20: string,
      tokenAmt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>

    name(overrides?: CallOverrides): Promise<string>

    'name()'(overrides?: CallOverrides): Promise<string>

    withdraw(
      erc20: string,
      tokenAmt: BigNumberish,
      to: string,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>

    'withdraw(address,uint256,address,uint256,uint256)'(
      erc20: string,
      tokenAmt: BigNumberish,
      to: string,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>
  }

  filters: {
    LogDeposit(erc20: string | null, tokenAmt: null, getId: null, setId: null): EventFilter

    LogWithdraw(erc20: string | null, tokenAmt: null, to: string | null, getId: null, setId: null): EventFilter
  }

  estimateGas: {
    connectorID(overrides?: CallOverrides): Promise<BigNumber>

    'connectorID()'(overrides?: CallOverrides): Promise<BigNumber>

    deposit(
      erc20: string,
      tokenAmt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>

    'deposit(address,uint256,uint256,uint256)'(
      erc20: string,
      tokenAmt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>

    name(overrides?: CallOverrides): Promise<BigNumber>

    'name()'(overrides?: CallOverrides): Promise<BigNumber>

    withdraw(
      erc20: string,
      tokenAmt: BigNumberish,
      to: string,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>

    'withdraw(address,uint256,address,uint256,uint256)'(
      erc20: string,
      tokenAmt: BigNumberish,
      to: string,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>
  }

  populateTransaction: {
    connectorID(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'connectorID()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    deposit(
      erc20: string,
      tokenAmt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>

    'deposit(address,uint256,uint256,uint256)'(
      erc20: string,
      tokenAmt: BigNumberish,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'name()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    withdraw(
      erc20: string,
      tokenAmt: BigNumberish,
      to: string,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>

    'withdraw(address,uint256,address,uint256,uint256)'(
      erc20: string,
      tokenAmt: BigNumberish,
      to: string,
      getId: BigNumberish,
      setId: BigNumberish,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>
  }
}