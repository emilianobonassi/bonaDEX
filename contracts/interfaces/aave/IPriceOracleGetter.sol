// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.4;

interface IPriceOracleGetter {
    /**
     * @dev returns the asset price in ETH
     * @param asset the address of the asset
     * @return the ETH price of the asset
     **/
    function getAssetPrice(address asset) external view returns (uint256);
}