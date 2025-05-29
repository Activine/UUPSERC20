// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ProxyModule = buildModule("ProxyModule", (builder) => {
  const deployer = builder.getAccount(0);

  // Deploy the implementation contract
  const implementation = builder.contract("UpgradeableERC20");

  // Encode the initialize function call for the contract.
  const initialize = builder.encodeFunctionCall(implementation, "initialize", ["MyToken", "MTK", deployer]);

  // Deploy the ERC1967 Proxy, pointing to the implementation
  const proxy = builder.contract("ERC1967Proxy", [implementation, initialize]);

  return { proxy };
});

export const UpgradeableERC20Module = buildModule("UpgradeableERC20Module", (builder) => {
  // Get the proxy from the previous module.
  const { proxy } = builder.useModule(ProxyModule);

  // Create a contract instance using the deployed proxy's address.
  const instance = builder.contractAt("UpgradeableERC20", proxy);

  return { instance, proxy };
});

export default UpgradeableERC20Module;
