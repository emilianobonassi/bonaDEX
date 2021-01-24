// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.4;

import { IGelatoGasPriceOracle } from "../interfaces/gelato/IGelatoGasPriceOracle.sol";
import { GelatoGasPriceOracle } from "./CAddresses.sol";

IGelatoGasPriceOracle constant GELATO_GAS_PRICE_ORACLE = IGelatoGasPriceOracle(GelatoGasPriceOracle);
