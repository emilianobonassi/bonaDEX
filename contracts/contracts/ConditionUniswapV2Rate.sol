// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.7.4;

import {GelatoConditionsStandard} from "./GelatoConditionsStandard.sol";
import {IUniswapV2Router} from "../interfaces//uniswap/IUniswapV2Router.sol";
import {SafeMath} from "../utils/SafeMath.sol";
import {IGelatoCore} from "..//interfaces/gelato/IGelatoCore.sol";
import {IERC20} from "../utils/IERC20.sol";

contract ConditionUniswapV2Rate is GelatoConditionsStandard {
    using SafeMath for uint256;

    IUniswapV2Router public immutable uniRouter;
    address public immutable WETH;
    address internal constant ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    // userProxy => taskReceipt.id => refPrice
    mapping(address => mapping(uint256 => uint256)) public refRate;

    constructor(
        address _uniswapV2Router,
        address _weth
    )
        public
    {
        uniRouter = IUniswapV2Router(_uniswapV2Router);
        WETH = _weth;
    }

    /// @dev use this function to encode the data off-chain for the condition data field
    function getConditionData(
        address _user,
        address _sellToken,
        uint256 _sellAmount,
        address _buyToken,
        uint256 _desiredReturnAmount,
        bool _greaterElseSmaller
    )
        public
        pure
        virtual
        returns(bytes memory)
    {
        return abi.encodeWithSelector(
            this.checkRefRateUniswap.selector,
            _user,
            _sellToken,
            _sellAmount,
            _buyToken,
            _desiredReturnAmount,
            _greaterElseSmaller
        );
    }

    // STANDARD Interface
    /// @param _conditionData The encoded data from getConditionData()
    function ok(uint256, bytes calldata _conditionData, uint256)
        public
        view
        virtual
        override
        returns(string memory)
    {
        (address _user,
         address _sellToken,
         uint256 _sellAmount,
         address _buyToken,
         uint256 _desiredReturnAmount,
         bool _greaterElseSmaller
        ) = abi.decode(
             _conditionData[4:],  // slice out selector & taskReceiptId
             (address,address,uint256,address,uint256,bool)
         );

        // 1. Balance Check
        uint256 balance = IERC20(_sellToken).balanceOf(_user);
        if (balance < _sellAmount) return "GelatoKrystsal: Insufficient balance";

        // 2. Approval Check
        uint256 allowance = IERC20(_buyToken).allowance(_user, address(this));
        if (allowance < _sellAmount) return "GelatoKrystsal: Insufficient allowance";

        // 3. Uniswap Rate Check
        return checkRefRateUniswap(
            _user, _sellToken, _sellAmount, _buyToken, _desiredReturnAmount, _greaterElseSmaller
        );
    }

    // Specific Implementation
    function checkRefRateUniswap(
        address,
        address _sellToken,
        uint256 _sellAmount,
        address _buyToken,
        uint256 _desiredReturnAmount,
        bool _greaterElseSmaller
    )
        public
        view
        virtual
        returns(string memory)
    {

        (_sellToken, _buyToken) = convertEthToWeth(_sellToken, _buyToken);

        uint256 expectedReturnAmount = getUniswapRate(_sellToken, _sellAmount, _buyToken);

        if (_greaterElseSmaller) {  // greaterThan
            if (expectedReturnAmount >= _desiredReturnAmount) return OK;
            else return "ExpectedRateIsNotGreaterThanRefRate";
        } else {  // smallerThan
            if (expectedReturnAmount <= _desiredReturnAmount) return OK;
            else return "ExpectedRateIsNotSmallerThanRefRate";
        }

    }

    function getPaths(address _sellToken, address _buyToken)
        internal pure returns(address[] memory paths)
    {
        paths = new address[](2);
        paths[0] = _sellToken;
        paths[1] = _buyToken;
    }


    function getUniswapRate(address _sellToken, uint256 _sellAmount, address _buyToken)
        public
        view
        returns(uint256 expectedReturnAmount)
    {
        address[] memory tokenPath = getPaths(_sellToken, _buyToken);

        try uniRouter.getAmountsOut(_sellAmount, tokenPath)
            returns (uint[] memory expectedAmounts) {
            expectedReturnAmount = expectedAmounts[1];
        } catch {
            revert("UniswapV2GetExpectedRateError");
        }
    }

    function convertEthToWeth(address _sellToken, address _buyToken)
        private
        view
        returns(address, address)
    {
        if (_sellToken == ETH_ADDRESS) _sellToken = address(WETH);
        if (_buyToken == ETH_ADDRESS) _buyToken = address(WETH);
        return (_sellToken, _buyToken);
    }
}