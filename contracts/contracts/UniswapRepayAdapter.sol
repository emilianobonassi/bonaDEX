// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.4;
pragma experimental ABIEncoderV2;

import { ILendingPool } from "../interfaces/aave/ILendingPool.sol";
import { IBaseUniswapAdapter } from "../interfaces/aave/IBaseUniswapAdapter.sol";
import { IFlashLoanReceiver } from "../interfaces/aave/IFlashLoanReceiver.sol";
import { ILendingPoolAddressesProvider } from "../interfaces/aave/ILendingPoolAddressesProvider.sol";
import { IPriceOracleGetter } from "../interfaces/aave/IPriceOracleGetter.sol";
import { IUniswapV2Router } from "../interfaces/uniswap/IUniswapV2Router.sol";
import { DataTypes } from "../libraries/DataTypes.sol";
import { Ownable } from "../utils/Ownable.sol";
import { SafeMath } from "../utils/SafeMath.sol";
import { SafeERC20 } from "../utils/SafeERC20.sol";
import { IERC20 } from "../utils/IERC20.sol";
import { Address } from "../utils/Address.sol";

abstract contract FlashLoanReceiverBase is IFlashLoanReceiver {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    ILendingPoolAddressesProvider public immutable override ADDRESSES_PROVIDER;
    ILendingPool public immutable override LENDING_POOL;

    constructor(ILendingPoolAddressesProvider provider) {
        ADDRESSES_PROVIDER = provider;
        LENDING_POOL = ILendingPool(provider.getLendingPool());
    }
}

/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with GSN meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

interface IERC20Detailed is IERC20 {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);
}

interface IERC20WithPermit is IERC20 {
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
}

/**
 * @title Errors library
 * @author Aave
 * @notice Defines the error messages emitted by the different contracts of the Aave protocol
 * @dev Error messages prefix glossary:
 *  - VL = ValidationLogic
 *  - MATH = Math libraries
 *  - CT = Common errors between tokens (AToken, VariableDebtToken and StableDebtToken)
 *  - AT = AToken
 *  - SDT = StableDebtToken
 *  - VDT = VariableDebtToken
 *  - LP = LendingPool
 *  - LPAPR = LendingPoolAddressesProviderRegistry
 *  - LPC = LendingPoolConfiguration
 *  - RL = ReserveLogic
 *  - LPCM = LendingPoolCollateralManager
 *  - P = Pausable
 */
library Errors {
    //common errors
    string public constant CALLER_NOT_POOL_ADMIN = "33"; // 'The caller must be the pool admin'
    string public constant BORROW_ALLOWANCE_NOT_ENOUGH = "59"; // User borrows on behalf, but allowance are too small

    //contract specific errors
    string public constant VL_INVALID_AMOUNT = "1"; // 'Amount must be greater than 0'
    string public constant VL_NO_ACTIVE_RESERVE = "2"; // 'Action requires an active reserve'
    string public constant VL_RESERVE_FROZEN = "3"; // 'Action cannot be performed because the reserve is frozen'
    string public constant VL_CURRENT_AVAILABLE_LIQUIDITY_NOT_ENOUGH = "4"; // 'The current liquidity is not enough'
    string public constant VL_NOT_ENOUGH_AVAILABLE_USER_BALANCE = "5"; // 'User cannot withdraw more than the available balance'
    string public constant VL_TRANSFER_NOT_ALLOWED = "6"; // 'Transfer cannot be allowed.'
    string public constant VL_BORROWING_NOT_ENABLED = "7"; // 'Borrowing is not enabled'
    string public constant VL_INVALID_INTEREST_RATE_MODE_SELECTED = "8"; // 'Invalid interest rate mode selected'
    string public constant VL_COLLATERAL_BALANCE_IS_0 = "9"; // 'The collateral balance is 0'
    string public constant VL_HEALTH_FACTOR_LOWER_THAN_LIQUIDATION_THRESHOLD = "10"; // 'Health factor is lesser than the liquidation threshold'
    string public constant VL_COLLATERAL_CANNOT_COVER_NEW_BORROW = "11"; // 'There is not enough collateral to cover a new borrow'
    string public constant VL_STABLE_BORROWING_NOT_ENABLED = "12"; // stable borrowing not enabled
    string public constant VL_COLLATERAL_SAME_AS_BORROWING_CURRENCY = "13"; // collateral is (mostly) the same currency that is being borrowed
    string public constant VL_AMOUNT_BIGGER_THAN_MAX_LOAN_SIZE_STABLE = "14"; // 'The requested amount is greater than the max loan size in stable rate mode
    string public constant VL_NO_DEBT_OF_SELECTED_TYPE = "15"; // 'for repayment of stable debt, the user needs to have stable debt, otherwise, he needs to have variable debt'
    string public constant VL_NO_EXPLICIT_AMOUNT_TO_REPAY_ON_BEHALF = "16"; // 'To repay on behalf of an user an explicit amount to repay is needed'
    string public constant VL_NO_STABLE_RATE_LOAN_IN_RESERVE = "17"; // 'User does not have a stable rate loan in progress on this reserve'
    string public constant VL_NO_VARIABLE_RATE_LOAN_IN_RESERVE = "18"; // 'User does not have a variable rate loan in progress on this reserve'
    string public constant VL_UNDERLYING_BALANCE_NOT_GREATER_THAN_0 = "19"; // 'The underlying balance needs to be greater than 0'
    string public constant VL_DEPOSIT_ALREADY_IN_USE = "20"; // 'User deposit is already being used as collateral'
    string public constant LP_NOT_ENOUGH_STABLE_BORROW_BALANCE = "21"; // 'User does not have any stable rate loan for this reserve'
    string public constant LP_INTEREST_RATE_REBALANCE_CONDITIONS_NOT_MET = "22"; // 'Interest rate rebalance conditions were not met'
    string public constant LP_LIQUIDATION_CALL_FAILED = "23"; // 'Liquidation call failed'
    string public constant LP_NOT_ENOUGH_LIQUIDITY_TO_BORROW = "24"; // 'There is not enough liquidity available to borrow'
    string public constant LP_REQUESTED_AMOUNT_TOO_SMALL = "25"; // 'The requested amount is too small for a FlashLoan.'
    string public constant LP_INCONSISTENT_PROTOCOL_ACTUAL_BALANCE = "26"; // 'The actual balance of the protocol is inconsistent'
    string public constant LP_CALLER_NOT_LENDING_POOL_CONFIGURATOR = "27"; // 'The caller of the function is not the lending pool configurator'
    string public constant LP_INCONSISTENT_FLASHLOAN_PARAMS = "28";
    string public constant CT_CALLER_MUST_BE_LENDING_POOL = "29"; // 'The caller of this function must be a lending pool'
    string public constant CT_CANNOT_GIVE_ALLOWANCE_TO_HIMSELF = "30"; // 'User cannot give allowance to himself'
    string public constant CT_TRANSFER_AMOUNT_NOT_GT_0 = "31"; // 'Transferred amount needs to be greater than zero'
    string public constant RL_RESERVE_ALREADY_INITIALIZED = "32"; // 'Reserve has already been initialized'
    string public constant LPC_RESERVE_LIQUIDITY_NOT_0 = "34"; // 'The liquidity of the reserve needs to be 0'
    string public constant LPC_INVALID_ATOKEN_POOL_ADDRESS = "35"; // 'The liquidity of the reserve needs to be 0'
    string public constant LPC_INVALID_STABLE_DEBT_TOKEN_POOL_ADDRESS = "36"; // 'The liquidity of the reserve needs to be 0'
    string public constant LPC_INVALID_VARIABLE_DEBT_TOKEN_POOL_ADDRESS = "37"; // 'The liquidity of the reserve needs to be 0'
    string public constant LPC_INVALID_STABLE_DEBT_TOKEN_UNDERLYING_ADDRESS = "38"; // 'The liquidity of the reserve needs to be 0'
    string public constant LPC_INVALID_VARIABLE_DEBT_TOKEN_UNDERLYING_ADDRESS = "39"; // 'The liquidity of the reserve needs to be 0'
    string public constant LPC_INVALID_ADDRESSES_PROVIDER_ID = "40"; // 'The liquidity of the reserve needs to be 0'
    string public constant LPC_INVALID_CONFIGURATION = "75"; // 'Invalid risk parameters for the reserve'
    string public constant LPC_CALLER_NOT_EMERGENCY_ADMIN = "76"; // 'The caller must be the emergency admin'
    string public constant LPAPR_PROVIDER_NOT_REGISTERED = "41"; // 'Provider is not registered'
    string public constant LPCM_HEALTH_FACTOR_NOT_BELOW_THRESHOLD = "42"; // 'Health factor is not below the threshold'
    string public constant LPCM_COLLATERAL_CANNOT_BE_LIQUIDATED = "43"; // 'The collateral chosen cannot be liquidated'
    string public constant LPCM_SPECIFIED_CURRENCY_NOT_BORROWED_BY_USER = "44"; // 'User did not borrow the specified currency'
    string public constant LPCM_NOT_ENOUGH_LIQUIDITY_TO_LIQUIDATE = "45"; // "There isn't enough liquidity available to liquidate"
    string public constant LPCM_NO_ERRORS = "46"; // 'No errors'
    string public constant LP_INVALID_FLASHLOAN_MODE = "47"; //Invalid flashloan mode selected
    string public constant MATH_MULTIPLICATION_OVERFLOW = "48";
    string public constant MATH_ADDITION_OVERFLOW = "49";
    string public constant MATH_DIVISION_BY_ZERO = "50";
    string public constant RL_LIQUIDITY_INDEX_OVERFLOW = "51"; //  Liquidity index overflows uint128
    string public constant RL_VARIABLE_BORROW_INDEX_OVERFLOW = "52"; //  Variable borrow index overflows uint128
    string public constant RL_LIQUIDITY_RATE_OVERFLOW = "53"; //  Liquidity rate overflows uint128
    string public constant RL_VARIABLE_BORROW_RATE_OVERFLOW = "54"; //  Variable borrow rate overflows uint128
    string public constant RL_STABLE_BORROW_RATE_OVERFLOW = "55"; //  Stable borrow rate overflows uint128
    string public constant CT_INVALID_MINT_AMOUNT = "56"; //invalid amount to mint
    string public constant LP_FAILED_REPAY_WITH_COLLATERAL = "57";
    string public constant CT_INVALID_BURN_AMOUNT = "58"; //invalid amount to burn
    string public constant LP_FAILED_COLLATERAL_SWAP = "60";
    string public constant LP_INVALID_EQUAL_ASSETS_TO_SWAP = "61";
    string public constant LP_REENTRANCY_NOT_ALLOWED = "62";
    string public constant LP_CALLER_MUST_BE_AN_ATOKEN = "63";
    string public constant LP_IS_PAUSED = "64"; // 'Pool is paused'
    string public constant LP_NO_MORE_RESERVES_ALLOWED = "65";
    string public constant LP_INVALID_FLASH_LOAN_EXECUTOR_RETURN = "66";
    string public constant RC_INVALID_LTV = "67";
    string public constant RC_INVALID_LIQ_THRESHOLD = "68";
    string public constant RC_INVALID_LIQ_BONUS = "69";
    string public constant RC_INVALID_DECIMALS = "70";
    string public constant RC_INVALID_RESERVE_FACTOR = "71";
    string public constant LPAPR_INVALID_ADDRESSES_PROVIDER_ID = "72";
    string public constant VL_INCONSISTENT_FLASHLOAN_PARAMS = "73";
    string public constant LP_INCONSISTENT_PARAMS_LENGTH = "74";
    string public constant UL_INVALID_INDEX = "77";
    string public constant LP_NOT_CONTRACT = "78";
    string public constant SDT_STABLE_DEBT_OVERFLOW = "79";
    string public constant SDT_BURN_EXCEEDS_BALANCE = "80";

    enum CollateralManagerErrors {
        NO_ERROR,
        NO_COLLATERAL_AVAILABLE,
        COLLATERAL_CANNOT_BE_LIQUIDATED,
        CURRRENCY_NOT_BORROWED,
        HEALTH_FACTOR_ABOVE_THRESHOLD,
        NOT_ENOUGH_LIQUIDITY,
        NO_ACTIVE_RESERVE,
        HEALTH_FACTOR_LOWER_THAN_LIQUIDATION_THRESHOLD,
        INVALID_EQUAL_ASSETS_TO_SWAP,
        FROZEN_RESERVE
    }
}

/**
 * @title PercentageMath library
 * @author Aave
 * @notice Provides functions to perform percentage calculations
 * @dev Percentages are defined by default with 2 decimals of precision (100.00). The precision is indicated by PERCENTAGE_FACTOR
 * @dev Operations are rounded half up
 **/

library PercentageMath {
    uint256 constant PERCENTAGE_FACTOR = 1e4; //percentage plus two decimals
    uint256 constant HALF_PERCENT = PERCENTAGE_FACTOR / 2;

    /**
     * @dev Executes a percentage multiplication
     * @param value The value of which the percentage needs to be calculated
     * @param percentage The percentage of the value to be calculated
     * @return The percentage of value
     **/
    function percentMul(uint256 value, uint256 percentage) internal pure returns (uint256) {
        if (value == 0 || percentage == 0) {
            return 0;
        }

        require(value <= (type(uint256).max - HALF_PERCENT) / percentage, Errors.MATH_MULTIPLICATION_OVERFLOW);

        return (value * percentage + HALF_PERCENT) / PERCENTAGE_FACTOR;
    }

    /**
     * @dev Executes a percentage division
     * @param value The value of which the percentage needs to be calculated
     * @param percentage The percentage of the value to be calculated
     * @return The value divided the percentage
     **/
    function percentDiv(uint256 value, uint256 percentage) internal pure returns (uint256) {
        require(percentage != 0, Errors.MATH_DIVISION_BY_ZERO);
        uint256 halfPercentage = percentage / 2;

        require(value <= (type(uint256).max - halfPercentage) / PERCENTAGE_FACTOR, Errors.MATH_MULTIPLICATION_OVERFLOW);

        return (value * PERCENTAGE_FACTOR + halfPercentage) / percentage;
    }
}

/**
 * @title BaseUniswapAdapter
 * @notice Implements the logic for performing assets swaps in Uniswap V2
 * @author Aave
 **/
abstract contract BaseUniswapAdapter is FlashLoanReceiverBase, IBaseUniswapAdapter, Ownable {
    using SafeMath for uint256;
    using PercentageMath for uint256;
    using SafeERC20 for IERC20;

    // Max slippage percent allowed
    uint256 public constant override MAX_SLIPPAGE_PERCENT = 3000; // 30%
    // FLash Loan fee set in lending pool
    uint256 public constant override FLASHLOAN_PREMIUM_TOTAL = 9;
    // USD oracle asset address
    address public constant override USD_ADDRESS = 0x10F7Fc1F91Ba351f9C629c5947AD69bD03C05b96;

    //  address public constant WETH_ADDRESS = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2; mainnet
    //  address public constant WETH_ADDRESS = 0xd0a1e359811322d97991e03f863a0c30c2cf029c; kovan

    address public immutable override WETH_ADDRESS;
    IPriceOracleGetter public immutable override ORACLE;
    IUniswapV2Router public immutable override UNISWAP_ROUTER;

    constructor(
        ILendingPoolAddressesProvider addressesProvider,
        IUniswapV2Router uniswapRouter,
        address wethAddress
    ) FlashLoanReceiverBase(addressesProvider) {
        ORACLE = IPriceOracleGetter(addressesProvider.getPriceOracle());
        UNISWAP_ROUTER = uniswapRouter;
        WETH_ADDRESS = wethAddress;
    }

    /**
     * @dev Given an input asset amount, returns the maximum output amount of the other asset and the prices
     * @param amountIn Amount of reserveIn
     * @param reserveIn Address of the asset to be swap from
     * @param reserveOut Address of the asset to be swap to
     * @return uint256 Amount out of the reserveOut
     * @return uint256 The price of out amount denominated in the reserveIn currency (18 decimals)
     * @return uint256 In amount of reserveIn value denominated in USD (8 decimals)
     * @return uint256 Out amount of reserveOut value denominated in USD (8 decimals)
     */
    function getAmountsOut(
        uint256 amountIn,
        address reserveIn,
        address reserveOut
    )
        external
        view
        override
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address[] memory
        )
    {
        AmountCalc memory results = _getAmountsOutData(reserveIn, reserveOut, amountIn);

        return (
            results.calculatedAmount,
            results.relativePrice,
            results.amountInUsd,
            results.amountOutUsd,
            results.path
        );
    }

    /**
     * @dev Returns the minimum input asset amount required to buy the given output asset amount and the prices
     * @param amountOut Amount of reserveOut
     * @param reserveIn Address of the asset to be swap from
     * @param reserveOut Address of the asset to be swap to
     * @return uint256 Amount in of the reserveIn
     * @return uint256 The price of in amount denominated in the reserveOut currency (18 decimals)
     * @return uint256 In amount of reserveIn value denominated in USD (8 decimals)
     * @return uint256 Out amount of reserveOut value denominated in USD (8 decimals)
     */
    function getAmountsIn(
        uint256 amountOut,
        address reserveIn,
        address reserveOut
    )
        external
        view
        override
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address[] memory
        )
    {
        AmountCalc memory results = _getAmountsInData(reserveIn, reserveOut, amountOut);

        return (
            results.calculatedAmount,
            results.relativePrice,
            results.amountInUsd,
            results.amountOutUsd,
            results.path
        );
    }

    /**
     * @dev Swaps an exact `amountToSwap` of an asset to another
     * @param assetToSwapFrom Origin asset
     * @param assetToSwapTo Destination asset
     * @param amountToSwap Exact amount of `assetToSwapFrom` to be swapped
     * @param minAmountOut the min amount of `assetToSwapTo` to be received from the swap
     * @return the amount received from the swap
     */
    function _swapExactTokensForTokens(
        address assetToSwapFrom,
        address assetToSwapTo,
        uint256 amountToSwap,
        uint256 minAmountOut,
        bool useEthPath
    ) internal returns (uint256) {
        uint256 fromAssetDecimals = _getDecimals(assetToSwapFrom);
        uint256 toAssetDecimals = _getDecimals(assetToSwapTo);

        uint256 fromAssetPrice = _getPrice(assetToSwapFrom);
        uint256 toAssetPrice = _getPrice(assetToSwapTo);

        uint256 expectedMinAmountOut =
            amountToSwap
                .mul(fromAssetPrice.mul(10**toAssetDecimals))
                .div(toAssetPrice.mul(10**fromAssetDecimals))
                .percentMul(PercentageMath.PERCENTAGE_FACTOR.sub(MAX_SLIPPAGE_PERCENT));

        require(expectedMinAmountOut < minAmountOut, "minAmountOut exceed max slippage");

        // Approves the transfer for the swap. Approves for 0 first to comply with tokens that implement the anti frontrunning approval fix.
        IERC20(assetToSwapFrom).safeApprove(address(UNISWAP_ROUTER), 0);
        IERC20(assetToSwapFrom).safeApprove(address(UNISWAP_ROUTER), amountToSwap);

        address[] memory path;
        if (useEthPath) {
            path = new address[](3);
            path[0] = assetToSwapFrom;
            path[1] = WETH_ADDRESS;
            path[2] = assetToSwapTo;
        } else {
            path = new address[](2);
            path[0] = assetToSwapFrom;
            path[1] = assetToSwapTo;
        }
        uint256[] memory amounts =
            UNISWAP_ROUTER.swapExactTokensForTokens(amountToSwap, minAmountOut, path, address(this), block.timestamp);

        emit Swapped(assetToSwapFrom, assetToSwapTo, amounts[0], amounts[amounts.length - 1]);

        return amounts[amounts.length - 1];
    }

    /**
     * @dev Receive an exact amount `amountToReceive` of `assetToSwapTo` tokens for as few `assetToSwapFrom` tokens as
     * possible.
     * @param assetToSwapFrom Origin asset
     * @param assetToSwapTo Destination asset
     * @param maxAmountToSwap Max amount of `assetToSwapFrom` allowed to be swapped
     * @param amountToReceive Exact amount of `assetToSwapTo` to receive
     * @return the amount swapped
     */
    function _swapTokensForExactTokens(
        address assetToSwapFrom,
        address assetToSwapTo,
        uint256 maxAmountToSwap,
        uint256 amountToReceive,
        bool useEthPath
    ) internal returns (uint256) {
        uint256 fromAssetDecimals = _getDecimals(assetToSwapFrom);
        uint256 toAssetDecimals = _getDecimals(assetToSwapTo);

        uint256 fromAssetPrice = _getPrice(assetToSwapFrom);
        uint256 toAssetPrice = _getPrice(assetToSwapTo);

        uint256 expectedMaxAmountToSwap =
            amountToReceive
                .mul(toAssetPrice.mul(10**fromAssetDecimals))
                .div(fromAssetPrice.mul(10**toAssetDecimals))
                .percentMul(PercentageMath.PERCENTAGE_FACTOR.add(MAX_SLIPPAGE_PERCENT));

        require(maxAmountToSwap < expectedMaxAmountToSwap, "maxAmountToSwap exceed max slippage");

        // Approves the transfer for the swap. Approves for 0 first to comply with tokens that implement the anti frontrunning approval fix.
        IERC20(assetToSwapFrom).safeApprove(address(UNISWAP_ROUTER), 0);
        IERC20(assetToSwapFrom).safeApprove(address(UNISWAP_ROUTER), maxAmountToSwap);

        address[] memory path;
        if (useEthPath) {
            path = new address[](3);
            path[0] = assetToSwapFrom;
            path[1] = WETH_ADDRESS;
            path[2] = assetToSwapTo;
        } else {
            path = new address[](2);
            path[0] = assetToSwapFrom;
            path[1] = assetToSwapTo;
        }

        uint256[] memory amounts =
            UNISWAP_ROUTER.swapTokensForExactTokens(
                amountToReceive,
                maxAmountToSwap,
                path,
                address(this),
                block.timestamp
            );

        emit Swapped(assetToSwapFrom, assetToSwapTo, amounts[0], amounts[amounts.length - 1]);

        return amounts[0];
    }

    /**
     * @dev Get the price of the asset from the oracle denominated in eth
     * @param asset address
     * @return eth price for the asset
     */
    function _getPrice(address asset) internal view returns (uint256) {
        return ORACLE.getAssetPrice(asset);
    }

    /**
     * @dev Get the decimals of an asset
     * @return number of decimals of the asset
     */
    function _getDecimals(address asset) internal view returns (uint256) {
        return IERC20Detailed(asset).decimals();
    }

    /**
     * @dev Get the aToken associated to the asset
     * @return address of the aToken
     */
    function _getReserveData(address asset) internal view returns (DataTypes.ReserveData memory) {
        return LENDING_POOL.getReserveData(asset);
    }

    /**
     * @dev Pull the ATokens from the user
     * @param reserve address of the asset
     * @param reserveAToken address of the aToken of the reserve
     * @param user address
     * @param amount of tokens to be transferred to the contract
     * @param permitSignature struct containing the permit signature
     */
    function _pullAToken(
        address reserve,
        address reserveAToken,
        address user,
        uint256 amount,
        PermitSignature memory permitSignature
    ) internal {
        if (_usePermit(permitSignature)) {
            IERC20WithPermit(reserveAToken).permit(
                user,
                address(this),
                permitSignature.amount,
                permitSignature.deadline,
                permitSignature.v,
                permitSignature.r,
                permitSignature.s
            );
        }

        // transfer from user to adapter
        IERC20(reserveAToken).safeTransferFrom(user, address(this), amount);

        // withdraw reserve
        LENDING_POOL.withdraw(reserve, amount, address(this));
    }

    /**
     * @dev Tells if the permit method should be called by inspecting if there is a valid signature.
     * If signature params are set to 0, then permit won't be called.
     * @param signature struct containing the permit signature
     * @return whether or not permit should be called
     */
    function _usePermit(PermitSignature memory signature) internal pure returns (bool) {
        return !(uint256(signature.deadline) == uint256(signature.v) && uint256(signature.deadline) == 0);
    }

    /**
     * @dev Calculates the value denominated in USD
     * @param reserve Address of the reserve
     * @param amount Amount of the reserve
     * @param decimals Decimals of the reserve
     * @return whether or not permit should be called
     */
    function _calcUsdValue(
        address reserve,
        uint256 amount,
        uint256 decimals
    ) internal view returns (uint256) {
        uint256 ethUsdPrice = _getPrice(USD_ADDRESS);
        uint256 reservePrice = _getPrice(reserve);

        return amount.mul(reservePrice).div(10**decimals).mul(ethUsdPrice).div(10**18);
    }

    /**
     * @dev Given an input asset amount, returns the maximum output amount of the other asset
     * @param reserveIn Address of the asset to be swap from
     * @param reserveOut Address of the asset to be swap to
     * @param amountIn Amount of reserveIn
     * @return Struct containing the following information:
     *   uint256 Amount out of the reserveOut
     *   uint256 The price of out amount denominated in the reserveIn currency (18 decimals)
     *   uint256 In amount of reserveIn value denominated in USD (8 decimals)
     *   uint256 Out amount of reserveOut value denominated in USD (8 decimals)
     */
    function _getAmountsOutData(
        address reserveIn,
        address reserveOut,
        uint256 amountIn
    ) internal view returns (AmountCalc memory) {
        // Subtract flash loan fee
        uint256 finalAmountIn = amountIn.sub(amountIn.mul(FLASHLOAN_PREMIUM_TOTAL).div(10000));

        address[] memory simplePath = new address[](2);
        simplePath[0] = reserveIn;
        simplePath[1] = reserveOut;

        uint256[] memory amountsWithoutWeth;
        uint256[] memory amountsWithWeth;

        address[] memory pathWithWeth = new address[](3);
        if (reserveIn != WETH_ADDRESS && reserveOut != WETH_ADDRESS) {
            pathWithWeth[0] = reserveIn;
            pathWithWeth[1] = WETH_ADDRESS;
            pathWithWeth[2] = reserveOut;

            try UNISWAP_ROUTER.getAmountsOut(finalAmountIn, pathWithWeth) returns (uint256[] memory resultsWithWeth) {
                amountsWithWeth = resultsWithWeth;
            } catch {
                amountsWithWeth = new uint256[](3);
            }
        } else {
            amountsWithWeth = new uint256[](3);
        }

        uint256 bestAmountOut;
        try UNISWAP_ROUTER.getAmountsOut(finalAmountIn, simplePath) returns (uint256[] memory resultAmounts) {
            amountsWithoutWeth = resultAmounts;

            bestAmountOut = (amountsWithWeth[2] > amountsWithoutWeth[1]) ? amountsWithWeth[2] : amountsWithoutWeth[1];
        } catch {
            amountsWithoutWeth = new uint256[](2);
            bestAmountOut = amountsWithWeth[2];
        }

        uint256 reserveInDecimals = _getDecimals(reserveIn);
        uint256 reserveOutDecimals = _getDecimals(reserveOut);

        uint256 outPerInPrice =
            finalAmountIn.mul(10**18).mul(10**reserveOutDecimals).div(bestAmountOut.mul(10**reserveInDecimals));

        return
            AmountCalc(
                bestAmountOut,
                outPerInPrice,
                _calcUsdValue(reserveIn, amountIn, reserveInDecimals),
                _calcUsdValue(reserveOut, bestAmountOut, reserveOutDecimals),
                (bestAmountOut == 0) ? new address[](2) : (bestAmountOut == amountsWithoutWeth[1])
                    ? simplePath
                    : pathWithWeth
            );
    }

    /**
     * @dev Returns the minimum input asset amount required to buy the given output asset amount
     * @param reserveIn Address of the asset to be swap from
     * @param reserveOut Address of the asset to be swap to
     * @param amountOut Amount of reserveOut
     * @return Struct containing the following information:
     *   uint256 Amount in of the reserveIn
     *   uint256 The price of in amount denominated in the reserveOut currency (18 decimals)
     *   uint256 In amount of reserveIn value denominated in USD (8 decimals)
     *   uint256 Out amount of reserveOut value denominated in USD (8 decimals)
     */
    function _getAmountsInData(
        address reserveIn,
        address reserveOut,
        uint256 amountOut
    ) internal view returns (AmountCalc memory) {
        (uint256[] memory amounts, address[] memory path) = _getAmountsInAndPath(reserveIn, reserveOut, amountOut);

        // Add flash loan fee
        uint256 finalAmountIn = amounts[0].add(amounts[0].mul(FLASHLOAN_PREMIUM_TOTAL).div(10000));

        uint256 reserveInDecimals = _getDecimals(reserveIn);
        uint256 reserveOutDecimals = _getDecimals(reserveOut);

        uint256 inPerOutPrice =
            amountOut.mul(10**18).mul(10**reserveInDecimals).div(finalAmountIn.mul(10**reserveOutDecimals));

        return
            AmountCalc(
                finalAmountIn,
                inPerOutPrice,
                _calcUsdValue(reserveIn, finalAmountIn, reserveInDecimals),
                _calcUsdValue(reserveOut, amountOut, reserveOutDecimals),
                path
            );
    }

    /**
     * @dev Calculates the input asset amount required to buy the given output asset amount
     * @param reserveIn Address of the asset to be swap from
     * @param reserveOut Address of the asset to be swap to
     * @param amountOut Amount of reserveOut
     * @return uint256[] amounts Array containing the amountIn and amountOut for a swap
     */
    function _getAmountsInAndPath(
        address reserveIn,
        address reserveOut,
        uint256 amountOut
    ) internal view returns (uint256[] memory, address[] memory) {
        address[] memory simplePath = new address[](2);
        simplePath[0] = reserveIn;
        simplePath[1] = reserveOut;

        uint256[] memory amountsWithoutWeth;
        uint256[] memory amountsWithWeth;
        address[] memory pathWithWeth = new address[](3);

        if (reserveIn != WETH_ADDRESS && reserveOut != WETH_ADDRESS) {
            pathWithWeth[0] = reserveIn;
            pathWithWeth[1] = WETH_ADDRESS;
            pathWithWeth[2] = reserveOut;

            try UNISWAP_ROUTER.getAmountsIn(amountOut, pathWithWeth) returns (uint256[] memory resultsWithWeth) {
                amountsWithWeth = resultsWithWeth;
            } catch {
                amountsWithWeth = new uint256[](3);
            }
        } else {
            amountsWithWeth = new uint256[](3);
        }

        try UNISWAP_ROUTER.getAmountsIn(amountOut, simplePath) returns (uint256[] memory resultAmounts) {
            amountsWithoutWeth = resultAmounts;

            return
                (amountsWithWeth[2] > amountsWithoutWeth[1])
                    ? (amountsWithWeth, pathWithWeth)
                    : (amountsWithoutWeth, simplePath);
        } catch {
            return (amountsWithWeth, pathWithWeth);
        }
    }

    /**
     * @dev Calculates the input asset amount required to buy the given output asset amount
     * @param reserveIn Address of the asset to be swap from
     * @param reserveOut Address of the asset to be swap to
     * @param amountOut Amount of reserveOut
     * @return uint256[] amounts Array containing the amountIn and amountOut for a swap
     */
    function _getAmountsIn(
        address reserveIn,
        address reserveOut,
        uint256 amountOut,
        bool useEthPath
    ) internal view returns (uint256[] memory) {
        address[] memory path;

        if (useEthPath) {
            path = new address[](3);
            path[0] = reserveIn;
            path[1] = WETH_ADDRESS;
            path[2] = reserveOut;
        } else {
            path = new address[](2);
            path[0] = reserveIn;
            path[1] = reserveOut;
        }

        return UNISWAP_ROUTER.getAmountsIn(amountOut, path);
    }

    /**
     * @dev Emergency rescue for token stucked on this contract, as failsafe mechanism
     * - Funds should never remain in this contract more time than during transactions
     * - Only callable by the owner
     **/
    function rescueTokens(IERC20 token) external onlyOwner {
        token.transfer(owner(), token.balanceOf(address(this)));
    }
}

/**
 * @title UniswapRepayAdapter
 * @notice Uniswap V2 Adapter to perform a repay of a debt with collateral.
 * @author Aave
 **/
contract UniswapRepayAdapter is BaseUniswapAdapter {
    using SafeMath for uint256;
    using PercentageMath for uint256;
    using SafeERC20 for IERC20;

    struct RepayParams {
        address collateralAsset;
        uint256 collateralAmount;
        uint256 rateMode;
        PermitSignature permitSignature;
        bool useEthPath;
    }

    constructor(
        ILendingPoolAddressesProvider addressesProvider,
        IUniswapV2Router uniswapRouter,
        address wethAddress
    ) BaseUniswapAdapter(addressesProvider, uniswapRouter, wethAddress) {}

    /**
     * @dev Uses the received funds from the flash loan to repay a debt on the protocol on behalf of the user. Then pulls
     * the collateral from the user and swaps it to the debt asset to repay the flash loan.
     * The user should give this contract allowance to pull the ATokens in order to withdraw the underlying asset, swap it
     * and repay the flash loan.
     * Supports only one asset on the flash loan.
     * @param assets Address of debt asset
     * @param amounts Amount of the debt to be repaid
     * @param premiums Fee of the flash loan
     * @param initiator Address of the user
     * @param params Additional variadic field to include extra params. Expected parameters:
     *   address collateralAsset Address of the reserve to be swapped
     *   uint256 collateralAmount Amount of reserve to be swapped
     *   uint256 rateMode Rate modes of the debt to be repaid
     *   uint256 permitAmount Amount for the permit signature
     *   uint256 deadline Deadline for the permit signature
     *   uint8 v V param for the permit signature
     *   bytes32 r R param for the permit signature
     *   bytes32 s S param for the permit signature
     */
    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        require(msg.sender == address(LENDING_POOL), "CALLER_MUST_BE_LENDING_POOL");

        RepayParams memory decodedParams = _decodeParams(params);

        _swapAndRepay(
            decodedParams.collateralAsset,
            assets[0],
            amounts[0],
            decodedParams.collateralAmount,
            decodedParams.rateMode,
            initiator,
            premiums[0],
            decodedParams.permitSignature,
            decodedParams.useEthPath
        );

        return true;
    }

    /**
   * @dev Swaps the user collateral for the debt asset and then repay the debt on the protocol on behalf of the user
   * without using flash loans. This method can be used when the temporary transfer of the collateral asset to this
   * contract does not affect the user position.
   * The user should give this contract allowance to pull the ATokens in order to withdraw the underlying asset
   * @param collateralAsset Address of asset to be swapped
   * @param debtAsset Address of debt asset
   * @param collateralAmount Amount of the collateral to be swapped
   * @param debtRepayAmount Amount of the debt to be repaid
   * @param debtRateMode Rate mode of the debt to be repaid
   * @param permitSignature struct containing the permit signature
   * @param useEthPath struct containing the permit signature

   */
    function swapAndRepay(
        address collateralAsset,
        address debtAsset,
        uint256 collateralAmount,
        uint256 debtRepayAmount,
        uint256 debtRateMode,
        PermitSignature calldata permitSignature,
        bool useEthPath
    ) internal {
        DataTypes.ReserveData memory collateralReserveData = _getReserveData(collateralAsset);
        DataTypes.ReserveData memory debtReserveData = _getReserveData(debtAsset);

        address debtToken =
            DataTypes.InterestRateMode(debtRateMode) == DataTypes.InterestRateMode.STABLE
                ? debtReserveData.stableDebtTokenAddress
                : debtReserveData.variableDebtTokenAddress;

        uint256 currentDebt = IERC20(debtToken).balanceOf(msg.sender);
        uint256 amountToRepay = debtRepayAmount <= currentDebt ? debtRepayAmount : currentDebt;

        if (collateralAsset != debtAsset) {
            uint256 maxCollateralToSwap = collateralAmount;
            if (amountToRepay < debtRepayAmount) {
                maxCollateralToSwap = maxCollateralToSwap.mul(amountToRepay).div(debtRepayAmount);
            }

            // Get exact collateral needed for the swap to avoid leftovers
            uint256[] memory amounts = _getAmountsIn(collateralAsset, debtAsset, amountToRepay, useEthPath);
            require(amounts[0] <= maxCollateralToSwap, "slippage too high");

            // Pull aTokens from user
            _pullAToken(collateralAsset, collateralReserveData.aTokenAddress, msg.sender, amounts[0], permitSignature);

            // Swap collateral for debt asset
            _swapTokensForExactTokens(collateralAsset, debtAsset, amounts[0], amountToRepay, useEthPath);
        } else {
            // Pull aTokens from user
            _pullAToken(
                collateralAsset,
                collateralReserveData.aTokenAddress,
                msg.sender,
                amountToRepay,
                permitSignature
            );
        }

        // Repay debt. Approves 0 first to comply with tokens that implement the anti frontrunning approval fix
        IERC20(debtAsset).safeApprove(address(LENDING_POOL), 0);
        IERC20(debtAsset).safeApprove(address(LENDING_POOL), amountToRepay);
        LENDING_POOL.repay(debtAsset, amountToRepay, debtRateMode, msg.sender);
    }

    /**
     * @dev Perform the repay of the debt, pulls the initiator collateral and swaps to repay the flash loan
     *
     * @param collateralAsset Address of token to be swapped
     * @param debtAsset Address of debt token to be received from the swap
     * @param amount Amount of the debt to be repaid
     * @param collateralAmount Amount of the reserve to be swapped
     * @param rateMode Rate mode of the debt to be repaid
     * @param initiator Address of the user
     * @param premium Fee of the flash loan
     * @param permitSignature struct containing the permit signature
     */
    function _swapAndRepay(
        address collateralAsset,
        address debtAsset,
        uint256 amount,
        uint256 collateralAmount,
        uint256 rateMode,
        address initiator,
        uint256 premium,
        PermitSignature memory permitSignature,
        bool useEthPath
    ) internal {
        DataTypes.ReserveData memory collateralReserveData = _getReserveData(collateralAsset);

        // Repay debt. Approves for 0 first to comply with tokens that implement the anti frontrunning approval fix.
        IERC20(debtAsset).safeApprove(address(LENDING_POOL), 0);
        IERC20(debtAsset).safeApprove(address(LENDING_POOL), amount);
        uint256 repaidAmount = IERC20(debtAsset).balanceOf(address(this));
        LENDING_POOL.repay(debtAsset, amount, rateMode, initiator);
        repaidAmount = repaidAmount.sub(IERC20(debtAsset).balanceOf(address(this)));

        if (collateralAsset != debtAsset) {
            uint256 maxCollateralToSwap = collateralAmount;
            if (repaidAmount < amount) {
                maxCollateralToSwap = maxCollateralToSwap.mul(repaidAmount).div(amount);
            }

            uint256 neededForFlashLoanDebt = repaidAmount.add(premium);
            uint256[] memory amounts = _getAmountsIn(collateralAsset, debtAsset, neededForFlashLoanDebt, useEthPath);
            require(amounts[0] <= maxCollateralToSwap, "slippage too high");

            // Pull aTokens from user
            _pullAToken(collateralAsset, collateralReserveData.aTokenAddress, initiator, amounts[0], permitSignature);

            // Swap collateral asset to the debt asset
            _swapTokensForExactTokens(collateralAsset, debtAsset, amounts[0], neededForFlashLoanDebt, useEthPath);
        } else {
            // Pull aTokens from user
            _pullAToken(
                collateralAsset,
                collateralReserveData.aTokenAddress,
                initiator,
                repaidAmount.add(premium),
                permitSignature
            );
        }

        // Repay flashloan. Approves for 0 first to comply with tokens that implement the anti frontrunning approval fix.
        IERC20(debtAsset).safeApprove(address(LENDING_POOL), 0);
        IERC20(debtAsset).safeApprove(address(LENDING_POOL), amount.add(premium));
    }

    /**
     * @dev Decodes debt information encoded in the flash loan params
     * @param params Additional variadic field to include extra params. Expected parameters:
     *   address collateralAsset Address of the reserve to be swapped
     *   uint256 collateralAmount Amount of reserve to be swapped
     *   uint256 rateMode Rate modes of the debt to be repaid
     *   uint256 permitAmount Amount for the permit signature
     *   uint256 deadline Deadline for the permit signature
     *   uint8 v V param for the permit signature
     *   bytes32 r R param for the permit signature
     *   bytes32 s S param for the permit signature
     * @return RepayParams struct containing decoded params
     */
    function _decodeParams(bytes memory params) internal pure returns (RepayParams memory) {
        (
            address collateralAsset,
            uint256 collateralAmount,
            uint256 rateMode,
            uint256 permitAmount,
            uint256 deadline,
            uint8 v,
            bytes32 r,
            bytes32 s,
            bool useEthPath
        ) = abi.decode(params, (address, uint256, uint256, uint256, uint256, uint8, bytes32, bytes32, bool));

        return
            RepayParams(
                collateralAsset,
                collateralAmount,
                rateMode,
                PermitSignature(permitAmount, deadline, v, r, s),
                useEthPath
            );
    }
}
