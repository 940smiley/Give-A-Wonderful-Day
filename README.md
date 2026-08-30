# Give A Wonderful Day

Give A Wonderful Day takes donations and distributes funds to people who need a wonderful day: terminally ill patients, families facing life-limiting circumstances, and children facing severe medical conditions who deserve a memory worth keeping. The flagship program is the Wonderful Birthday Project — personalized celebration experiences delivered through verified funding flows.

This is a crypto-native application: donations flow through `NonprofitDonation.sol`, a hardened smart contract (`Ownable2Step`, `Pausable`, `ReentrancyGuard`) with transparent event emission, explorer links, and direct ETH flows. Funds are withdrawn through a Safe multisig treasury to approved recipient programs. Aggregate impact is public; recipient identity stays private.

> **Not an investment offer. Not a token raise. Not a claim that donations are tax-deductible unless independently verified.** No speculative asset layer sits between donation and recipient.

---

## What Exists Now

- **Live Web3 donation flow** — wallet connection, wrong-network blocking, transaction states, bytecode validation, event history, explorer links.
- **Smart contract deployed and verifiable** — `NonprofitDonation.sol` accepts ETH, emits events, supports pausing, partial/full withdrawals, and two-step ownership transfer.
- **Program delivery** — Wonderful Birthday Project (Wonderful / Extraordinary / Dream tiers), application/review flow, experience planning, privacy-protected delivery.
- **Public routes** — mission, programs, nominations, donations, transparency, contact, privacy, terms.
- **Admin protections** — server-side Auth/NextAuth role checks, automation disabled by default (`ENABLE_ADMIN_AUTOMATION=false`).
- **Data architecture** — Prisma PostgreSQL with PII annotations, public/private separation, no sensitive beneficiary data on-chain.

---

## Local Setup

```bash
npm ci
cp .env.example .env.local
npm run db:generate
npm run dev
```

For database-backed workflows:

```bash
npm run db:migrate
npm run db:seed
```

Set `ADMIN_DEV_EMAIL` and `ADMIN_DEV_PASSWORD` before seeding.

---

## Smart Contract

```solidity
// contracts/NonprofitDonation.sol
```

- Accepts ETH donations.
- Emits transparent donation events.
- Pausable; partial and full withdrawals supported.
- Two-step ownership transfer to Safe multisig.
- Never deploy to mainnet without audit, multisig confirmation, and testnet rehearsal.

---

## Security Model

- Server-side role enforcement on all admin routes and privileged APIs.
- AI outputs remain drafts; email requires approval before send.
- SSRF-resistant grant retrieval; safe redirects blocked.
- No recipient PII on public blockchain; aggregate statistics only.

---

## Brand and Mission

Simple: donations in, wonderful days out. The blockchain is there to make the funding flow visible, not to make the mission complicated. Every donation produces a verifiable record. Every recipient receives direct program delivery. That is the brand.

---

## References

See `ARCHITECTURE.md`, `DEPLOYMENT.md`, `SECURITY.md`, `PRIVACY-DATA-HANDLING.md`, `SMART-CONTRACT-OPERATIONS.md`, and `docs/` for operational details.
