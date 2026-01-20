const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  // 1. Deploy the Token
  const Token = await hre.ethers.getContractFactory("MockToken");
  const token = await Token.deploy();
  await token.deployed();
  console.log("MockToken deployed to:", token.address);

  // 2. Deploy the Vault (pass token address)
  const Vault = await hre.ethers.getContractFactory("StakingVault");
  const vault = await Vault.deploy(token.address);
  await vault.deployed();
  console.log("StakingVault deployed to:", vault.address);

  console.log("--- CONFIG ---");
  console.log("Copy these into app.js:");
  console.log(`const TOKEN_ADDRESS = "${token.address}";`);
  console.log(`const VAULT_ADDRESS = "${vault.address}";`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
