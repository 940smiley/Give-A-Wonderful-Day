<<<<<<< HEAD
# Give A Wonderful Day

> **A local-first mobile demo for making small kindness moments feel seen, repeatable, and responsibly measured.**

Give A Wonderful Day is a mission-led product concept for bringing encouragement, connection, care, and celebration into everyday life. The current release is a **demonstration application**: it lets a person compose a kind message, save a simulated record on their own device, and review a local impact view. The project’s roadmap deliberately evaluates whether any Web3 feature creates mission value only after the core human experience, safety model, governance, and partner usefulness are validated.

## Current Status

| Area | Current state | Important boundary |
|---|---|---|
| **Mobile experience** | A polished Expo mobile demo with Today, Create Wonder, receipt, Impact, roadmap, and preferences experiences. | Records are stored locally and labeled as simulated demo records. |
| **Public project page** | A static GitHub Pages-compatible landing page at the repository root, plus a matching Next.js project page. | The page is an overview, not a fundraising or investment offer. |
| **Charitable posture** | The existing project narrative describes a proposed nonprofit organization. | This repository does **not** establish 501(c)(3) recognition, tax-deductibility, or state solicitation eligibility. |
| **Web3 and smart contracts** | Solidity contracts remain present for research and future technical assessment. | No contract should hold funds or be represented as production-ready without an independent review, applicable policies, and a defined operating model. |

## What the Demo Does

The mobile demo supports a focused loop: choose a recipient context, write a short message, select an impact category, and record a warmth-oriented moment. The receipt is deliberately explicit that it is **not** a donation receipt, payment, NFT, or blockchain transaction. A local impact screen shows the user’s own demo records by category without collecting recipient stories or requiring an account.

| Included | Not included in the demo |
|---|---|
| Local message creation and persistence | Wallet connection or wallet credential storage |
| Simulated demo record ID | Live blockchain transaction or provenance claim |
| Local, user-facing impact count | Donation, payment processing, or funds custody |
| Roadmap and partnership posture | Token, NFT, DAO vote, or investment functionality |
| Resettable sample data | Tax receipt or claim of charitable deductibility |

## Launch and Partnership Materials

The project materials are intentionally candid about decisions that are still pending. They separate the experience that can be tested now from legal, operational, financial, and Web3 functions that need independent validation.

| Document | Purpose |
|---|---|
| [Launch Readiness Plan](docs/LAUNCH_PLAN.md) | Defines the demo boundary, organizational gates, pilot path, roadmap, and decision metrics. |
| [Funding and Strategic Partnership Brief](docs/FUNDING_AND_PARTNERSHIP_BRIEF.md) | Presents a philanthropy- and partnership-led early funding posture, monetization guardrails, and board-ready diligence questions. |
| [Entity Card](docs/entity_card.md) | Records the project’s current known status and distinguishes verified facts from planning assumptions. |

> The funding brief is **not** an offer to sell securities or a solicitation of investment. It contains no valuation, token economics, funding commitments, historical financials, or tax-deductibility representation because none were provided or verified.

## Roadmap

| Phase | Outcome | Gate |
|---|---|---|
| **Demo readiness** | Test comprehension and the primary kindness experience without financial or blockchain functionality. | A participant can complete the flow and identify the record as simulated. |
| **Design-partner pilot** | Validate participant and partner usefulness in a narrow, safeguarded setting. | Clear pilot cohort, consent process, safety response, and evaluation plan. |
| **Operational launch** | Establish repeatable programs and transparent controls. | Governance, funding, privacy, financial, and compliance requirements are independently confirmed. |
| **Web3 utility assessment** | Determine if decentralized provenance creates a unique, safer benefit. | Written user-benefit, legal, security, and governance case; otherwise keep conventional tooling. |
| **Network expansion** | Extend only after the model is repeatable and measured. | Diversified funding, partner toolkit, and ongoing impact and safety review. |

## Repository Structure

```text
.
├── app/                 # Next.js public project and launch page
├── contracts/           # Solidity research contracts — not production-deployed by this demo
├── docs/                # Launch plan, funding brief, and entity-card assumptions
├── index.html           # Static GitHub Pages-compatible project overview
└── mobile/              # Expo mobile demo source (added with this launch-preparation update)
```

## Local Development

### Public project page

```bash
npm install
npm run dev
```

The Next.js page lives in `app/page.tsx`. The root `index.html` is a dependency-free static page intended for the repository’s legacy GitHub Pages deployment.

### Mobile demo

```bash
cd mobile
pnpm install
pnpm dev
```

Run the local demo on the web, iOS, or Android target offered by Expo. The app uses local device storage for sample and created demo moments. No account, server, or wallet is required to complete the core flow.

## Testing

```bash
# Public project
npm run check

# Mobile demo
cd mobile
pnpm test
pnpm check
```

## Launch Checklist

Before moving beyond a demonstration release, assign accountable owners and independently confirm the items below. The full sequence and source links are in the [Launch Readiness Plan](docs/LAUNCH_PLAN.md).

- [ ] Establish entity, board authority, conflict-of-interest process, and financial controls.
- [ ] Confirm tax status and charitable-solicitation posture before making tax-deductibility or public fundraising claims.
- [ ] Adopt gift acceptance, privacy, data-retention, safeguarding, and incident-response policies.
- [ ] Define the first partner cohort, participant-consent process, and outcome measurement plan.
- [ ] Complete threat modeling and independent review before any smart contract, wallet, or asset-custody function is enabled.
- [ ] Publish a clear security contact and operating support route.
- [ ] Obtain board approval for the pilot budget, funding request, and any partner recognition terms.

## References

The repository’s launch documentation relies on the following primary references for its organizational and Web3 readiness statements:

1. [IRS — Application for recognition of exemption](https://www.irs.gov/charities-non-profits/application-for-recognition-of-exemption)
2. [IRS — Charitable solicitation: initial state registration](https://www.irs.gov/charities-non-profits/charitable-organizations/charitable-solicitation-initial-state-registration)
3. [SEC — Crypto assets and the federal securities laws](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/crypto-assets-federal-securities-laws)

## License

MIT License
=======
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
>>>>>>> origin/codex/production-readiness-upgrade
