# Give-A-Wonderful-Day

Give-A-Wonderful-Day is a Next.js and Ethereum application foundation for a proposed nonprofit program that plans one day of joy and respite for approved recipients.

The software is not a legal substitute for nonprofit formation, fundraising registration, tax advice, treasury controls, insurance, consent policy, or recipient-safety review. Do not state that donations are tax deductible until the organization and donation flow are legally verified.

## Implemented State

- Public routes for mission, programs, nominations, donations, transparency, contact, privacy, and terms.
- Web3 donation flow with typed EIP-1193 wallet handling, wrong-network blocking, transaction states, bytecode validation, event history, and explorer links.
- Admin route structure protected by server-side Auth.js/NextAuth role checks.
- Admin automation route disabled by default behind `ENABLE_ADMIN_AUTOMATION=false`.
- Prisma PostgreSQL schema, migration structure, seed script, and PII annotations.
- AI and email provider abstractions that create drafts/previews only.
- SSRF-resistant grant retrieval route.
- Traditional donation provider abstraction and webhook route scaffold.
- Hardened `NonprofitDonation` contract with OpenZeppelin `Ownable2Step`, `Pausable`, and `ReentrancyGuard`.
- Hardhat compile, deployment, verification, tests, and coverage.
- CI workflow for lint, format, TypeScript, unit tests, contract tests, build, Playwright, audit, and CodeQL.

## Local Setup

```bash
npm ci
cp .env.example .env.local
npm run db:generate
npm run dev
```

For database-backed workflows, set `DATABASE_URL`, then run:

```bash
npm run db:migrate
npm run db:seed
```

Set `ADMIN_DEV_EMAIL` and `ADMIN_DEV_PASSWORD` before seeding a development admin user.

## Environment

Server-only values include `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, `NEXTAUTH_URL`, `ENABLE_ADMIN_AUTOMATION`, AI/email/payment provider keys, RPC URLs, deployer private key, treasury address, webhook secrets, and Sentry DSN.

Public browser values are limited to `NEXT_PUBLIC_NONPROFIT_CONTRACT_ADDRESS`, `NEXT_PUBLIC_EXPECTED_CHAIN_ID`, `NEXT_PUBLIC_BLOCK_EXPLORER_URL`, `NEXT_PUBLIC_DONATION_EVENT_BLOCK_WINDOW`, and `NEXT_PUBLIC_MAX_DONATION_ETH`.

Never expose server secrets through `NEXT_PUBLIC_`.

## Commands

```bash
npm run lint
npm run format:check
npm run typecheck
npm run test
npm run contract:compile
npm run contract:test
npm run contract:coverage
npm run build
npm run test:e2e
npm run check
```

## Smart Contracts

`contracts/NonprofitDonation.sol` accepts ETH donations, emits transparent donation events, supports pausing, supports partial and full withdrawals, and uses two-step ownership transfer. Production owner should be a Safe multisig. Do not deploy to mainnet without explicit approval, verified treasury controls, and testnet rehearsal.

## Security Model

Admin access is enforced server-side in layouts, route handlers, and server actions. The proxy is defense-in-depth only. AI outputs are drafts. Email sending requires approval. Grant scraping blocks private networks, metadata endpoints, non-HTTP protocols, and unsafe redirects.

## Known Limitations

- Auth provider credentials and production user lifecycle are not configured.
- Traditional donation checkout is scaffolded but not connected to a verified provider account.
- Direct RPC event scanning is suitable only for a small MVP history window; use an indexer for production reporting.
- `npm audit --audit-level=high` still reports a Hardhat 2/toolbox transitive advisory path that requires a breaking Hardhat 3 migration.
- Legal, fundraising, tax, recipient privacy, and treasury operating controls require external approval before launch.

See `ARCHITECTURE.md`, `DEPLOYMENT.md`, `SECURITY.md`, `PRIVACY-DATA-HANDLING.md`, and `SMART-CONTRACT-OPERATIONS.md` for details.
