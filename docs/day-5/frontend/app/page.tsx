"use client";

import { useEffect, useState } from "react";
import { getBlockchainValue, setBlockchainValue } from "@/services/blockchain.service";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function HomePage() {
  const [value, setValue] = useState<string>("loading...");
  const [inputValue, setInputValue] = useState<number>(0);
  const [txHash, setTxHash] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("-");
  const [balance, setBalance] = useState<string>("-");
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

 
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask tidak terdeteksi");
        return;
      }

  
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);

      const web3Signer = await web3Provider.getSigner();
      setSigner(web3Signer);

      const address = await web3Signer.getAddress();
      setWalletAddress(address);

      // Ambil balance via provider, bukan signer
      const balanceBig = await web3Provider.getBalance(address);
      const avax = ethers.formatEther(balanceBig);
      setBalance(avax + " AVAX");

      const network = await web3Provider.getNetwork();
      
    } catch (err) {
      console.error(err);
      alert("Gagal connect wallet");
    }
  };


  const fetchValue = async () => {
    try {
      const res = await getBlockchainValue();
      setValue(res.value);
    } catch {
      setValue("failed to fetch");
    }
  };

  useEffect(() => {
    fetchValue();
  }, []);


  const handleSubmit = async () => {
    if (!signer) {
      alert("Wallet belum connect");
      return;
    }

    setLoading(true);
    try {
      const res = await setBlockchainValue(inputValue);
      setTxHash(res.txHash);
      await fetchValue();
    } catch {
      alert("Failed to set value");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#1e1e2f] to-[#2b2b45] flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-[#111827] rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-8 h-8 mr-2">
            <img src="/image/avalanche-avax-logo.png" alt="logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xl font-bold text-center text-white">Avalanche DApp</h1>
        </div>
        <div className="text-center text-sm text-white/80 mb-4">Avalanche Fuji Testnet</div>

        {/* Connect Wallet */}
        <div className="mb-4">
          <button
            onClick={connectWallet}
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600"
          >
            Connect Wallet
          </button>
        </div>

        {/* Wallet Info */}
        <div className="bg-[#1f2937] rounded-xl p-4 mb-4">
          <div className="text-sm text-white/80">Wallet Address</div>
          <div className="text-lg mt-1 text-white font-mono break-words">{walletAddress}</div>
          <div className="text-sm text-white/80 mt-2">AVAX Balance</div>
          <div className="text-lg mt-1 text-white font-mono">{balance}</div>
        </div>

        {/* Current Value Card */}
        <div className="bg-[#1f2937] rounded-xl p-4 mb-4">
          <div className="text-sm text-white/80">Current Value</div>
          <div className="text-lg mt-1 text-white font-mono">{value}</div>
          <button
            onClick={fetchValue}
            disabled={loading}
            className="mt-2 w-full bg-gray-500 text-white rounded-lg py-2 hover:bg-gray-600 disabled:bg-gray-400"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Input Card */}
        <div className="bg-[#1f2937] rounded-xl p-4 mb-4">
          <div className="text-sm text-white/80 mb-2">Set New Value</div>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            className="w-full p-2 rounded-lg mb-2 outline-none border-none text-white"
            placeholder="Enter value"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>

        {/* Tx Hash */}
        {txHash && (
          <div className="text-sm text-white/80 text-center mt-2 break-words">
            Tx Hash: <span className="font-mono">{txHash}</span>
          </div>
        )}
      </div>
    </main>
  );
}
