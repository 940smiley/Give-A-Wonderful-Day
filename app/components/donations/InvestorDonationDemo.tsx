'use client';

import { useState } from 'react';

type PaymentMode = 'traditional' | 'crypto';

type DonationReceipt = {
  receiptId: string;
  donorName: string;
  email: string;
  amountUsd: number;
  amountEth?: string;
  paymentMethod: string;
  timestamp: string;
  impactSummary: string;
  taxDeductibleEstimate: string;
};

export default function InvestorDonationDemo() {
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('traditional');
  const [donationAmountUsd, setDonationAmountUsd] = useState<number>(250);
  const [recurringFrequency, setRecurringFrequency] = useState<'one-time' | 'monthly' | 'quarterly'>('one-time');

  // Traditional Form fields
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState<DonationReceipt | null>(null);

  // Crypto Form fields
  const [ethAmount, setEthAmount] = useState('0.1');
  const [simulatedWalletConnected, setSimulatedWalletConnected] = useState(false);
  const [cryptoTxHash, setCryptoTxHash] = useState<string | null>(null);

  // Calculated impact values based on donationAmountUsd
  const familiesHelped = Math.floor(donationAmountUsd / 250) || 1;
  const careBoxes = Math.floor(donationAmountUsd / 25);
  const communityGrants = Math.floor(donationAmountUsd / 1000);
  const ethEquivalent = (donationAmountUsd / 2500).toFixed(3);

  function handleTraditionalSubmit(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      const generatedReceipt: DonationReceipt = {
        receiptId: `GAWD-REC-${Math.floor(10000 + Math.random() * 90000)}`,
        donorName: donorName || 'Anonymous Supporter',
        email: donorEmail || 'donor@example.com',
        amountUsd: donationAmountUsd,
        paymentMethod: `Credit Card (Visa ending 4242) · ${recurringFrequency}`,
        timestamp: new Date().toLocaleString(),
        impactSummary: `${familiesHelped} emergency family grants + ${careBoxes} community care boxes`,
        taxDeductibleEstimate: `$${donationAmountUsd.toFixed(2)} (Estimated 100% Tax Deductible)`,
      };
      setReceipt(generatedReceipt);
      setProcessing(false);
    }, 800);
  }

  function handleCryptoSubmit(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      const hash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      setCryptoTxHash(hash);
      const generatedReceipt: DonationReceipt = {
        receiptId: `GAWD-ONCHAIN-${Math.floor(1000 + Math.random() * 9000)}`,
        donorName: '0x71C...89A2 (Connected Wallet)',
        email: 'On-Chain Recorded',
        amountUsd: Number(ethAmount) * 2500,
        amountEth: `${ethAmount} ETH`,
        paymentMethod: 'Web3 Sepolia Smart Contract',
        timestamp: new Date().toLocaleString(),
        impactSummary: `Recorded on-chain via NonprofitDonation contract`,
        taxDeductibleEstimate: `On-chain donor record generated`,
      };
      setReceipt(generatedReceipt);
      setProcessing(false);
    }, 1000);
  }

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
              Investor & Donor Portal
            </span>
            <h2 className="text-2xl font-black mt-2">Fund Direct Community Impact & Scalable Care</h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Simulate direct giving, evaluate transparent capital allocation metrics, and test traditional vs. Web3 crypto donation workflows.
            </p>
          </div>
          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-right min-w-[200px]">
            <p className="text-xs text-slate-400">Total Capital Raised (Demo)</p>
            <p className="text-2xl font-black text-amber-400">$184,500 USD</p>
            <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">85% Direct Program Ratio</p>
          </div>
        </div>
      </div>

      {/* Interactive Impact Calculator */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">1. Impact & Investment Calculator</h3>
            <p className="text-xs text-slate-600">Adjust your contribution to see real-world quantifiable outcomes.</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-emerald-800">${donationAmountUsd.toLocaleString()}</span>
            <span className="text-xs font-mono text-slate-500 block">≈ {ethEquivalent} ETH</span>
          </div>
        </div>

        {/* Amount Slider */}
        <div className="space-y-4">
          <input
            type="range"
            min={25}
            max={5000}
            step={25}
            value={donationAmountUsd}
            onChange={(e) => setDonationAmountUsd(Number(e.target.value))}
            className="w-full accent-emerald-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
          />

          <div className="flex gap-2 flex-wrap">
            {[50, 100, 250, 500, 1000, 2500].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setDonationAmountUsd(preset)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                  donationAmountUsd === preset
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ${preset}
              </button>
            ))}
          </div>

          {/* Impact Outcomes Grid */}
          <div className="grid gap-4 sm:grid-cols-3 mt-6 pt-4 border-t border-slate-100">
            <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200">
              <span className="text-2xl">🏠</span>
              <p className="text-2xl font-black text-emerald-900 mt-1">{familiesHelped}</p>
              <p className="text-xs font-bold text-emerald-800">Emergency Family Grants</p>
              <p className="text-[11px] text-slate-600 mt-1">Prevents eviction or utility shutoffs for families in crisis.</p>
            </div>
            <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
              <span className="text-2xl">📦</span>
              <p className="text-2xl font-black text-amber-900 mt-1">{careBoxes}</p>
              <p className="text-xs font-bold text-amber-800">Warmth & Care Packages</p>
              <p className="text-[11px] text-slate-600 mt-1">Delivers food vouchers, hygiene care, and community warmth.</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
              <span className="text-2xl">🌱</span>
              <p className="text-2xl font-black text-blue-900 mt-1">{communityGrants}</p>
              <p className="text-xs font-bold text-blue-800">Nonprofit Partner Co-Grants</p>
              <p className="text-[11px] text-slate-600 mt-1">Funds joint programs with local grassroot partner organizations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Simulator Section */}
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Main Payment Forms */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Mode Switcher */}
          <div className="flex border-b border-slate-200 pb-4 mb-6 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMode('traditional')}
              className={`pb-2 text-sm font-bold transition border-b-2 ${
                paymentMode === 'traditional'
                  ? 'border-emerald-700 text-emerald-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              💳 Traditional Giving (Card / ACH)
            </button>
            <button
              type="button"
              onClick={() => setPaymentMode('crypto')}
              className={`pb-2 text-sm font-bold transition border-b-2 ${
                paymentMode === 'crypto'
                  ? 'border-emerald-700 text-emerald-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              ⛓ Web3 Crypto Donation
            </button>
          </div>

          {/* Traditional Form */}
          {paymentMode === 'traditional' && (
            <form onSubmit={handleTraditionalSubmit} className="space-y-5">
              <div className="flex gap-3 mb-2">
                {(['one-time', 'monthly', 'quarterly'] as const).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setRecurringFrequency(freq)}
                    className={`px-3 py-1.5 text-xs font-bold capitalize rounded-md border ${
                      recurringFrequency === freq
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-300'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700" htmlFor="donorName">
                    Donor / Organization Name *
                  </label>
                  <input
                    id="donorName"
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700" htmlFor="donorEmail">
                    Email for Tax Receipt *
                  </label>
                  <input
                    id="donorEmail"
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-4 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Simulated Payment Details</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="rounded border border-slate-300 px-3 py-1.5 text-xs font-mono bg-white"
                  />
                  <input
                    type="text"
                    value="MM/YY  123"
                    disabled
                    className="rounded border border-slate-300 px-3 py-1.5 text-xs font-mono bg-slate-100 text-slate-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full rounded-md bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800 transition disabled:opacity-60"
              >
                {processing ? 'Processing Contribution...' : `Complete $${donationAmountUsd} Contribution →`}
              </button>
            </form>
          )}

          {/* Crypto Form */}
          {paymentMode === 'crypto' && (
            <form onSubmit={handleCryptoSubmit} className="space-y-5">
              <div className="rounded-lg bg-amber-50 p-4 border border-amber-200 text-xs text-amber-900 space-y-2">
                <p className="font-bold">⛓ Web3 Smart Contract Testnet Integration</p>
                <p>Contract address: <code className="font-mono bg-amber-100 px-1.5 py-0.5 rounded">0x3f5...C19D</code></p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
                <span className="text-xs font-bold text-slate-700">Web3 Wallet Status:</span>
                <button
                  type="button"
                  onClick={() => setSimulatedWalletConnected(!simulatedWalletConnected)}
                  className={`px-3 py-1 text-xs font-bold rounded ${
                    simulatedWalletConnected
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {simulatedWalletConnected ? '✓ Wallet Connected (Sepolia)' : 'Connect Demo Wallet'}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700" htmlFor="ethAmount">
                  Amount in ETH
                </label>
                <input
                  id="ethAmount"
                  type="text"
                  value={ethAmount}
                  onChange={(e) => setEthAmount(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono"
                />
                <p className="text-xs text-slate-500 mt-1">≈ ${(Number(ethAmount) * 2500).toLocaleString()} USD equivalent</p>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full rounded-md bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 transition disabled:opacity-60"
              >
                {processing ? 'Broadcasting Transaction...' : 'Execute On-Chain Donation →'}
              </button>
            </form>
          )}

          {/* Receipt View */}
          {receipt && (
            <div className="mt-8 rounded-xl border-2 border-emerald-600 bg-emerald-50/50 p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-emerald-200 pb-3">
                <h4 className="font-bold text-emerald-950 text-lg">Contribution Receipt Generated</h4>
                <span className="font-mono text-xs bg-emerald-200 text-emerald-900 px-2 py-1 rounded font-bold">
                  {receipt.receiptId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-500">Contributor</p>
                  <p className="font-bold text-slate-900">{receipt.donorName}</p>
                </div>
                <div>
                  <p className="text-slate-500">Amount</p>
                  <p className="font-bold text-emerald-800">${receipt.amountUsd} USD {receipt.amountEth && `(${receipt.amountEth})`}</p>
                </div>
                <div>
                  <p className="text-slate-500">Method</p>
                  <p className="font-semibold text-slate-900">{receipt.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-slate-500">Date & Time</p>
                  <p className="font-semibold text-slate-900">{receipt.timestamp}</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded border border-emerald-200 text-xs">
                <p className="text-slate-500">Direct Impact Recorded:</p>
                <p className="font-bold text-emerald-900 mt-0.5">{receipt.impactSummary}</p>
              </div>

              {cryptoTxHash && (
                <div className="text-[11px] font-mono text-slate-600 break-all">
                  Tx Hash: <span className="text-emerald-800 font-bold">{cryptoTxHash}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar: Capital Allocation & Governance */}
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">📊 Capital Deployment</h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Direct Assistance Grants</span>
                  <span className="text-emerald-800">85%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Program Operations & Delivery</span>
                  <span className="text-blue-800">10%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Safeguards, Audits & Tech</span>
                  <span className="text-amber-800">5%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-600 h-2 rounded-full" style={{ width: '5%' }} />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <a
                href="/docs/FUNDING_AND_PARTNERSHIP_BRIEF.md"
                className="block text-center font-bold text-emerald-800 hover:underline bg-emerald-50 p-2.5 rounded border border-emerald-200"
              >
                📄 Read Strategic Partnership Brief →
              </a>
              <a
                href="/transparency"
                className="block text-center font-bold text-slate-700 hover:underline bg-slate-50 p-2.5 rounded border border-slate-200"
              >
                🔍 View Public Audit Logs →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
