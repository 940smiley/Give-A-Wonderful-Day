export type Eip1193Request = {
  method: string;
  params?: unknown[] | Record<string, unknown>;
};

export type Eip1193Provider = {
  request<T = unknown>(request: Eip1193Request): Promise<T>;
  on(event: string, listener: (...args: unknown[]) => void): void;
  removeListener(event: string, listener: (...args: unknown[]) => void): void;
  isMetaMask?: boolean;
};

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

export function getInjectedProvider(): Eip1193Provider | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return window.ethereum;
}

export function formatChainId(chainId: string | number | null): string {
  if (chainId === null) {
    return 'Unknown';
  }

  const numeric = typeof chainId === 'string' ? Number.parseInt(chainId, 16) : chainId;
  return Number.isFinite(numeric) ? `${numeric}` : 'Unknown';
}

export function toHexChainId(chainId: number): string {
  return `0x${chainId.toString(16)}`;
}

export function shortAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
