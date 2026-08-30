'use client';

import { type FormEvent, useState } from 'react';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { getTonRecipientAddress, shortTonAddress, tonExplorerUrl } from '../../../lib/ton/addresses';
import { validateTonAmount } from '../../../lib/ton/validation';
import TonNetworkBadge from './TonNetworkBadge';

type TransactionState =
  | { status: 'idle' }
  | { status: 'validating' }
  | { status: 'awaiting-wallet' }
  | { status: 'pending' }
  | { status: 'confirmed'; hash?: string }
  | { status: 'failed'; message: string };

export default function TonDonationWidget() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [transaction, setTransaction] = useState<TransactionState>({ status: 'idle' });

  const canDonate =
    !!wallet &&
    transaction.status !== 'validating' &&
    transaction.status !== 'awaiting-wallet' &&
    transaction.status !== 'pending';

  async function handleDonate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (transaction.status === 'pending') {
      return;
    }

    setTransaction({ status: 'validating' });

    const validation = validateTonAmount(amount, {
      minTon: '0.1',
      maxTon: '10000',
    });

    if (!validation.valid) {
      setTransaction({ status: 'failed', message: validation.message });
      return;
    }

    if (!wallet) {
      setTransaction({ status: 'awaiting-wallet' });
      return;
    }

    let recipientAddress: string;
    try {
      recipientAddress = getTonRecipientAddress();
    } catch (err: any) {
      setTransaction({ status: 'failed', message: err.message });
      return;
    }

    setTransaction({ status: 'pending' });

    try {
      // Basic transfer with comment
      const body = {
        validUntil: Math.floor(Date.now() / 1000) + 360, // 6 minutes
        messages: [
          {
            address: recipientAddress,
            amount: validation.nanotons,
            // (Optional) add a payload for the message if needed:
            // payload: ...
          },
        ],
      };

      // Since TonConnect UI v2.0 doesn't natively parse plain text comments into cells easily without ton-core,
      // we pass the raw transfer. If you need text payloads, you'd integrate @ton/core to build the Cell.
      // For simplicity in MVP, we send the amount to the treasury.

      const result = await tonConnectUI.sendTransaction(body);
      
      const txHash = result.boc ? result.boc : undefined;
      setTransaction({ 
        status: 'confirmed', 
        hash: txHash 
      });
      setAmount('');
      setMessage('');

      // Notify Telegram
      fetch('/api/donations/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          network: 'TON',
          amount: `${amount} TON`,
          txHash: txHash || 'Unknown',
          message: message.trim()
        }),
      }).catch(console.error);
    } catch (error: any) {
      setTransaction({
        status: 'failed',
        message: error?.message || 'Transaction was rejected or failed.',
      });
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
      <div className="space-y-6">
        <section className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950 flex items-center gap-2">
              TON Wallet <TonNetworkBadge />
            </h2>
            <p className="text-sm text-slate-600">Connect to send TON</p>
          </div>
          <TonConnectButton />
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">TON Donation</h2>
          <p className="mt-2 text-sm text-slate-600">
            Donations are sent directly to the nonprofit treasury on the TON blockchain.
          </p>

          <form onSubmit={handleDonate} className="mt-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="donation-amount">
                Amount in TON
              </label>
              <input
                id="donation-amount"
                type="text"
                inputMode="decimal"
                placeholder="5"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                Minimum 0.1 TON.
              </p>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="donation-message"
              >
                Message (optional)
              </label>
              <input
                id="donation-message"
                type="text"
                maxLength={240}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                placeholder="Leave a note..."
              />
            </div>

            <button
              type="submit"
              disabled={!canDonate}
              className="w-full rounded-md bg-[#0088CC] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {transaction.status === 'validating'
                ? 'Validating...'
                : transaction.status === 'pending'
                  ? 'Waiting for wallet confirmation...'
                  : 'Donate with TON'}
            </button>
          </form>

          {transaction.status === 'awaiting-wallet' && (
            <p className="mt-3 text-sm text-amber-700">Connect a wallet before donating.</p>
          )}
          {transaction.status === 'failed' && (
            <p role="alert" className="mt-3 text-sm text-red-700">
              {transaction.message}
            </p>
          )}
          {transaction.status === 'confirmed' && (
            <div className="mt-3 text-sm text-emerald-700">
              <p>Donation confirmed. Thank you.</p>
              {/* Note: the boc returned isn't always the transaction hash on tonviewer, 
                  but we can provide a link or just a success message */}
            </div>
          )}
        </section>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">About TON</h2>
        <p className="mt-2 text-sm text-slate-600">
          The Open Network (TON) is a fast, secure and scalable blockchain and network project,
          capable of handling millions of transactions per second, and natively integrated into Telegram.
        </p>
        <p className="mt-4 text-sm text-slate-600">
          Make sure your wallet is configured for the correct network before sending.
        </p>
      </section>
    </div>
  );
}
