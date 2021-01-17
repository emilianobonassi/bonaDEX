/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BigNumber, ethers, Signer } from 'ethers'
import { getMainnetDeployedContracts } from 'utils/contracts'
import { GAS_LIMIT, GAS_PRICE_CEIL } from 'utils/constants'
import {
  ConditionMakerVaultUnsafe,
  ConditionMakerVaultUnsafe__factory,
  ConnectGelatoProviderPayment,
  ConnectGelatoProviderPayment__factory,
  ConnectorAutoLiquidate,
  ConnectorAutoLiquidate__factory,
} from 'utils/types/compiled'
import deployed from './deployed.json'
import { DSA } from 'utils/types/deployed'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const GelatoCoreLib = require('@gelatonetwork/core')

export interface IConnectors {
  ConnectGelatoProviderPayment: ConnectGelatoProviderPayment
  ConnectorAutoLiquidate: ConnectorAutoLiquidate
}

export const stakeExecutor = async (gelatoExecutor: Signer): Promise<void> => {
  const { GelatoCore } = getMainnetDeployedContracts(gelatoExecutor)
  const tx = await GelatoCore.connect(gelatoExecutor).stakeExecutor({
    value: await GelatoCore.minExecutorStake(),
    gasLimit: GAS_LIMIT,
  })
  await tx.wait()
}

export const provideFunds = async (gelatoProvider: Signer): Promise<void> => {
  const gelatoProviderAddress = await gelatoProvider.getAddress()

  const { GelatoCore } = getMainnetDeployedContracts(gelatoProvider)
  const TASK_AUTOMATION_FUNDS = await GelatoCore.minExecProviderFunds(GAS_LIMIT, GAS_PRICE_CEIL)

  const tx = await GelatoCore.connect(gelatoProvider).provideFunds(gelatoProviderAddress, {
    value: TASK_AUTOMATION_FUNDS,
    gasLimit: GAS_LIMIT,
  })
  await tx.wait()
}

export const providerAssignsExecutor = async (gelatoProvider: Signer, gelatoExecutorAddress: string): Promise<void> => {
  const { GelatoCore } = getMainnetDeployedContracts(gelatoProvider)
  const tx = await GelatoCore.connect(gelatoProvider).providerAssignsExecutor(gelatoExecutorAddress, {
    gasLimit: GAS_LIMIT,
  })
  await tx.wait()
}

export const addProviderModules = async (gelatoProvider: Signer): Promise<void> => {
  const { GelatoCore, ProviderModuleDSA } = getMainnetDeployedContracts(gelatoProvider)
  const tx = await GelatoCore.connect(gelatoProvider).addProviderModules([ProviderModuleDSA.address], {
    gasLimit: GAS_LIMIT,
  })
  await tx.wait()
}

export const getConditionMakerVaultUnsafe = (
  providerOrSigner: Signer | ethers.providers.Provider,
): ConditionMakerVaultUnsafe => {
  const ConditionMakerVaultUnsafe = ConditionMakerVaultUnsafe__factory.connect(
    deployed.ConditionMakerVaultUnsafe,
    providerOrSigner,
  )
  return ConditionMakerVaultUnsafe
}

export const getConnectors = (providerOrSigner: Signer | ethers.providers.Provider): IConnectors => {
  const ConnectorAutoLiquidate = ConnectorAutoLiquidate__factory.connect(
    deployed.ConnectorAutoLiquidate,
    providerOrSigner,
  )
  const ConnectGelatoProviderPayment = ConnectGelatoProviderPayment__factory.connect(
    deployed.ConnectGelatoProviderPayment,
    providerOrSigner,
  )
  return { ConnectorAutoLiquidate, ConnectGelatoProviderPayment }
}

export const setMockPrice = async (gelatoProvider: Signer, mockPrice: string): Promise<void> => {
  const { PriceOracleResolver } = getMainnetDeployedContracts(gelatoProvider)
  const tx = await PriceOracleResolver.setMockPrice(ethers.utils.parseUnits(mockPrice, 18))
  await tx.wait()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const canExec = async (gelatoExecutor: Signer, taskReceipt: any): Promise<string> => {
  const { GelatoCore, GelatoGasPriceOracle } = getMainnetDeployedContracts(gelatoExecutor)
  const gelatoGasPrice = await GelatoGasPriceOracle.latestAnswer()
  const canExec = await GelatoCore.connect(gelatoExecutor).canExec(taskReceipt, GAS_LIMIT, gelatoGasPrice)
  return canExec
}

export const getGelatoGasPrice = async (signer: Signer): Promise<BigNumber> => {
  const { GelatoGasPriceOracle } = getMainnetDeployedContracts(signer)
  const gelatoGasPrice = await GelatoGasPriceOracle.latestAnswer()
  return gelatoGasPrice
}

/**
 * Setup gelato
 * @param gelatoProvider
 * @param gelatoExecutor
 */
export const setupGelato = async (gelatoProvider: Signer, gelatoExecutor: Signer): Promise<void> => {
  const { GelatoCore, ProviderModuleDSA } = getMainnetDeployedContracts(gelatoProvider)

  const gelatoExecutorAddress = await gelatoExecutor.getAddress()
  const gelatoProviderAddress = await gelatoProvider.getAddress()
  const isExecutorMinStaked = await GelatoCore.isExecutorMinStaked(gelatoExecutorAddress)

  if (!isExecutorMinStaked) await stakeExecutor(gelatoExecutor)

  // we don't verify, keep funding
  await provideFunds(gelatoProvider)

  const executorAddress = await GelatoCore.executorByProvider(await gelatoProvider.getAddress())
  if (executorAddress !== gelatoExecutorAddress)
    await providerAssignsExecutor(gelatoProvider, await gelatoExecutor.getAddress())

  const isModuleProvided = await GelatoCore.connect(gelatoProvider).isModuleProvided(
    gelatoProviderAddress,
    ProviderModuleDSA.address,
  )
  if (!isModuleProvided) await addProviderModules(gelatoProvider)
}

/**
 * Submit gelato task
 * @param gelatoProvider
 * @param userAddress
 * @param conditionAddress
 * @param dsa
 * @param vaultId
 * @param minColRatio
 * @param spells
 */
export const submitTask = async (
  gelatoProvider: Signer,
  userAddress: string,
  dsa: DSA,
  vaultId: string,
  minColRatio: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spells: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const { PriceOracleResolver, ProviderModuleDSA, ConnectGelato, GelatoCore } = getMainnetDeployedContracts(
    gelatoProvider,
  )
  const ConditionMakerVaultUnsafe = getConditionMakerVaultUnsafe(gelatoProvider)

  const getMockPrice = await PriceOracleResolver.populateTransaction.getMockPrice(userAddress)

  const conditionData = await ConditionMakerVaultUnsafe.getConditionData(
    vaultId,
    PriceOracleResolver.address,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    getMockPrice.data!,
    minColRatio,
  )

  const conditionMakerVaultUnsafeObj = new GelatoCoreLib.Condition({
    inst: ConditionMakerVaultUnsafe.address,
    data: conditionData,
  })

  const autoLiquidateIfVaultUnsafe = new GelatoCoreLib.Task({
    conditions: [conditionMakerVaultUnsafeObj],
    actions: spells,
  })

  const gelatoExternalProvider = new GelatoCoreLib.GelatoProvider({
    addr: await gelatoProvider.getAddress(), // Gelato Provider Address
    module: ProviderModuleDSA.address, // Gelato DSA module
  })

  const expiryDate = 0
  const submitTask = await ConnectGelato.populateTransaction.submitTask(
    gelatoExternalProvider,
    autoLiquidateIfVaultUnsafe,
    expiryDate,
  )

  await dsa.cast(
    [ConnectGelato.address], // targets
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    [submitTask.data!], // datas
    userAddress, // origin
    {
      gasLimit: GAS_LIMIT,
    },
  )

  const taskReceipt = new GelatoCoreLib.TaskReceipt({
    id: await GelatoCore.currentTaskReceiptId(),
    userProxy: dsa.address,
    provider: gelatoExternalProvider,
    tasks: [autoLiquidateIfVaultUnsafe],
    expiryDate,
  })

  return taskReceipt
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAutoLiquidationSpells = async (vaultId: string, gelatoProvider: Signer): Promise<Array<any>> => {
  const { GelatoCore } = getMainnetDeployedContracts(gelatoProvider)
  const spells = []

  const { ConnectorAutoLiquidate } = getConnectors(gelatoProvider)
  const ConditionMakerVaultUnsafe = getConditionMakerVaultUnsafe(gelatoProvider)

  const getDataAndCastAutoLiquidation = await ConnectorAutoLiquidate.populateTransaction.getDataAndCastAutoLiquidation(
    vaultId,
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  )
  const autoLiquidationSpells = new GelatoCoreLib.Action({
    addr: ConnectorAutoLiquidate.address,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    data: getDataAndCastAutoLiquidation.data!,
    operation: GelatoCoreLib.Operation.Delegatecall,
  })

  spells.push(autoLiquidationSpells)

  const gasPriceCeil = ethers.constants.MaxUint256

  const autoLiquidationTaskSpec = new GelatoCoreLib.TaskSpec({
    conditions: [ConditionMakerVaultUnsafe.address],
    actions: spells,
    gasPriceCeil,
  })

  try {
    await GelatoCore.connect(gelatoProvider).provideTaskSpecs([autoLiquidationTaskSpec], {
      gasLimit: GAS_LIMIT,
    })
    // eslint-disable-next-line no-empty
  } catch (error) {}

  return spells
}
