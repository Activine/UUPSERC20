import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, upgrades } from "hardhat";
import { UpgradeableERC20, UpgradeableERC20V2 } from "@contracts";
import { standardPrepare, HardhatEthersSigner } from "@test-utils";

describe("Method: upgradeToAndCall", function () {
  const amountForMint: bigint = ethers.parseUnits("10", 18);

  describe("When one of parameters is incorrect", () => {
    it("should not allow upgrade by non-owner", async () => {
      const { user1, token } = await loadFixture(standardPrepare);

      const TokenV2 = await ethers.getContractFactory("UpgradeableERC20V2");

      await expect(upgrades.upgradeProxy(token, TokenV2.connect(user1)))
        .to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount")
        .withArgs(user1.address);
    });
  });

  describe("When all parameters are correct", () => {
    let owner: HardhatEthersSigner,
      user1: HardhatEthersSigner,
      token: UpgradeableERC20,
      tokenV2: UpgradeableERC20V2;

    before(async () => {
      ({ owner, user1, token } = await loadFixture(standardPrepare));

      await token.connect(owner).mint(user1.address, amountForMint);

      const TokenV2 = await ethers.getContractFactory("UpgradeableERC20V2");
      tokenV2 = await upgrades.upgradeProxy(token, TokenV2.connect(owner));

      expect(await tokenV2.name()).to.equal("MyToken");
      expect(await tokenV2.symbol()).to.equal("MTK");
      expect(await tokenV2.owner()).to.equal(owner.address);
    });

    it("Should be upgraded", () => {
      expect(token.target).to.equal(tokenV2.target);
    });

    it("Should be able to call new methods added in the upgraded contract", async () => {
      await tokenV2.incrementCounter();
      expect(await tokenV2.counter()).to.equal(1);
    });

    it("Should preserved balances after upgrade", async () => {
      expect(await tokenV2.balanceOf(user1)).to.equal(amountForMint);
    });
  });
});
