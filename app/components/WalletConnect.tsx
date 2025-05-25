import { useEffect, useState } from "react";

// Add type for window.ethereum
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function WalletConnect({ onConnect }) {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0] || null);
        if (onConnect) onConnect(accounts[0] || null);
      });
    }
  }, [onConnect]);

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setError("MetaMask or Exodus not detected. Please install a wallet extension.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      setError("");
      if (onConnect) onConnect(accounts[0]);
    } catch (err) {
      setError("Wallet connection failed.");
    }
  };

  return (
    <div className="mb-4">
      {account ? (
        <div className="text-green-700">Connected: {account}</div>
      ) : (
        <button className="bg-blue-600 text-white px-6 py-2 rounded" onClick={connectWallet}>
          Connect Wallet (MetaMask/Exodus)
        </button>
      )}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
}
