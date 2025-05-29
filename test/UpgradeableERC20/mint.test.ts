import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { UpgradeableERC20 } from "@contracts";
import { ContractTransactionResponse } from "ethers";
import { standardPrepare, HardhatEthersSigner, ZERO_ADDRESS } from "@test-utils";

describe("Method: mint", function () {
  const amountForMint: bigint = ethers.parseUnits("10", 18);

  describe("When one of parameters is incorrect", () => {
    it("When caller is a non-owner", async () => {
      const { user1, token } = await loadFixture(standardPrepare);

      await expect(token.connect(user1).mint(user1.address, amountForMint))
        .to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount")
        .withArgs(user1.address);
    });
  });

  describe("When all parameters are correct", () => {
    let owner: HardhatEthersSigner,
      user1: HardhatEthersSigner,
      token: UpgradeableERC20,
      result: ContractTransactionResponse;

    before(async () => {
      ({ owner, user1, token } = await loadFixture(standardPrepare));

      result = await token.connect(owner).mint(user1.address, amountForMint);
    });

    it("Should be minted tokens for user1", async () => {
      expect(await token.balanceOf(user1)).to.equal(amountForMint);
    });

    it("Should emit the Transfer event", async () => {
      await expect(result).to.emit(token, "Transfer").withArgs(ZERO_ADDRESS, user1, amountForMint);
    });
  });
});
