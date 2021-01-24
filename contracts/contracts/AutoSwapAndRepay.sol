// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import { GelatoConditionsStandard } from "./GelatoConditionsStandard.sol";
import { ConditionUniswapV2Rate } from "./ConditionUniswapV2Rate.sol";
import {
    IGelatoCore,
    Provider,
    Condition,
    Operation,
    DataFlow,
    Action,
    Task,
    TaskSpec
} from "../interfaces/gelato/IGelatoCore.sol";
import { SafeMath } from "../utils/SafeMath.sol";
import { SafeERC20 } from "../utils/SafeERC20.sol";
import { IERC20 } from "../utils/IERC20.sol";
import { Ownable } from "../utils/Ownable.sol";
import {
    UniswapRepayAdapter,
    IUniswapV2Router,
    ILendingPoolAddressesProvider,
    IBaseUniswapAdapter
} from "./UniswapRepayAdapter.sol";

// Contract to automatically pay back Aave debt using limit orders powered by Gelato
contract AutoSwapAndRepay is UniswapRepayAdapter, ConditionUniswapV2Rate {
    using SafeERC20 for Ownable;
    using SafeMath for uint256;

    IGelatoCore public immutable gelatoCore;
    // IBaseUniswapAdapter public immutable uniswapRepayAdapter;
    address internal constant _ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    constructor(
        address _gelatoCore,
        address _executor,
        address _uniswapV2Router,
        address _weth,
        ILendingPoolAddressesProvider _addressesProvider,
        IUniswapV2Router _uniswapRouter
    )
        payable
        ConditionUniswapV2Rate(_uniswapV2Router, _weth)
        UniswapRepayAdapter(_addressesProvider, _uniswapRouter, _weth)
    {
        // One time Gelato Setup
        IGelatoCore(_gelatoCore).providerAssignsExecutor(_executor);
        address[] memory providerModules = new address[](1);
        providerModules[0] = address(this);
        IGelatoCore(_gelatoCore).addProviderModules(providerModules);
        if (msg.value > 0) IGelatoCore(_gelatoCore).provideFunds{ value: msg.value }(address(this));

        // Set immutables
        gelatoCore = IGelatoCore(_gelatoCore);
    }

    modifier onlyGelato() {
        require(msg.sender == address(gelatoCore));
        _;
    }

    function submitAutoDebtRepayment(
        address _sellToken,
        uint256 _sellAmount,
        address _buyToken,
        uint256 _refOutputAmount,
        bool _greaterElseSmaller,
        uint256 _debtRateMode,
        IBaseUniswapAdapter.PermitSignature calldata _permitSignature
    ) external {
        // Submit Task Cycle to Gelato
        Provider memory provider = Provider({ addr: address(this), module: address(this) });

        Task memory task =
            _getGelatoTask(
                _sellToken,
                _sellAmount,
                _buyToken,
                _refOutputAmount,
                _greaterElseSmaller,
                _debtRateMode,
                _permitSignature
            );

        gelatoCore.submitTask(provider, task, 0);
    }

    /// @dev What happens if collateral or debt amount changes? Try to make it variable
    function swapAndRepay(
        address _sellToken,
        uint256 _sellAmount,
        address _buyToken,
        uint256 _refOutputAmount,
        uint256 _debtRateMode,
        IBaseUniswapAdapter.PermitSignature calldata _permitSignature
    ) external onlyGelato {
        swapAndRepay(_sellToken, _buyToken, _sellAmount, _refOutputAmount, _debtRateMode, _permitSignature, true);
    }

    // ############# View Methods #############

    /// @dev Called by GelatoCore at execution time
    function execPayload(
        uint256,
        address,
        address,
        Task calldata _task,
        uint256
    ) external pure returns (bytes memory payload, bool) {
        return (_task.actions[0].data, false);
    }

    // solhint-disable-next-line function-max-lines
    function _getGelatoTask(
        address _sellToken,
        uint256 _sellAmount,
        address _buyToken,
        uint256 _refOutputAmount,
        bool _greaterElseSmaller,
        uint256 _debtRateMode,
        IBaseUniswapAdapter.PermitSignature calldata _permitSignature
    ) private view returns (Task memory task) {
        // Uniswap Price Condition
        Condition memory condition =
            Condition({
                inst: address(this),
                data: getConditionData(
                    msg.sender,
                    _sellToken,
                    _sellAmount,
                    _buyToken,
                    _refOutputAmount,
                    _greaterElseSmaller
                )
            });

        Condition[] memory conditions = new Condition[](1);
        conditions[0] = condition;

        Action memory swapAndRepay =
            Action({
                addr: address(this),
                data: abi.encodeWithSelector(
                    this.swapAndRepay.selector,
                    _sellToken,
                    _sellAmount,
                    _buyToken,
                    _refOutputAmount,
                    _debtRateMode,
                    _permitSignature
                ),
                operation: Operation.Call,
                dataFlow: DataFlow.None,
                value: 0,
                termsOkCheck: false
            });
        Action[] memory actions = new Action[](1);
        actions[0] = swapAndRepay;

        task = Task({
            conditions: conditions,
            actions: actions,
            selfProviderGasLimit: 3000000, // allowing all actions to consume 3M gas
            selfProviderGasPriceCeil: 0
        });
    }

    // ############# Private Methods #############

    // ############# Mgt Methods #############

    // Everyone can add funds
    function provideFunds() public payable {
        IGelatoCore(gelatoCore).provideFunds{ value: msg.value }(address(this));
    }

    function unprovideFunds(uint256 _amount, address _dest) public onlyOwner {
        uint256 amount = IGelatoCore(gelatoCore).unprovideFunds(_amount);
        (bool success, ) = _dest.call{ value: amount }("");
        require(success, "unprovideFunds:: Reverted");
    }

    // ############# Fallback #############
    // solhint-disable-next-line no-empty-blocks
    receive() external payable {}
}
