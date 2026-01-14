const connectBtn = document.getElementById("connectBtn");
const statusEl = document.getElementById("status");
const addressEl = document.getElementById("address");
const networkEl = document.getElementById("network");
const balanceEl = document.getElementById("balance");
const identityEl = document.getElementById("identity");

connectBtn.addEventListener("click", async () => {
  if (!window.ethereum) {
    alert("Core Wallet tidak terdeteksi! Pastikan Core Wallet sudah terinstall.");
    return;
  }

  try {
    //Connect wallet
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const address = accounts[0];

    statusEl.textContent = "Connected";
    addressEl.textContent = address;

    //tampilkan Nama & NIM
    identityEl.style.display = "block";

    //Ambil network
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (chainId === "0xa869") {
      networkEl.textContent = "Avalanche Fuji";
    } else {
      networkEl.textContent = "Network lain";
    }

    //Ambil balance
    const balanceWei = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });

    const balanceAvax = parseInt(balanceWei, 16) / 1e18;
    balanceEl.textContent = balanceAvax.toFixed(4);

  } catch (error) {
    console.error(error);
    statusEl.textContent = "Failed to connect";
  }
});
