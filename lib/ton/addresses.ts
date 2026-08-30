import { getPublicEnv } from '../env';

export function getTonRecipientAddress(): string {
  const env = getPublicEnv();
  if (!env.NEXT_PUBLIC_TON_RECIPIENT_ADDRESS) {
    throw new Error('TON recipient address is not configured.');
  }
  return env.NEXT_PUBLIC_TON_RECIPIENT_ADDRESS;
}

export function tonExplorerUrl(hash: string): string {
  const env = getPublicEnv();
  const base = env.NEXT_PUBLIC_TON_EXPLORER_URL.replace(/\/$/, '');
  return `${base}/transaction/${hash}`;
}

export function shortTonAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
