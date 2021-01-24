// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;

import "../interfaces/gelato/IGelatoCondition.sol";

abstract contract GelatoConditionsStandard is IGelatoCondition {
    string internal constant OK = "OK";
}
