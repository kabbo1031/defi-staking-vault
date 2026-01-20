# DeFi Staking Vault

A "flat" architecture implementation of a crypto staking vault. This repository focuses on the most critical interaction in DeFi: the **Approve -> TransferFrom** pattern.

## 🏦 Functionality
1. **Mock Token**: A fake currency ($MOCK) is deployed for testing.
2. **Vault Contract**: Holds user funds securely.
3. **Approve**: User authorizes the Vault to spend their tokens.
4. **Stake**: Vault pulls tokens from User to Contract.
5. **Withdraw**: User retrieves their tokens.

## ⚠️ Key Learning Concept
Before a smart contract can take tokens from your wallet, you must **Approve** it. This dApp handles that two-step process in the UI.

## 🏃‍♂️ Quick Start

1. **Install**
   ```bash
   npm install
