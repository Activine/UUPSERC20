import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { UpgradeableERC20 } from "@contracts";
import { ContractTransactionResponse } from "ethers";
import { standardPrepare, HardhatEthersSigner, ZERO_ADDRESS } from "@test-utils";

describe("Method: burn", function () {
  const amountForBurn: bigint = ethers.parseUnits("5", 18);
  const amountForMint: bigint = ethers.parseUnits("15", 18);

  describe("When all parameters are correct", () => {
    let owner: HardhatEthersSigner,
      user1: HardhatEthersSigner,
      token: UpgradeableERC20,
      result: ContractTransactionResponse;

    before(async () => {
      ({ owner, user1, token } = await loadFixture(standardPrepare));
      await token.connect(owner).mint(user1.address, amountForMint);

      result = await token.connect(user1).burn(amountForBurn);
    });

    it("Should be burned tokens for user1", async () => {
      expect(await token.balanceOf(user1)).to.equal(amountForMint - amountForBurn);
    });

    it("Should emit the Transfer event", async () => {
      await expect(result).to.emit(token, "Transfer").withArgs(user1, ZERO_ADDRESS, amountForBurn);
    });
  });
});
