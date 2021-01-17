/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface IGelatoConditionInterface extends ethers.utils.Interface {
  functions: {
    'ok(uint256,bytes,uint256)': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'ok', values: [BigNumberish, BytesLike, BigNumberish]): string

  decodeFunctionResult(functionFragment: 'ok', data: BytesLike): Result

  events: {}
}

export class IGelatoCondition extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: IGelatoConditionInterface

  functions: {
    ok(
      _taskReceiptId: BigNumberish,
      _conditionData: BytesLike,
      _cycleId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'ok(uint256,bytes,uint256)'(
      _taskReceiptId: BigNumberish,
      _conditionData: BytesLike,
      _cycleId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>
  }

  ok(
    _taskReceiptId: BigNumberish,
    _conditionData: BytesLike,
    _cycleId: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>

  'ok(uint256,bytes,uint256)'(
    _taskReceiptId: BigNumberish,
    _conditionData: BytesLike,
    _cycleId: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>

  callStatic: {
    ok(
      _taskReceiptId: BigNumberish,
      _conditionData: BytesLike,
      _cycleId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>

    'ok(uint256,bytes,uint256)'(
      _taskReceiptId: BigNumberish,
      _conditionData: BytesLike,
      _cycleId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>
  }

  filters: {}

  estimateGas: {
    ok(
      _taskReceiptId: BigNumberish,
      _conditionData: BytesLike,
      _cycleId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'ok(uint256,bytes,uint256)'(
      _taskReceiptId: BigNumberish,
      _conditionData: BytesLike,
      _cycleId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>
  }

  populateTransaction: {
    ok(
      _taskReceiptId: BigNumberish,
      _conditionData: BytesLike,
      _cycleId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'ok(uint256,bytes,uint256)'(
      _taskReceiptId: BigNumberish,
      _conditionData: BytesLike,
      _cycleId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>
  }
}
