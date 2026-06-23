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
- `npm audit --audit-level=high`
- `npm run db:deploy`
- `/api/health`
- `/api/health?deep=true` after `DATABASE_URL` is configured

## Required Production Secrets

Set server-only values in the hosting platform, not in the browser bundle. Required production values include `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, provider credentials, RPC URL, treasury address, payment webhook secret, and email sender settings.

## Deployment Restrictions

Do not deploy contracts to mainnet without explicit approval. Do not enable `ENABLE_ADMIN_AUTOMATION` until authentication, audit logging, cost controls, email approval workflow, and scraping allowlists are production reviewed.
