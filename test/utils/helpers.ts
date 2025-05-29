import { ethers, upgrades } from "hardhat";
import { UpgradeableERC20 } from "@contracts";
import { HardhatEthersSigner } from "@test-utils";

export type PrepareStruct = {
  owner: HardhatEthersSigner;
  user1: HardhatEthersSigner;
  user2: HardhatEthersSigner;
  token: UpgradeableERC20;
};

async function standardPrepare(): Promise<PrepareStruct> {
  const [owner, user1, user2]: HardhatEthersSigner[] = await ethers.getSigners();

  const TokenInstance = await ethers.getContractFactory("UpgradeableERC20");
  const token = await upgrades.deployProxy(TokenInstance, ["MyToken", "MTK", owner.address], {
    initializer: "initialize",
  });

  await token.waitForDeployment();

  return {
    owner,
    user1,
    user2,
    token,
  };
}

export { standardPrepare };
