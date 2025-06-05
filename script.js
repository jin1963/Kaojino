
let web3;
let contract;
const contractAddress = "0x8cede102e2ce12aed631f51fcec30db6d4ad93f2";
const abi = [
  {"inputs":[],"name":"claimReward","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"rewardRatePerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"calculateReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"fundRewardPool","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"rewardClaimed","type":"uint256"}],"stateMutability":"view","type":"function"}
];

async function connect() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    document.getElementById("wallet").innerText = accounts[0];
    contract = new web3.eth.Contract(abi, contractAddress);
    updateStats();
  }
}

async function stake() {
  const accounts = await web3.eth.getAccounts();
  const amount = document.getElementById("amount").value;
  await contract.methods.stake(web3.utils.toWei(amount)).send({ from: accounts[0] });
  updateStats();
}

async function claim() {
  const accounts = await web3.eth.getAccounts();
  await contract.methods.claimReward().send({ from: accounts[0] });
  updateStats();
}

async function withdraw() {
  const accounts = await web3.eth.getAccounts();
  await contract.methods.withdraw().send({ from: accounts[0] });
  updateStats();
}

async function updateStats() {
  const accounts = await web3.eth.getAccounts();
  const stakeInfo = await contract.methods.stakes(accounts[0]).call();
  document.getElementById("staked").innerText = web3.utils.fromWei(stakeInfo.amount);
  const reward = await contract.methods.calculateReward(accounts[0]).call();
  document.getElementById("earned").innerText = web3.utils.fromWei(reward) + " LYDIA";
}
