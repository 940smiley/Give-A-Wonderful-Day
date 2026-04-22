import { useEffect, useState } from "react";

type ConnectHandler = (account: string | null) => void;

type WalletConnectProps = {
  onConnect?: ConnectHandler;
};

type EthereumProvider = {
  request: (args: { method: string }) => Promise<string[]>;
  on: (event: "accountsChanged", listener: (accounts: string[]) => void) => void;
  removeListener: (event: "accountsChanged", listener: (accounts: string[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) {
      return;
    }

    const handleAccountsChanged = (accounts: string[]) => {
      const nextAccount = accounts[0] || null;
      setAccount(nextAccount);
      onConnect?.(nextAccount);
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [onConnect]);

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setError("MetaMask or Exodus not detected. Please install a wallet extension.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const nextAccount = accounts[0] || null;
      setAccount(nextAccount);
      setError("");
      onConnect?.(nextAccount);
    } catch {
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
