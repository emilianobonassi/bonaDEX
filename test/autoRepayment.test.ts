const { expect } = require('chai')
const hre = require('hardhat')
const { deployments, ethers } = hre

const { signTypedData_v4 } = require('eth-sig-util')
const { fromRpcSig } = require('ethereumjs-util')

let userWallet: any
let userAddress: string
let lendingPoolAddressProvider: any
let lendingPool: any
let wethGateway: any
let executor: any
let executorAddress: string
let dai: any
let aETH: any
let uniswapRepayAdapter: any
let borrowAmt: any
let depositValue: any
describe('Auto Repayment of Aave debt Test', function () {
  this.timeout(0)
  if (hre.network.name !== 'hardhat') {
    console.error('Test Suite is meant to be run on hardhat only')
    process.exit(1)
  }

  before(async () => {
    // Deploy contract dependencies
    await deployments.fixture()

    // Get Test Wallet for local testnet
    ;[userWallet, executor] = await ethers.getSigners()
    userAddress = await userWallet.getAddress()
    executorAddress = await executor.getAddress()

    // Get Aavve Lending Pool Address Provider
    lendingPoolAddressProvider = await ethers.getContractAt(
      'ILendingPoolAddressesProvider',
      hre.network.config.LendingPoolAddressesProvider,
    )
    const lendingPoolAddress = await lendingPoolAddressProvider.getLendingPool()

    // Get Aavve Lending Pool
    lendingPool = await ethers.getContractAt('ILendingPool', lendingPoolAddress)

    wethGateway = await ethers.getContractAt(
      [
        'function depositETH(address onBehalfOf, uint16 referralCode) payable',
        'function getAWETHAddress() external view returns (address)',
      ],
      hre.network.config.WethGateway,
    )

    dai = await ethers.getContractAt('IERC20', hre.network.config.Dai)

    const aEthAddress = await wethGateway.getAWETHAddress()
    aETH = await ethers.getContractAt('IERC20', aEthAddress)

    uniswapRepayAdapter = await ethers.getContractAt(
      [
        'function swapAndRepay(address collateralAsset, address debtAsset, uint256 collateralAmount, uint256 debtRepayAmount, uint256 debtRateMode, tuple(uint256 amount, uint256 deadline, uint8 v, bytes32 r, bytes32 s), bool useEthPath)',
      ],
      hre.network.config.UniswapRepayAdapter,
    )
  })

  it('#1: Deposit ETH on Aave and borrow DAI', async () => {
    depositValue = ethers.utils.parseEther('2')

    // 1. deposit 2 ETH into lending pool to get 2 aETH
    await wethGateway.depositETH(userAddress, 0, { value: depositValue })

    const aEthBalance = await aETH.balanceOf(userAddress)

    expect(aEthBalance).to.be.eq(depositValue)

    borrowAmt = ethers.utils.parseUnits('100', '18')

    // 2. Borrow dai
    await lendingPool.borrow(dai.address, borrowAmt, 2, 0, userAddress)

    const daiBalance = await dai.balanceOf(userAddress)

    expect(daiBalance).to.be.eq(borrowAmt)
  })

  it('#2: Approve Executor and let him repay debt on users behalf', async () => {
    // Check User Account data
    let userData = await lendingPool.getUserAccountData(userAddress)

    const reserveData = await lendingPool.getReserveData(dai.address)

    const debtToken = await ethers.getContractAt('IERC20', reserveData.variableDebtTokenAddress)

    const debtTokenBalance = await debtToken.balanceOf(userAddress)

    expect(userData.totalDebtETH).to.be.gt(0)

    const aEthAmount = await aETH.balanceOf(userAddress)

    // User approves executor to move funds
    await aETH.increaseAllowance(uniswapRepayAdapter.address, aEthAmount)

    // Pay back dai debt
    const permit = {
      amount: 0,
      deadline: 0,
      v: 0,
      r: ethers.constants.HashZero,
      s: ethers.constants.HashZero,
    }

    /*
            address collateralAsset,
            address debtAsset,
            uint256 collateralAmount,
            uint256 debtRepayAmount,
            uint256 debtRateMode,
            PermitSignature calldata permitSignature,
            bool useEthPath
        */

    let remainingAethBalance = await aETH.balanceOf(userAddress)
    let daiBalance = await dai.balanceOf(userAddress)

    // 102 % of debt amount
    const paybackAmount = debtTokenBalance.add(debtTokenBalance.mul(2).div(100))

    await uniswapRepayAdapter.swapAndRepay(
      hre.network.config.Weth,
      dai.address,
      depositValue,
      paybackAmount,
      2,
      permit,
      false,
    )

    remainingAethBalance = await aETH.balanceOf(userAddress)

    daiBalance = await dai.balanceOf(userAddress)

    userData = await lendingPool.getUserAccountData(userAddress)

    expect(userData.totalDebtETH).to.be.eq(0)
  })
})
