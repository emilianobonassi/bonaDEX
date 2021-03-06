/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, Overrides, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface OasisInterfaceInterface extends ethers.utils.Interface {
  functions: {
    'buyAllAmount(address,uint256,address,uint256)': FunctionFragment
    'getBestOffer(address,address)': FunctionFragment
    'getBuyAmount(address,address,uint256)': FunctionFragment
    'getMinSell(address)': FunctionFragment
    'getPayAmount(address,address,uint256)': FunctionFragment
    'sellAllAmount(address,uint256,address,uint256)': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'buyAllAmount', values: [string, BigNumberish, string, BigNumberish]): string
  encodeFunctionData(functionFragment: 'getBestOffer', values: [string, string]): string
  encodeFunctionData(functionFragment: 'getBuyAmount', values: [string, string, BigNumberish]): string
  encodeFunctionData(functionFragment: 'getMinSell', values: [string]): string
  encodeFunctionData(functionFragment: 'getPayAmount', values: [string, string, BigNumberish]): string
  encodeFunctionData(functionFragment: 'sellAllAmount', values: [string, BigNumberish, string, BigNumberish]): string

  decodeFunctionResult(functionFragment: 'buyAllAmount', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getBestOffer', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getBuyAmount', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getMinSell', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getPayAmount', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'sellAllAmount', data: BytesLike): Result

  events: {}
}

export class OasisInterface extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: OasisInterfaceInterface

  functions: {
    buyAllAmount(
      dest: string,
      destAmt: BigNumberish,
      src: string,
      maxSrc: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'buyAllAmount(address,uint256,address,uint256)'(
      dest: string,
      destAmt: BigNumberish,
      src: string,
      maxSrc: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    getBestOffer(
      sell_gem: string,
      buy_gem: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    'getBestOffer(address,address)'(
      sell_gem: string,
      buy_gem: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    getBuyAmount(
      dest: string,
      src: string,
      srcAmt: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    'getBuyAmount(address,address,uint256)'(
      dest: string,
      src: string,
      srcAmt: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    getMinSell(
      pay_gem: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    'getMinSell(address)'(
      pay_gem: string,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    getPayAmount(
      src: string,
      dest: string,
      destAmt: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    'getPayAmount(address,address,uint256)'(
      src: string,
      dest: string,
      destAmt: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber
    }>

    sellAllAmount(
      src: string,
      srcAmt: BigNumberish,
      dest: string,
      minDest: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'sellAllAmount(address,uint256,address,uint256)'(
      src: string,
      srcAmt: BigNumberish,
      dest: string,
      minDest: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>
  }

  buyAllAmount(
    dest: string,
    destAmt: BigNumberish,
    src: string,
    maxSrc: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'buyAllAmount(address,uint256,address,uint256)'(
    dest: string,
    destAmt: BigNumberish,
    src: string,
    maxSrc: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  getBestOffer(sell_gem: string, buy_gem: string, overrides?: CallOverrides): Promise<BigNumber>

  'getBestOffer(address,address)'(sell_gem: string, buy_gem: string, overrides?: CallOverrides): Promise<BigNumber>

  getBuyAmount(dest: string, src: string, srcAmt: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

  'getBuyAmount(address,address,uint256)'(
    dest: string,
    src: string,
    srcAmt: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>

  getMinSell(pay_gem: string, overrides?: CallOverrides): Promise<BigNumber>

  'getMinSell(address)'(pay_gem: string, overrides?: CallOverrides): Promise<BigNumber>

  getPayAmount(src: string, dest: string, destAmt: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

  'getPayAmount(address,address,uint256)'(
    src: string,
    dest: string,
    destAmt: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>

  sellAllAmount(
    src: string,
    srcAmt: BigNumberish,
    dest: string,
    minDest: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'sellAllAmount(address,uint256,address,uint256)'(
    src: string,
    srcAmt: BigNumberish,
    dest: string,
    minDest: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  callStatic: {
    buyAllAmount(
      dest: string,
      destAmt: BigNumberish,
      src: string,
      maxSrc: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'buyAllAmount(address,uint256,address,uint256)'(
      dest: string,
      destAmt: BigNumberish,
      src: string,
      maxSrc: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    getBestOffer(sell_gem: string, buy_gem: string, overrides?: CallOverrides): Promise<BigNumber>

    'getBestOffer(address,address)'(sell_gem: string, buy_gem: string, overrides?: CallOverrides): Promise<BigNumber>

    getBuyAmount(dest: string, src: string, srcAmt: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    'getBuyAmount(address,address,uint256)'(
      dest: string,
      src: string,
      srcAmt: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    getMinSell(pay_gem: string, overrides?: CallOverrides): Promise<BigNumber>

    'getMinSell(address)'(pay_gem: string, overrides?: CallOverrides): Promise<BigNumber>

    getPayAmount(src: string, dest: string, destAmt: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    'getPayAmount(address,address,uint256)'(
      src: string,
      dest: string,
      destAmt: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    sellAllAmount(
      src: string,
      srcAmt: BigNumberish,
      dest: string,
      minDest: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'sellAllAmount(address,uint256,address,uint256)'(
      src: string,
      srcAmt: BigNumberish,
      dest: string,
      minDest: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>
  }

  filters: {}

  estimateGas: {
    buyAllAmount(
      dest: string,
      destAmt: BigNumberish,
      src: string,
      maxSrc: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>

    'buyAllAmount(address,uint256,address,uint256)'(
      dest: string,
      destAmt: BigNumberish,
      src: string,
      maxSrc: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>

    getBestOffer(sell_gem: string, buy_gem: string, overrides?: CallOverrides): Promise<BigNumber>

    'getBestOffer(address,address)'(sell_gem: string, buy_gem: string, overrides?: CallOverrides): Promise<BigNumber>

    getBuyAmount(dest: string, src: string, srcAmt: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    'getBuyAmount(address,address,uint256)'(
      dest: string,
      src: string,
      srcAmt: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    getMinSell(pay_gem: string, overrides?: CallOverrides): Promise<BigNumber>

    'getMinSell(address)'(pay_gem: string, overrides?: CallOverrides): Promise<BigNumber>

    getPayAmount(src: string, dest: string, destAmt: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    'getPayAmount(address,address,uint256)'(
      src: string,
      dest: string,
      destAmt: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    sellAllAmount(
      src: string,
      srcAmt: BigNumberish,
      dest: string,
      minDest: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>

    'sellAllAmount(address,uint256,address,uint256)'(
      src: string,
      srcAmt: BigNumberish,
      dest: string,
      minDest: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>
  }

  populateTransaction: {
    buyAllAmount(
      dest: string,
      destAmt: BigNumberish,
      src: string,
      maxSrc: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'buyAllAmount(address,uint256,address,uint256)'(
      dest: string,
      destAmt: BigNumberish,
      src: string,
      maxSrc: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    getBestOffer(sell_gem: string, buy_gem: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'getBestOffer(address,address)'(
      sell_gem: string,
      buy_gem: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    getBuyAmount(
      dest: string,
      src: string,
      srcAmt: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'getBuyAmount(address,address,uint256)'(
      dest: string,
      src: string,
      srcAmt: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    getMinSell(pay_gem: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    'getMinSell(address)'(pay_gem: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    getPayAmount(
      src: string,
      dest: string,
      destAmt: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'getPayAmount(address,address,uint256)'(
      src: string,
      dest: string,
      destAmt: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    sellAllAmount(
      src: string,
      srcAmt: BigNumberish,
      dest: string,
      minDest: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'sellAllAmount(address,uint256,address,uint256)'(
      src: string,
      srcAmt: BigNumberish,
      dest: string,
      minDest: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>
  }
}
