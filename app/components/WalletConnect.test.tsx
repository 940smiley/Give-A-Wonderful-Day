import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import WalletConnect from './WalletConnect';
import type { Eip1193Provider } from '../../lib/eip1193';

function installProvider(provider?: Partial<Eip1193Provider>) {
  Object.defineProperty(window, 'ethereum', {
    value: provider,
    configurable: true,
  });
}

describe('WalletConnect', () => {
  it('shows wallet unavailable state', async () => {
    installProvider(undefined);
    render(<WalletConnect expectedChainId={11155111} onWalletChange={() => undefined} />);

    expect(await screen.findByText(/No browser wallet was detected/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /connect wallet/i })).toBeDisabled();
  });

  it('detects an already authorized wallet', async () => {
    const onWalletChange = vi.fn();
    installProvider({
      request: vi.fn(async ({ method }) => {
        if (method === 'eth_accounts') {
          return ['0x0000000000000000000000000000000000000001'];
        }
        if (method === 'eth_chainId') {
          return '0xaa36a7';
        }
        return null;
      }) as Eip1193Provider['request'],
      on: vi.fn(),
      removeListener: vi.fn(),
    });

    render(<WalletConnect expectedChainId={11155111} onWalletChange={onWalletChange} />);

    await waitFor(() => {
      expect(screen.getByText('0x0000...0001')).toBeInTheDocument();
    });
    expect(onWalletChange).toHaveBeenCalledWith(
      expect.objectContaining({ account: '0x0000000000000000000000000000000000000001' }),
    );
  });

  it('handles rejected connection requests separately', async () => {
    installProvider({
      request: vi.fn(async ({ method }) => {
        if (method === 'eth_accounts') {
          return [];
        }
        if (method === 'eth_chainId') {
          return '0x1';
        }
        throw { code: 4001 };
      }) as Eip1193Provider['request'],
      on: vi.fn(),
      removeListener: vi.fn(),
    });

    render(<WalletConnect expectedChainId={11155111} onWalletChange={() => undefined} />);
    await userEvent.click(screen.getByRole('button', { name: /connect wallet/i }));
    expect(await screen.findByText(/rejected/i)).toBeInTheDocument();
  });
});
