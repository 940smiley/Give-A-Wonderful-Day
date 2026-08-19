'use client';

import { type FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import WalletConnect, { type WalletState } from '../WalletConnect';
import { getContract, assertContractAddress } from '../../contract/nonprofit';
import { getPublicEnv } from '../../../lib/env';
import { getInjectedProvider, shortAddress } from '../../../lib/eip1193';
import { getErrorMessage, isUserRejectedRequest } from '../../../lib/errors';
import { validateDonationAmount } from '../../../lib/validation/donations';
import {
  DirectRpcDonationHistoryAdapter,
  type DonationEventRecord,
} from '../../../lib/blockchain/donation-history';
import { transactionExplorerUrl } from '../../../lib/blockchain/explorer';

type TransactionState =
  | { status: 'idle' }
  | { status: 'validating' }
  | { status: 'awaiting-wallet' }
  | { status: 'pending'; hash: string }
  | { status: 'confirmed'; hash: string }
  | { status: 'failed'; message: string };

const publicEnv = getPublicEnv();

type DonationContract = ethers.Contract & {
  getBalance(): Promise<bigint>;
  donate(message: string, overrides: { value: bigint }): Promise<ethers.TransactionResponse>;
};

export default function DonationWidget() {
  const [wallet, setWallet] = useState<WalletState>({
    account: null,
    chainId: null,
    connected: false,
    missingWallet: false,
    error: null,
  });
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState<string | null>(null);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<TransactionState>({ status: 'idle' });
  const [history, setHistory] = useState<DonationEventRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [blockWindow, setBlockWindow] = useState(publicEnv.NEXT_PUBLIC_DONATION_EVENT_BLOCK_WINDOW);

  const currentChain = wallet.chainId ? Number.parseInt(wallet.chainId, 16) : null;
  const wrongNetwork =
    currentChain !== null && currentChain !== publicEnv.NEXT_PUBLIC_EXPECTED_CHAIN_ID;
  const canDonate =
    wallet.connected &&
    !wrongNetwork &&
    transaction.status !== 'validating' &&
    transaction.status !== 'awaiting-wallet' &&
    transaction.status !== 'pending';

  const explorerBase = publicEnv.NEXT_PUBLIC_BLOCK_EXPLORER_URL;

  const loadContractBalance = useCallback(async () => {
    const injected = getInjectedProvider();
    if (!injected || !publicEnv.NEXT_PUBLIC_NONPROFIT_CONTRACT_ADDRESS) {
      setBalance(null);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(injected);
      const contract = getContract(provider) as DonationContract;
      const value = await contract.getBalance();
      setBalance(ethers.formatEther(value));
      setBalanceError(null);
    } catch (error) {
      setBalanceError(getErrorMessage(error));
    }
  }, []);

  const loadHistory = useCallback(async () => {
    const injected = getInjectedProvider();
    if (!injected || !publicEnv.NEXT_PUBLIC_NONPROFIT_CONTRACT_ADDRESS) {
      setHistory([]);
      return;
    }

    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const provider = new ethers.BrowserProvider(injected);
      const adapter = new DirectRpcDonationHistoryAdapter(provider);
      setHistory(await adapter.loadRecentDonations({ blockWindow }));
    } catch (error) {
      setHistoryError(getErrorMessage(error));
    } finally {
      setHistoryLoading(false);
    }
  }, [blockWindow]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadContractBalance();
      void loadHistory();
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [loadContractBalance, loadHistory, wallet.account, wallet.chainId]);

  async function handleDonate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (transaction.status === 'pending') {
      return;
    }

    setTransaction({ status: 'validating' });

    const validation = validateDonationAmount(amount, {
      minEth: '0.001',
      maxEth: publicEnv.NEXT_PUBLIC_MAX_DONATION_ETH,
    });
    if (!validation.valid) {
      setTransaction({ status: 'failed', message: validation.message });
      return;
    }

    if (wrongNetwork) {
      setTransaction({
        status: 'failed',
        message: `Switch to chain ${publicEnv.NEXT_PUBLIC_EXPECTED_CHAIN_ID} before donating.`,
      });
      return;
    }

    const injected = getInjectedProvider();
    if (!injected || !wallet.account) {
      setTransaction({ status: 'awaiting-wallet' });
      return;
    }

    try {
      const address = assertContractAddress();
      const provider = new ethers.BrowserProvider(injected);
      const bytecode = await provider.getCode(address);
      if (bytecode === '0x') {
        setTransaction({
          status: 'failed',
          message: 'No deployed contract bytecode was found at the configured address.',
        });
        return;
      }

      const signer = await provider.getSigner();
      const contract = getContract(signer) as DonationContract;
      const tx = await contract.donate(message.trim(), { value: validation.wei });
      setTransaction({ status: 'pending', hash: tx.hash as string });
      const receipt = await tx.wait(1);

      if (!receipt || receipt.status !== 1) {
        setTransaction({
          status: 'failed',
          message: 'The transaction was not confirmed successfully.',
        });
        return;
      }

      setTransaction({ status: 'confirmed', hash: tx.hash as string });
      setAmount('');
      setMessage('');
      await Promise.all([loadContractBalance(), loadHistory()]);
    } catch (error) {
      setTransaction({
        status: 'failed',
        message: isUserRejectedRequest(error)
          ? 'Donation was cancelled in the wallet.'
          : `Donation failed: ${getErrorMessage(error)}`,
      });
    }
  }

  const transactionHash = useMemo(() => {
    if (transaction.status === 'pending' || transaction.status === 'confirmed') {
      return transaction.hash;
    }

    return null;
  }, [transaction]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
      <div className="space-y-6">
        <WalletConnect
          expectedChainId={publicEnv.NEXT_PUBLIC_EXPECTED_CHAIN_ID}
          onWalletChange={setWallet}
        />

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Crypto donation</h2>
          <p className="mt-2 text-sm text-slate-600">
            Donations are recorded on-chain. Direct RPC history is limited to a recent MVP window
            and should be replaced by an indexed database for production reporting.
          </p>

          <div className="mt-4 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
            Contract balance:{' '}
            <span className="font-mono">{balance ? `${balance} ETH` : 'Not available'}</span>
            {balanceError && <p className="mt-1 text-red-700">{balanceError}</p>}
          </div>

          <form onSubmit={handleDonate} className="mt-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="donation-amount">
                Amount in ETH
              </label>
              <input
                id="donation-amount"
                type="text"
                inputMode="decimal"
                placeholder="0.05"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                aria-describedby="donation-amount-help"
                required
              />
              <p id="donation-amount-help" className="mt-1 text-xs text-slate-500">
                Minimum 0.001 ETH. Maximum {publicEnv.NEXT_PUBLIC_MAX_DONATION_ETH} ETH.
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
              />
            </div>

            <button
              type="submit"
              disabled={!canDonate}
              className="w-full rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {transaction.status === 'validating'
                ? 'Validating...'
                : transaction.status === 'pending'
                  ? 'Waiting for confirmation...'
                  : 'Donate with wallet'}
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
            <p className="mt-3 text-sm text-emerald-700">Donation confirmed. Thank you.</p>
          )}
          {transactionHash && (
            <a
              href={transactionExplorerUrl(explorerBase, transactionHash)}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-medium text-emerald-800 underline"
            >
              View transaction {transactionHash.slice(0, 10)}...
            </a>
          )}
        </section>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Recent on-chain donations</h2>
            <p className="mt-1 text-sm text-slate-600">Sorted by newest event first.</p>
          </div>
          <button
            type="button"
            onClick={() => void loadHistory()}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
          >
            Retry
          </button>
        </div>

        {historyLoading && (
          <p className="mt-4 text-sm text-slate-600">Loading donation history...</p>
        )}
        {historyError && <p className="mt-4 text-sm text-red-700">{historyError}</p>}
        {!historyLoading && !historyError && history.length === 0 && (
          <p className="mt-4 rounded-md bg-slate-50 p-3 text-sm text-slate-600">
            No donation events were found in the current block window.
          </p>
        )}
        <ul className="mt-4 space-y-3">
          {history.map((event) => (
            <li key={event.key} className="rounded-md border border-slate-200 p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm text-slate-900">{event.amountEth} ETH</span>
                <a
                  href={transactionExplorerUrl(explorerBase, event.transactionHash)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-emerald-800 underline"
                >
                  Explorer
                </a>
              </div>
              <p className="mt-1 text-xs text-slate-600" title={event.donor}>
                Donor {shortAddress(event.donor)}
              </p>
              {event.message && <p className="mt-2 text-sm text-slate-700">{event.message}</p>}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setBlockWindow((current) => Math.min(current + 5_000, 100_000))}
          className="mt-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
        >
          Load more blocks
        </button>
      </section>
    </div>
  );
}
