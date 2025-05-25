import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContract } from "./contract/nonprofit";
import WalletConnect from "./components/WalletConnect";
import AutomationTestUI from "./components/AutomationTestUI";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [donation, setDonation] = useState("");
  const [message, setMessage] = useState("");
  const [txStatus, setTxStatus] = useState("");

  const handleConnect = (acct) => setAccount(acct);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      getContract(provider).getBalance().then((bal) => {
        setBalance(ethers.formatEther(bal));
      });
    }
  }, [account]);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!window.ethereum || !account) return;
    setTxStatus("");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const tx = await contract.donate(message, { value: ethers.parseEther(donation) });
      setTxStatus("Transaction sent. Waiting for confirmation...");
      await tx.wait();
      setTxStatus("Thank you for your donation!");
      setDonation("");
      setMessage("");
      // Refresh balance
      const bal = await contract.getBalance();
      setBalance(ethers.formatEther(bal));
    } catch (err) {
      setTxStatus("Donation failed.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold mb-4">Give-A-Wonderful-Day</h1>
        <p className="mb-8">Transparent, on-chain nonprofit donations powered by Ethereum and AI.</p>
        <WalletConnect onConnect={handleConnect} />
        <div className="mb-4">Contract Balance: <span className="font-mono">{balance} ETH</span></div>
        {account && (
          <form onSubmit={handleDonate} className="mb-4 flex flex-col gap-2">
            <input
              type="number"
              min="0.001"
              step="0.001"
              placeholder="Amount in ETH"
              value={donation}
              onChange={e => setDonation(e.target.value)}
              className="border px-2 py-1 rounded"
              required
            />
            <input
              type="text"
              placeholder="Message (optional)"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Donate</button>
          </form>
        )}
        {txStatus && <div className="text-blue-700 mt-2">{txStatus}</div>}
      </div>
      <AutomationTestUI />
    </main>
  );
}
