'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { getPublicEnv } from '../../../lib/env';

export default function TonProvider({ children }: { children: React.ReactNode }) {
  const env = getPublicEnv();
  const manifestUrl =
    env.NEXT_PUBLIC_TON_MANIFEST_URL ||
    (typeof window !== 'undefined'
      ? `${window.location.origin}/tonconnect-manifest.json`
      : 'http://localhost:3000/tonconnect-manifest.json');

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {children}
    </TonConnectUIProvider>
  );
}
