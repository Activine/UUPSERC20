// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {UpgradeableERC20} from "../UpgradeableERC20.sol";

/**
 * @title UpgradeableERC20V2
 * @notice Extension of the UpgradeableERC20 token with additional state and functionality.
 * @dev This upgraded version introduces a new `counter` state variable and a function to increment it.
 *      It uses the `reinitializer` modifier to safely initialize new state during upgrades (version 2).
 *      The contract maintains compatibility with the UUPS upgrade pattern.
 */
contract UpgradeableERC20V2 is UpgradeableERC20 {
    uint256 public counter;

    /**
     * @notice Increments the counter by 1.
     * @dev This function demonstrates new logic added in the V2 version of the contract.
     *      It can be used to test upgraded functionality.
     */
    function incrementCounter() external {
        counter += 1;
    }

    /**
     * @notice Initializes the V2 state variables.
     * @dev This function must be called after upgrading the proxy to this implementation.
     *      It sets the initial value of `counter`. Marked with `reinitializer(2)` to avoid conflicts with previous initializers.
     * @custom:oz-upgrades-unsafe-allow-reinitialization
     */
    /// @custom:oz-upgrades-unsafe-allow-reinitialization
    function initializeV2() public reinitializer(2) {
        counter = 0;
    }
}
