// PASTE ADDRESSES FROM DEPLOY TERMINAL HERE
const TOKEN_ADDRESS = "YOUR_TOKEN_ADDRESS";
const VAULT_ADDRESS = "YOUR_VAULT_ADDRESS";

// Minimum ABIs needed
const TOKEN_ABI = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function balanceOf(address account) external view returns (uint256)",
    "function allowance(address owner, address spender) external view returns (uint256)"
];
const VAULT_ABI = [
    "function stake(uint256 amount) external",
    "function withdraw(uint256 amount) external",
    "function balances(address account) external view returns (uint256)"
];

let provider, signer, tokenContract, vaultContract;

async function init() {
    if(!window.ethereum) return alert("Install MetaMask");
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    
    tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
    vaultContract = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, signer);
    
    document.getElementById("connectBtn").innerText = "Connected";
    refreshBalances();
}

async function refreshBalances() {
    const addr = await signer.getAddress();
    const wBal = await tokenContract.balanceOf(addr);
    const sBal = await vaultContract.balances(addr);
    
    document.getElementById("walletBal").innerText = ethers.utils.formatEther(wBal);
    document.getElementById("stakedBal").innerText = ethers.utils.formatEther(sBal);
}

document.getElementById("connectBtn").onclick = init;

document.getElementById("approveBtn").onclick = async () => {
    const amount = document.getElementById("amountInput").value;
    if(!amount) return;
    const wei = ethers.utils.parseEther(amount);
    
    document.getElementById("status").innerText = "Approving...";
    try {
        const tx = await tokenContract.approve(VAULT_ADDRESS, wei);
        await tx.wait();
        document.getElementById("status").innerText = "Approved! Now Stake.";
        document.getElementById("stakeBtn").disabled = false;
    } catch(e) { console.error(e); }
};

document.getElementById("stakeBtn").onclick = async () => {
    const amount = document.getElementById("amountInput").value;
    const wei = ethers.utils.parseEther(amount);
    
    document.getElementById("status").innerText = "Staking...";
    try {
        const tx = await vaultContract.stake(wei);
        await tx.wait();
        document.getElementById("status").innerText = "Staked Successfully!";
        refreshBalances();
    } catch(e) { console.error(e); }
};

document.getElementById("withdrawBtn").onclick = async () => {
    const amount = document.getElementById("amountInput").value;
    const wei = ethers.utils.parseEther(amount);
    
    document.getElementById("status").innerText = "Withdrawing...";
    try {
        const tx = await vaultContract.withdraw(wei);
        await tx.wait();
        document.getElementById("status").innerText = "Withdrawn!";
        refreshBalances();
    } catch(e) { console.error(e); }
};
