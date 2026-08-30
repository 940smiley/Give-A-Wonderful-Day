'use client';

import { getPublicEnv } from '../../../lib/env';

export default function TonNetworkBadge() {
  const env = getPublicEnv();
  const isTestnet = env.NEXT_PUBLIC_TON_NETWORK === 'testnet';
  
  return (
    <span
      className={`rounded-md px-2 py-1 text-xs font-semibold ${
        isTestnet ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
      }`}
    >
      TON {isTestnet ? 'Testnet' : 'Mainnet'}
    </span>
  );
}
