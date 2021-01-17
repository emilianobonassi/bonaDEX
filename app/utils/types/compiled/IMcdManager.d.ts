/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface IMcdManagerInterface extends ethers.utils.Interface {
  functions: {
    'ilks(uint256)': FunctionFragment
    'urns(uint256)': FunctionFragment
    'vat()': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'ilks', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'urns', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'vat', values?: undefined): string

  decodeFunctionResult(functionFragment: 'ilks', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'urns', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'vat', data: BytesLike): Result

  events: {}
}

export class IMcdManager extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: IMcdManagerInterface

  functions: {
    ilks(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'ilks(uint256)'(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    urns(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'urns(uint256)'(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    vat(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'vat()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>
  }

  ilks(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

  'ilks(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

  urns(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

  'urns(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

  vat(overrides?: CallOverrides): Promise<string>

  'vat()'(overrides?: CallOverrides): Promise<string>

  callStatic: {
    ilks(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

    'ilks(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

    urns(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

    'urns(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

    vat(overrides?: CallOverrides): Promise<string>

    'vat()'(overrides?: CallOverrides): Promise<string>
  }

  filters: {}

  estimateGas: {
    ilks(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    'ilks(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    urns(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    'urns(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    vat(overrides?: CallOverrides): Promise<BigNumber>

    'vat()'(overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    ilks(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'ilks(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    urns(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'urns(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    vat(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'vat()'(overrides?: CallOverrides): Promise<PopulatedTransaction>
  }
}