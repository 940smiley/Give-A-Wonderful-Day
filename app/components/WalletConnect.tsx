<<<<<<< HEAD
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
=======
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  formatChainId,
  getInjectedProvider,
  shortAddress,
  toHexChainId,
  type Eip1193Provider,
} from '../../lib/eip1193';
import { getErrorMessage, isUserRejectedRequest } from '../../lib/errors';

export type WalletState = {
  account: string | null;
  chainId: string | null;
  connected: boolean;
  missingWallet: boolean;
  error: string | null;
};

type WalletConnectProps = {
  expectedChainId: number;
  onWalletChange: (state: WalletState) => void;
};

function buildState(
  provider: Eip1193Provider | undefined,
  account: string | null,
  chainId: string | null,
  error: string | null,
): WalletState {
  return {
    account,
    chainId,
    connected: Boolean(account),
    missingWallet: !provider,
    error,
  };
}

export default function WalletConnect({ expectedChainId, onWalletChange }: WalletConnectProps) {
  const [state, setState] = useState<WalletState>({
    account: null,
    chainId: null,
    connected: false,
    missingWallet: false,
    error: null,
  });
  const [connecting, setConnecting] = useState(false);
  const stateRef = useRef(state);

  const updateState = useCallback(
    (next: WalletState) => {
      stateRef.current = next;
      setState(next);
      onWalletChange(next);
    },
    [onWalletChange],
  );

  useEffect(() => {
    const provider = getInjectedProvider();
    if (!provider) {
      queueMicrotask(() => updateState(buildState(undefined, null, null, null)));
      return undefined;
    }
    const activeProvider = provider;

    let mounted = true;

    async function detectAuthorizedWallet() {
      try {
        const [accounts, chainId] = await Promise.all([
          activeProvider.request<string[]>({ method: 'eth_accounts' }),
          activeProvider.request<string>({ method: 'eth_chainId' }),
        ]);

        if (!mounted) {
          return;
        }

        updateState(buildState(activeProvider, accounts[0] ?? null, chainId, null));
      } catch (error) {
        if (mounted) {
          updateState(buildState(activeProvider, null, null, getErrorMessage(error)));
        }
      }
    }

    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = Array.isArray(args[0]) ? (args[0] as string[]) : [];
      updateState(buildState(activeProvider, accounts[0] ?? null, stateRef.current.chainId, null));
    };

    const handleChainChanged = (...args: unknown[]) => {
      const chainId = typeof args[0] === 'string' ? args[0] : null;
      updateState(buildState(activeProvider, stateRef.current.account, chainId, null));
    };

    const handleConnect = (...args: unknown[]) => {
      const connection = args[0] as { chainId?: string } | undefined;
      updateState(
        buildState(
          activeProvider,
          stateRef.current.account,
          connection?.chainId ?? stateRef.current.chainId,
          null,
        ),
      );
    };

    const handleDisconnect = () => {
      updateState(buildState(activeProvider, null, null, 'Wallet disconnected.'));
    };

    activeProvider.on('accountsChanged', handleAccountsChanged);
    activeProvider.on('chainChanged', handleChainChanged);
    activeProvider.on('connect', handleConnect);
    activeProvider.on('disconnect', handleDisconnect);
    void detectAuthorizedWallet();

    return () => {
      mounted = false;
      activeProvider.removeListener('accountsChanged', handleAccountsChanged);
      activeProvider.removeListener('chainChanged', handleChainChanged);
      activeProvider.removeListener('connect', handleConnect);
      activeProvider.removeListener('disconnect', handleDisconnect);
    };
  }, [updateState]);

  async function connectWallet() {
    const provider = getInjectedProvider();
    if (!provider) {
      updateState(
        buildState(undefined, null, null, 'Install MetaMask, Exodus, or another EIP-1193 wallet.'),
      );
      return;
    }

    setConnecting(true);
    try {
      const [accounts, chainId] = await Promise.all([
        provider.request<string[]>({ method: 'eth_requestAccounts' }),
        provider.request<string>({ method: 'eth_chainId' }),
      ]);
      updateState(buildState(provider, accounts[0] ?? null, chainId, null));
    } catch (error) {
      updateState(
        buildState(
          provider,
          state.account,
          state.chainId,
          isUserRejectedRequest(error)
            ? 'Wallet connection was rejected.'
            : `Wallet connection failed: ${getErrorMessage(error)}`,
        ),
      );
    } finally {
      setConnecting(false);
    }
  }

  async function switchNetwork() {
    const provider = getInjectedProvider();
    if (!provider) {
>>>>>>> origin/codex/production-readiness-upgrade
      return;
    }

    try {
<<<<<<< HEAD
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
=======
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHexChainId(expectedChainId) }],
      });
      const chainId = await provider.request<string>({ method: 'eth_chainId' });
      updateState(buildState(provider, state.account, chainId, null));
    } catch (error) {
      updateState(
        buildState(
          provider,
          state.account,
          state.chainId,
          isUserRejectedRequest(error)
            ? 'Network switch was rejected.'
            : `Network switch failed: ${getErrorMessage(error)}`,
        ),
      );
    }
  }

  const currentChain = state.chainId ? Number.parseInt(state.chainId, 16) : null;
  const wrongNetwork = currentChain !== null && currentChain !== expectedChainId;

  return (
    <section
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      aria-live="polite"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Wallet</h2>
          <p className="text-sm text-slate-600">
            Chain {formatChainId(state.chainId)}. Expected chain {expectedChainId}.
          </p>
        </div>
        {state.account ? (
          <span
            className="rounded-md bg-emerald-50 px-3 py-2 font-mono text-sm text-emerald-800"
            title={state.account}
            aria-label={`Connected wallet ${state.account}`}
          >
            {shortAddress(state.account)}
          </span>
        ) : (
          <button
            type="button"
            onClick={connectWallet}
            disabled={connecting || state.missingWallet}
            className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}
      </div>

      {state.missingWallet && (
        <p className="mt-3 text-sm text-amber-700">
          No browser wallet was detected. Install a wallet extension to donate with crypto.
        </p>
      )}

      {wrongNetwork && (
        <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          <p>
            You are connected to chain {currentChain}. Switch to chain {expectedChainId} before
            donating.
          </p>
          <button
            type="button"
            onClick={switchNetwork}
            className="mt-2 rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-white"
          >
            Switch network
          </button>
        </div>
      )}

      {state.error && <p className="mt-3 text-sm text-red-700">{state.error}</p>}
    </section>
>>>>>>> origin/codex/production-readiness-upgrade
  );
}
