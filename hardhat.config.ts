/* eslint-disable @typescript-eslint/no-var-requires */
import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

const GelatoCoreLib = require('@gelatonetwork/core')

import { strict as assert } from 'assert'
import { HardhatUserConfig, task } from 'hardhat/config'
import { BigNumber, utils } from 'ethers'

import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-typechain'
import 'hardhat-gas-reporter'
import 'hardhat-typechain'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'

import { mainnetDeployedAddresses } from './constants'

const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY
assert.ok(ALCHEMY_KEY, 'ERROR: No alchemy key set in .env. Make sure to set one!')

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: {
    version: '0.7.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
        blockNumber: 11322881,
      },
      ...mainnetDeployedAddresses,
    },
    // localhost: {
    //   forking: {
    //     url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    //     blockNumber: 11322881,
    //   },
    //   ...mainnetDeployedAddresses,
    // },
  },

  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    showTimeSpent: true,
    currency: 'EUR',
  },
  typechain: {
    outDir: 'types/compiled',
    target: 'ethers-v5',
  },
}

task('fetchGelatoGasPrice', `Returns the current gelato gas price used for calling canExec and exec`)
  .addOptionalParam('gelatocoreaddress')
  .addFlag('log', 'Logs return values to stdout')
  .setAction(
    async (taskArgs, hre): Promise<BigNumber> => {
      try {
        const gelatoCore = await hre.ethers.getContractAt(
          GelatoCoreLib.GelatoCore.abi,
          taskArgs.gelatocoreaddress ? taskArgs.gelatocoreaddress : mainnetDeployedAddresses.GelatoCore,
        )

        const oracleAbi = ['function latestAnswer() view returns (int256)']

        const gelatoGasPriceOracleAddress = await gelatoCore.gelatoGasPriceOracle()

        // Get gelatoGasPriceOracleAddress
        const gelatoGasPriceOracle = await hre.ethers.getContractAt(oracleAbi, gelatoGasPriceOracleAddress)

        // lastAnswer is used by GelatoGasPriceOracle as well as the Chainlink Oracle
        const gelatoGasPrice = await gelatoGasPriceOracle.latestAnswer()

        if (taskArgs.log) {
          console.log(`\ngelatoGasPrice: ${utils.formatUnits(gelatoGasPrice.toString(), 'gwei')} gwei\n`)
        }

        return gelatoGasPrice
      } catch (error) {
        console.error(error, '\n')
        process.exit(1)
      }
    },
  )

export default config
