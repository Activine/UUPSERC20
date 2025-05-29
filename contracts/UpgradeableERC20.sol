// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {ERC20BurnableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title UpgradeableERC20
 * @notice Implements an upgradeable ERC20 token with burn and mint capabilities.
 * @dev This contract is based on OpenZeppelin's upgradeable modules and follows the UUPS (Universal Upgradeable Proxy Standard) pattern.
 *      It includes role-restricted minting (only the owner can mint), token burning, and upgrade authorization logic.
 *      Initialization is separated from deployment to support proxy-based upgradeability.
 */
contract UpgradeableERC20 is
    Initializable,
    ERC20Upgradeable,
    ERC20BurnableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    /// @notice Disables initializers for the implementation contract to prevent misuse.
    /// @dev This constructor is only used to prevent direct initialization of the logic contract.
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @notice Initializes the token with name, symbol, and owner address.
     * @dev This function replaces the constructor in upgradeable contracts.
     *      It must be called only once through the proxy.
     * @param _name The name of the token.
     * @param _symbol The symbol of the token.
     * @param _initialOwner The address that will be granted ownership rights.
     */
    function initialize(string memory _name, string memory _symbol, address _initialOwner) public initializer {
        __ERC20_init(_name, _symbol);
        __ERC20Burnable_init();
        __Ownable_init(_initialOwner);
        __UUPSUpgradeable_init();
    }

    /**
     * @notice Mints new tokens to the specified address.
     * @dev Only the contract owner can call this function.
     * @param to The address that will receive the newly minted tokens.
     * @param amount The number of tokens to mint.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /**
     * @notice Authorizes an upgrade of the contract to a new implementation.
     * @dev Required by UUPS upgradeability. Only callable by the owner.
     * @param newImplementation The address of the new implementation contract.
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
