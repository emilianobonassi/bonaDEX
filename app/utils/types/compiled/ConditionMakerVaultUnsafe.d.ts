/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface ConditionMakerVaultUnsafeInterface extends ethers.utils.Interface {
  functions: {
    'getConditionData(uint256,address,bytes,uint256)': FunctionFragment
    'isVaultUnsafe(uint256,address,bytes,uint256)': FunctionFragment
    'ok(uint256,bytes,uint256)': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'getConditionData',
    values: [BigNumberish, string, BytesLike, BigNumberish],
  ): string
  encodeFunctionData(functionFragment: 'isVaultUnsafe', values: [BigNumberish, string, BytesLike, BigNumberish]): string
  encodeFunctionData(functionFragment: 'ok', values: [BigNumberish, BytesLike, BigNumberish]): string

  decodeFunctionResult(functionFragment: 'getConditionData', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isVaultUnsafe', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'ok', data: BytesLike): Result

  events: {}
}

export class ConditionMakerVaultUnsafe extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: ConditionMakerVaultUnsafeInterface

  functions: {
    getConditionData(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'getConditionData(uint256,address,bytes,uint256)'(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    isVaultUnsafe(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'isVaultUnsafe(uint256,address,bytes,uint256)'(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    ok(
      arg0: BigNumberish,
      _conditionData: BytesLike,
      arg2: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'ok(uint256,bytes,uint256)'(
      arg0: BigNumberish,
      _conditionData: BytesLike,
      arg2: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>
  }

  getConditionData(
    _vaultId: BigNumberish,
    _priceOracle: string,
    _oraclePayload: BytesLike,
    _minColRatio: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>

  'getConditionData(uint256,address,bytes,uint256)'(
    _vaultId: BigNumberish,
    _priceOracle: string,
    _oraclePayload: BytesLike,
    _minColRatio: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>

  isVaultUnsafe(
    _vaultId: BigNumberish,
    _priceOracle: string,
    _oraclePayload: BytesLike,
    _minColRatio: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>

  'isVaultUnsafe(uint256,address,bytes,uint256)'(
    _vaultId: BigNumberish,
    _priceOracle: string,
    _oraclePayload: BytesLike,
    _minColRatio: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>

  ok(arg0: BigNumberish, _conditionData: BytesLike, arg2: BigNumberish, overrides?: CallOverrides): Promise<string>

  'ok(uint256,bytes,uint256)'(
    arg0: BigNumberish,
    _conditionData: BytesLike,
    arg2: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>

  callStatic: {
    getConditionData(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>

    'getConditionData(uint256,address,bytes,uint256)'(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>

    isVaultUnsafe(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>

    'isVaultUnsafe(uint256,address,bytes,uint256)'(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>

    ok(arg0: BigNumberish, _conditionData: BytesLike, arg2: BigNumberish, overrides?: CallOverrides): Promise<string>

    'ok(uint256,bytes,uint256)'(
      arg0: BigNumberish,
      _conditionData: BytesLike,
      arg2: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>
  }

  filters: {}

  estimateGas: {
    getConditionData(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'getConditionData(uint256,address,bytes,uint256)'(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    isVaultUnsafe(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'isVaultUnsafe(uint256,address,bytes,uint256)'(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    ok(arg0: BigNumberish, _conditionData: BytesLike, arg2: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    'ok(uint256,bytes,uint256)'(
      arg0: BigNumberish,
      _conditionData: BytesLike,
      arg2: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>
  }

  populateTransaction: {
    getConditionData(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'getConditionData(uint256,address,bytes,uint256)'(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    isVaultUnsafe(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'isVaultUnsafe(uint256,address,bytes,uint256)'(
      _vaultId: BigNumberish,
      _priceOracle: string,
      _oraclePayload: BytesLike,
      _minColRatio: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    ok(
      arg0: BigNumberish,
      _conditionData: BytesLike,
      arg2: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'ok(uint256,bytes,uint256)'(
      arg0: BigNumberish,
      _conditionData: BytesLike,
      arg2: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>
  }
}
