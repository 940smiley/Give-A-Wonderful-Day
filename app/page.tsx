'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { EventLog, ethers } from "ethers";
import { getContract, NONPROFIT_CONTRACT_ADDRESS } from "./contract/nonprofit";
import WalletConnect from "./components/WalletConnect";
import AutomationTestUI from "./components/AutomationTestUI";

type DonationEvent = {
  donor: string;
  amountEth: string;
  message: string;
  timestamp: string;
};

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState("0");
  const [donation, setDonation] = useState("");
  const [message, setMessage] = useState("");
  const [txStatus, setTxStatus] = useState("");
  const [history, setHistory] = useState<DonationEvent[]>([]);
  const [loadError, setLoadError] = useState("");

  const contractConfigured = useMemo(
    () => Boolean(NONPROFIT_CONTRACT_ADDRESS && ethers.isAddress(NONPROFIT_CONTRACT_ADDRESS)),
    []
  );

  const handleConnect = (acct: string | null) => setAccount(acct);

  const loadContractData = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum || !contractConfigured) {
      return;
    }

    try {
      setLoadError("");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = getContract(provider);
      const bal = await contract.getBalance();
      setBalance(ethers.formatEther(bal));

      const donationFilter = contract.filters.DonationReceived();
      const events = await contract.queryFilter(donationFilter, -20);
      const parsed: DonationEvent[] = events
        .filter((event): event is EventLog => "args" in event)
        .map((event) => {
          const donor = String(event.args?.[0] ?? "");
          const amount = event.args?.[1] as bigint | undefined;
          const msg = String(event.args?.[2] ?? "");
          const timestamp = Number(event.args?.[3] ?? 0);
          return {
            donor,
            amountEth: ethers.formatEther(amount ?? BigInt(0)),
            message: msg,
            timestamp: timestamp ? new Date(timestamp * 1000).toLocaleString() : "Unknown",
          };
        })
        .reverse();
      setHistory(parsed);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Failed to load contract data.");
    }
  }, [contractConfigured]);

  useEffect(() => {
    void loadContractData();
  }, [account, loadContractData]);

  const handleDonate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!window.ethereum || !account || !contractConfigured) {
      return;
    }

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
      await loadContractData();
    } catch {
      setTxStatus("Donation failed.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-10">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Give-A-Wonderful-Day</h1>
        <p className="mb-8">Transparent, on-chain nonprofit donations powered by Ethereum and AI.</p>

        {!contractConfigured && (
          <div className="mb-6 rounded border border-yellow-400 bg-yellow-50 p-4 text-yellow-900">
            DApp setup required: set <code>NEXT_PUBLIC_NONPROFIT_CONTRACT_ADDRESS</code> in <code>.env.local</code>.
          </div>
        )}

        <WalletConnect onConnect={handleConnect} />

        <div className="mb-4">
          Contract Address: <span className="font-mono break-all">{NONPROFIT_CONTRACT_ADDRESS || "Not configured"}</span>
        </div>
        <div className="mb-4">Contract Balance: <span className="font-mono">{balance} ETH</span></div>

        {account && contractConfigured && (
          <form onSubmit={handleDonate} className="mb-6 flex flex-col gap-2">
            <input
              type="number"
              min="0.001"
              step="0.001"
              placeholder="Amount in ETH"
              value={donation}
              onChange={(e) => setDonation(e.target.value)}
              className="border px-2 py-1 rounded"
              required
            />
            <input
              type="text"
              placeholder="Message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Donate</button>
          </form>
        )}

        {txStatus && <div className="text-blue-700 mt-2">{txStatus}</div>}
        {loadError && <div className="text-red-600 mt-2">{loadError}</div>}

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">Recent Donations</h2>
          {history.length === 0 ? (
            <p className="text-gray-600">No donations found yet.</p>
          ) : (
            <ul className="space-y-2">
              {history.map((item, idx) => (
                <li key={`${item.donor}-${idx}`} className="rounded border p-3">
                  <div><span className="font-semibold">Donor:</span> <span className="font-mono break-all">{item.donor}</span></div>
                  <div><span className="font-semibold">Amount:</span> {item.amountEth} ETH</div>
                  <div><span className="font-semibold">Message:</span> {item.message || "—"}</div>
                  <div><span className="font-semibold">Time:</span> {item.timestamp}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <AutomationTestUI />
    </main>
  );
}
