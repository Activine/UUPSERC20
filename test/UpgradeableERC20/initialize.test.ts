import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { HardhatEthersSigner } from "@test-utils";
import { UpgradeableERC20 } from "@contracts";

describe("Method: initialize", function () {
  let token: UpgradeableERC20, owner: HardhatEthersSigner;

  describe("When all parameters are correct", () => {
    before(async () => {
      [owner] = await ethers.getSigners();

      const TokenInstance = await ethers.getContractFactory("UpgradeableERC20");
      token = await upgrades.deployProxy(TokenInstance, ["MyToken", "MTK", owner.address], {
        initializer: "initialize",
      });

      await token.waitForDeployment();
    });

    it("should initialize with correct data", async () => {
      expect(await token.name()).to.equal("MyToken");
      expect(await token.symbol()).to.equal("MTK");
      expect(await token.owner()).to.equal(owner.address);
    });
  });

  describe("When one of parameters is incorrect", () => {
    it("should not initialize twice", async () => {
      await expect(
        token.connect(owner).initialize("MyToken", "MTK", owner.address),
      ).to.be.revertedWithCustomError(token, "InvalidInitialization");
    });
  });
});
