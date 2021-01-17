/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai')

import { Signer } from 'ethers'
import { getMainnetDeployedContracts } from '../../utils/contracts'
import { GAS_LIMIT, GAS_PRICE_CEIL } from '../../utils/constants'

export const stakeExecutor = async (gelatoExecutor: Signer): Promise<void> => {
  const gelatoExecutorAddress = await gelatoExecutor.getAddress()

  const { GelatoCore } = getMainnetDeployedContracts(gelatoExecutor)

  await GelatoCore.connect(gelatoExecutor).stakeExecutor({
    value: await GelatoCore.minExecutorStake(),
  })

  expect(await GelatoCore.isExecutorMinStaked(gelatoExecutorAddress)).to.be.true
}

export const provideFunds = async (gelatoProvider: Signer): Promise<void> => {
  const gelatoProviderAddress = await gelatoProvider.getAddress()

  const { GelatoCore } = getMainnetDeployedContracts(gelatoProvider)
  const TASK_AUTOMATION_FUNDS = await GelatoCore.minExecProviderFunds(GAS_LIMIT, GAS_PRICE_CEIL)

  await expect(
    GelatoCore.connect(gelatoProvider).provideFunds(gelatoProviderAddress, {
      value: TASK_AUTOMATION_FUNDS,
    }),
  ).to.emit(GelatoCore, 'LogFundsProvided')

  expect(await GelatoCore.providerFunds(gelatoProviderAddress)).to.be.equal(TASK_AUTOMATION_FUNDS)
}

export const providerAssignsExecutor = async (gelatoProvider: Signer, gelatoExecutorAddress: string): Promise<void> => {
  const gelatoProviderAddress = await gelatoProvider.getAddress()

  const { GelatoCore } = getMainnetDeployedContracts(gelatoProvider)
  await expect(GelatoCore.connect(gelatoProvider).providerAssignsExecutor(gelatoExecutorAddress)).to.emit(
    GelatoCore,
    'LogProviderAssignedExecutor',
  )

  expect(await GelatoCore.executorByProvider(gelatoProviderAddress)).to.be.equal(gelatoExecutorAddress)
}

export const addProviderModules = async (gelatoProvider: Signer, providerModuleAddress: string): Promise<void> => {
  const gelatoProviderAddress = await gelatoProvider.getAddress()

  const { GelatoCore } = getMainnetDeployedContracts(gelatoProvider)
  await expect(GelatoCore.connect(gelatoProvider).addProviderModules([providerModuleAddress])).to.emit(
    GelatoCore,
    'LogProviderModuleAdded',
  )

  expect(await GelatoCore.connect(gelatoProvider).isModuleProvided(gelatoProviderAddress, providerModuleAddress)).to.be
    .true
}
