import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC20Module = buildModule("ERC20Module", (m) => {
  const initialOwner = m.getParameter("initialOwner"); // <- обязательно

  const erc20 = m.contract("MyToken", [initialOwner]);

  return { erc20 };
});

export default ERC20Module;
