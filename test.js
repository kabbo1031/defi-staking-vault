const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StakingVault", function () {
  it("Should allow stake and withdraw", async function () {
    const [owner] = await ethers.getSigners();
    
    // Deploy Token
    const Token = await ethers.getContractFactory("MockToken");
    const token = await Token.deploy();
    await token.deployed();

    // Deploy Vault
    const Vault = await ethers.getContractFactory("StakingVault");
    const vault = await Vault.deploy(token.address);
    await vault.deployed();

    // Approve & Stake
    await token.approve(vault.address, ethers.utils.parseEther("100"));
    await vault.stake(ethers.utils.parseEther("100"));

    expect(await vault.balances(owner.address)).to.equal(ethers.utils.parseEther("100"));

    // Withdraw
    await vault.withdraw(ethers.utils.parseEther("50"));
    expect(await vault.balances(owner.address)).to.equal(ethers.utils.parseEther("50"));
  });
});
