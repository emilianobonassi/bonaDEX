/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers'
import { Contract, ContractTransaction, Overrides, CallOverrides } from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface IUniswapInterface extends ethers.utils.Interface {
  functions: {
    'WETH()': FunctionFragment
    'addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)': FunctionFragment
    'factory()': FunctionFragment
    'getAmountIn(uint256,uint256,uint256)': FunctionFragment
    'getAmountOut(uint256,uint256,uint256)': FunctionFragment
    'getAmountsIn(uint256,address[])': FunctionFragment
    'getAmountsOut(uint256,address[])': FunctionFragment
    'quote(uint256,uint256,uint256)': FunctionFragment
    'removeLiquidity(address,address,uint256,uint256,uint256,address,uint256)': FunctionFragment
    'swapExactTokensForTokens(uint256,uint256,address[],address,uint256)': FunctionFragment
    'swapTokensForExactTokens(uint256,uint256,address[],address,uint256)': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'WETH', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'addLiquidity',
    values: [string, string, BigNumberish, BigNumberish, BigNumberish, BigNumberish, string, BigNumberish],
  ): string
  encodeFunctionData(functionFragment: 'factory', values?: undefined): string
  encodeFunctionData(functionFragment: 'getAmountIn', values: [BigNumberish, BigNumberish, BigNumberish]): string
  encodeFunctionData(functionFragment: 'getAmountOut', values: [BigNumberish, BigNumberish, BigNumberish]): string
  encodeFunctionData(functionFragment: 'getAmountsIn', values: [BigNumberish, string[]]): string
  encodeFunctionData(functionFragment: 'getAmountsOut', values: [BigNumberish, string[]]): string
  encodeFunctionData(functionFragment: 'quote', values: [BigNumberish, BigNumberish, BigNumberish]): string
  encodeFunctionData(
    functionFragment: 'removeLiquidity',
    values: [string, string, BigNumberish, BigNumberish, BigNumberish, string, BigNumberish],
  ): string
  encodeFunctionData(
    functionFragment: 'swapExactTokensForTokens',
    values: [BigNumberish, BigNumberish, string[], string, BigNumberish],
  ): string
  encodeFunctionData(
    functionFragment: 'swapTokensForExactTokens',
    values: [BigNumberish, BigNumberish, string[], string, BigNumberish],
  ): string

  decodeFunctionResult(functionFragment: 'WETH', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'addLiquidity', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'factory', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getAmountIn', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getAmountOut', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getAmountsIn', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getAmountsOut', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'quote', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'removeLiquidity', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'swapExactTokensForTokens', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'swapTokensForExactTokens', data: BytesLike): Result

  events: {}
}

export class IUniswap extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: IUniswapInterface

  functions: {
    WETH(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'WETH()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    addLiquidity(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)'(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    factory(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    'factory()'(
      overrides?: CallOverrides,
    ): Promise<{
      0: string
    }>

    getAmountIn(
      amountOut: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      amountIn: BigNumber
      0: BigNumber
    }>

    'getAmountIn(uint256,uint256,uint256)'(
      amountOut: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      amountIn: BigNumber
      0: BigNumber
    }>

    getAmountOut(
      amountIn: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      amountOut: BigNumber
      0: BigNumber
    }>

    'getAmountOut(uint256,uint256,uint256)'(
      amountIn: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      amountOut: BigNumber
      0: BigNumber
    }>

    getAmountsIn(
      amountOut: BigNumberish,
      path: string[],
      overrides?: CallOverrides,
    ): Promise<{
      amounts: BigNumber[]
      0: BigNumber[]
    }>

    'getAmountsIn(uint256,address[])'(
      amountOut: BigNumberish,
      path: string[],
      overrides?: CallOverrides,
    ): Promise<{
      amounts: BigNumber[]
      0: BigNumber[]
    }>

    getAmountsOut(
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides,
    ): Promise<{
      amounts: BigNumber[]
      0: BigNumber[]
    }>

    'getAmountsOut(uint256,address[])'(
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides,
    ): Promise<{
      amounts: BigNumber[]
      0: BigNumber[]
    }>

    quote(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      amountB: BigNumber
      0: BigNumber
    }>

    'quote(uint256,uint256,uint256)'(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      amountB: BigNumber
      0: BigNumber
    }>

    removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'removeLiquidity(address,address,uint256,uint256,uint256,address,uint256)'(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    swapExactTokensForTokens(
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'swapExactTokensForTokens(uint256,uint256,address[],address,uint256)'(
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    swapTokensForExactTokens(
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'swapTokensForExactTokens(uint256,uint256,address[],address,uint256)'(
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>
  }

  WETH(overrides?: CallOverrides): Promise<string>

  'WETH()'(overrides?: CallOverrides): Promise<string>

  addLiquidity(
    tokenA: string,
    tokenB: string,
    amountADesired: BigNumberish,
    amountBDesired: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)'(
    tokenA: string,
    tokenB: string,
    amountADesired: BigNumberish,
    amountBDesired: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  factory(overrides?: CallOverrides): Promise<string>

  'factory()'(overrides?: CallOverrides): Promise<string>

  getAmountIn(
    amountOut: BigNumberish,
    reserveIn: BigNumberish,
    reserveOut: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>

  'getAmountIn(uint256,uint256,uint256)'(
    amountOut: BigNumberish,
    reserveIn: BigNumberish,
    reserveOut: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>

  getAmountOut(
    amountIn: BigNumberish,
    reserveIn: BigNumberish,
    reserveOut: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>

  'getAmountOut(uint256,uint256,uint256)'(
    amountIn: BigNumberish,
    reserveIn: BigNumberish,
    reserveOut: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>

  getAmountsIn(amountOut: BigNumberish, path: string[], overrides?: CallOverrides): Promise<BigNumber[]>

  'getAmountsIn(uint256,address[])'(
    amountOut: BigNumberish,
    path: string[],
    overrides?: CallOverrides,
  ): Promise<BigNumber[]>

  getAmountsOut(amountIn: BigNumberish, path: string[], overrides?: CallOverrides): Promise<BigNumber[]>

  'getAmountsOut(uint256,address[])'(
    amountIn: BigNumberish,
    path: string[],
    overrides?: CallOverrides,
  ): Promise<BigNumber[]>

  quote(
    amountA: BigNumberish,
    reserveA: BigNumberish,
    reserveB: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>

  'quote(uint256,uint256,uint256)'(
    amountA: BigNumberish,
    reserveA: BigNumberish,
    reserveB: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>

  removeLiquidity(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'removeLiquidity(address,address,uint256,uint256,uint256,address,uint256)'(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  swapExactTokensForTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'swapExactTokensForTokens(uint256,uint256,address[],address,uint256)'(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  swapTokensForExactTokens(
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'swapTokensForExactTokens(uint256,uint256,address[],address,uint256)'(
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  callStatic: {
    WETH(overrides?: CallOverrides): Promise<string>

    'WETH()'(overrides?: CallOverrides): Promise<string>

    addLiquidity(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      amountA: BigNumber
      amountB: BigNumber
      liquidity: BigNumber
      0: BigNumber
      1: BigNumber
      2: BigNumber
    }>

    'addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)'(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      amountA: BigNumber
      amountB: BigNumber
      liquidity: BigNumber
      0: BigNumber
      1: BigNumber
      2: BigNumber
    }>

    factory(overrides?: CallOverrides): Promise<string>

    'factory()'(overrides?: CallOverrides): Promise<string>

    getAmountIn(
      amountOut: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'getAmountIn(uint256,uint256,uint256)'(
      amountOut: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    getAmountOut(
      amountIn: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'getAmountOut(uint256,uint256,uint256)'(
      amountIn: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    getAmountsIn(amountOut: BigNumberish, path: string[], overrides?: CallOverrides): Promise<BigNumber[]>

    'getAmountsIn(uint256,address[])'(
      amountOut: BigNumberish,
      path: string[],
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>

    getAmountsOut(amountIn: BigNumberish, path: string[], overrides?: CallOverrides): Promise<BigNumber[]>

    'getAmountsOut(uint256,address[])'(
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>

    quote(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'quote(uint256,uint256,uint256)'(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      amountA: BigNumber
      amountB: BigNumber
      0: BigNumber
      1: BigNumber
    }>

    'removeLiquidity(address,address,uint256,uint256,uint256,address,uint256)'(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      amountA: BigNumber
      amountB: BigNumber
      0: BigNumber
      1: BigNumber
    }>

    swapExactTokensForTokens(
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>

    'swapExactTokensForTokens(uint256,uint256,address[],address,uint256)'(
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>

    swapTokensForExactTokens(
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>

    'swapTokensForExactTokens(uint256,uint256,address[],address,uint256)'(
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>
  }

  filters: {}

  estimateGas: {
    WETH(overrides?: CallOverrides): Promise<BigNumber>

    'WETH()'(overrides?: CallOverrides): Promise<BigNumber>

    addLiquidity(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>

    'addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)'(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>

    factory(overrides?: CallOverrides): Promise<BigNumber>

    'factory()'(overrides?: CallOverrides): Promise<BigNumber>

    getAmountIn(
      amountOut: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'getAmountIn(uint256,uint256,uint256)'(
      amountOut: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    getAmountOut(
      amountIn: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'getAmountOut(uint256,uint256,uint256)'(
      amountIn: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    getAmountsIn(amountOut: BigNumberish, path: string[], overrides?: CallOverrides): Promise<BigNumber>

    'getAmountsIn(uint256,address[])'(
      amountOut: BigNumberish,
      path: string[],
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    getAmountsOut(amountIn: BigNumberish, path: string[], overrides?: CallOverrides): Promise<BigNumber>

    'getAmountsOut(uint256,address[])'(
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    quote(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'quote(uint256,uint256,uint256)'(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>

    'removeLiquidity(address,address,uint256,uint256,uint256,address,uint256)'(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>

    swapExactTokensForTokens(
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>

    'swapExactTokensForTokens(uint256,uint256,address[],address,uint256)'(
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>

    swapTokensForExactTokens(
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>

    'swapTokensForExactTokens(uint256,uint256,address[],address,uint256)'(
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>
  }

  populateTransaction: {
    WETH(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'WETH()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    addLiquidity(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)'(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'factory()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    getAmountIn(
      amountOut: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'getAmountIn(uint256,uint256,uint256)'(
      amountOut: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    getAmountOut(
      amountIn: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'getAmountOut(uint256,uint256,uint256)'(
      amountIn: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    getAmountsIn(amountOut: BigNumberish, path: string[], overrides?: CallOverrides): Promise<PopulatedTransaction>

    'getAmountsIn(uint256,address[])'(
      amountOut: BigNumberish,
      path: string[],
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    getAmountsOut(amountIn: BigNumberish, path: string[], overrides?: CallOverrides): Promise<PopulatedTransaction>

    'getAmountsOut(uint256,address[])'(
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    quote(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'quote(uint256,uint256,uint256)'(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'removeLiquidity(address,address,uint256,uint256,uint256,address,uint256)'(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    swapExactTokensForTokens(
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'swapExactTokensForTokens(uint256,uint256,address[],address,uint256)'(
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    swapTokensForExactTokens(
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'swapTokensForExactTokens(uint256,uint256,address[],address,uint256)'(
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>
  }
}
