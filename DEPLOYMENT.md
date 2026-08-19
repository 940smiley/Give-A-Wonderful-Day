# Deployment

## Recommended Production Architecture

- Next.js hosting on a managed platform.
- Managed PostgreSQL.
- Managed email provider with verified sender/domain.
- Verified payment provider account for traditional donations.
- Blockchain RPC provider.
- Safe multisig treasury.
- Error monitoring compatible with Sentry.
- Backups and restore runbook for PostgreSQL.

## Readiness Checks

- `npm ci`
- `npm run check`
- `npm run check:release`
- `npm audit --omit=dev --audit-level=high`
- `npm run db:deploy`
- `/api/health`
- `/api/health?deep=true` after `DATABASE_URL` is configured

## Public Web3 Launch Checklist

- Deploy `NonprofitDonation` to the target testnet or approved production network.
- Verify the contract on the configured block explorer.
- Transfer ownership to the approved Safe multisig and confirm `acceptOwnership`.
- Set `NEXT_PUBLIC_NONPROFIT_CONTRACT_ADDRESS`, `NEXT_PUBLIC_EXPECTED_CHAIN_ID`, `NEXT_PUBLIC_BLOCK_EXPLORER_URL`, `RPC_URL`, `EXPECTED_CHAIN_ID`, and `TREASURY_ADDRESS` in the hosting environment.
- Keep `PAYMENT_PROVIDER=mock` unless a verified traditional donation provider and real webhook verification are implemented.
- Keep `ENABLE_ADMIN_AUTOMATION=false` until admin identity, audit logging, provider allowlists, and human approval workflow are production reviewed.

## Required Production Secrets

Set server-only values in the hosting platform, not in the browser bundle. Required production values include `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, provider credentials, RPC URL, treasury address, payment webhook secret, and email sender settings.

## Deployment Restrictions

Do not deploy contracts to mainnet without explicit approval. Do not enable `ENABLE_ADMIN_AUTOMATION` until authentication, audit logging, cost controls, email approval workflow, and scraping allowlists are production reviewed.
