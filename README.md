# Give A Wonderful Day

> **A technology platform for providing meaningful moments of joy to people facing extraordinary circumstances.**

Give A Wonderful Day (G.A.W.D.) is a mission-led nonprofit technology platform that connects people facing challenges with direct support, empowers donors with transparent giving, and collaborates with local non-profit partners to amplify community care. The Wonderful Birthday Project is our flagship program.

## Mission

G.A.W.D. provides meaningful moments of joy to people facing extraordinary circumstances — while maintaining strict privacy protections for beneficiaries and transparent accountability for donors and partners.

## Programs

### Wonderful Birthday Project

Our flagship program providing extraordinary birthday experiences for children facing severe, life-limiting, or terminal medical circumstances.

- **Two application tracks:** Priority/Emergency (rolling review) and Standard Opportunity (periodic selection)
- **Three experience tiers:** Wonderful Birthday, Extraordinary Birthday, Dream Birthday
- **Configurable components:** Celebration, family experience, travel, lodging, transportation, meals, entertainment, gifts, photography, memory preservation, accessibility accommodations, and family support
- **Privacy-first design:** No sensitive beneficiary information is stored on public blockchain. PII remains in protected systems accessible only to authorized staff.

[Learn more →](/programs/wonderful-birthday) | [Apply now →](/programs/wonderful-birthday/apply)

### Additional Programs

- **Wonderful Day** — General wonderful day experiences for individuals facing extraordinary circumstances
- **Nonprofit Partner Network** — Cross-agency collaboration for registered 501(c)(3) organizations
- **Assistance Portal** — Micro-grants, emergency housing aid, and care packages

## Implemented State

- Public routes for mission, programs, birthday applications, nominations, donations, transparency, contact, privacy, and terms
- **Wonderful Birthday Project** — Full application flow with privacy-preserving data model, experience tier configuration, and admin review
- Web3 donation flow with typed EIP-1193 wallet handling, wrong-network blocking, transaction states, bytecode validation, event history, and explorer links
- Admin route structure protected by server-side Auth.js/NextAuth role checks
- Prisma PostgreSQL schema with PII annotations and birthday program models
- AI and email provider abstractions that create drafts/previews only
- SSRF-resistant grant retrieval route
- Hardened `NonprofitDonation` contract with OpenZeppelin `Ownable2Step`, `Pausable`, and `ReentrancyGuard`
- Mobile Expo demo with local-kindness-creation experience
- CI workflow for lint, format, TypeScript, unit tests, contract tests, build, Playwright, audit, and CodeQL

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

### Mobile Demo

```bash
cd mobile
pnpm install
pnpm dev
```

## Commands

```bash
npm run lint              # Lint TypeScript/JavaScript
npm run format:check      # Check formatting
npm run typecheck         # Type check
npm run test              # Unit tests (Vitest)
npm run contract:compile  # Compile Solidity
npm run contract:test     # Contract tests (Hardhat)
npm run contract:coverage # Contract coverage
npm run build             # Production build
npm run test:e2e          # E2E tests (Playwright)
npm run check             # Full verification pipeline
```

## Architecture

| Layer      | Technology                                                |
| ---------- | --------------------------------------------------------- |
| Framework  | Next.js (App Router), React 19                            |
| UI         | Tailwind CSS, server/client components                    |
| Database   | PostgreSQL via Prisma ORM                                 |
| Auth       | NextAuth.js (Auth.js) with Prisma adapter                 |
| Blockchain | ethers.js, Solidity 0.8.24, Hardhat                       |
| Mobile     | Expo SDK 54, React Native, NativeWind                     |
| Testing    | Vitest (unit), Playwright (e2e), Hardhat/Chai (contracts) |

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed architecture documentation.

## Privacy & Child Safety

Children are involved, and their safety is our highest priority.

- **No sensitive information on-chain:** Medical records, diagnosis details, dates of birth, addresses, and identifying information are never stored on public blockchain
- **Strict PII separation:** Public impact data and private beneficiary data are architecturally separated
- **Consent-gated publication:** No recipient stories, images, or outcomes are published without explicit consent and staff approval
- **Audit trail:** All staff actions are logged with actor attribution

See [PRIVACY-DATA-HANDLING.md](PRIVACY-DATA-HANDLING.md) for details.

## Smart Contracts

`contracts/NonprofitDonation.sol` accepts ETH donations, emits transparent donation events, supports pausing, supports partial and full withdrawals, and uses two-step ownership transfer. Production owner should be a Safe multisig. Do not deploy to mainnet without explicit approval.

See [SMART-CONTRACT-OPERATIONS.md](SMART-CONTRACT-OPERATIONS.md) for deployment and operations.

## Security

Admin access is enforced server-side in layouts, route handlers, and server actions. AI outputs are drafts. Email sending requires approval. Grant scraping blocks private networks, metadata endpoints, non-HTTP protocols, and unsafe redirects.

See [SECURITY.md](SECURITY.md) for the full security model and reporting process.

## Documentation

| Document                                                  | Purpose                                               |
| --------------------------------------------------------- | ----------------------------------------------------- |
| [Architecture](ARCHITECTURE.md)                           | Technical architecture and workflow boundaries        |
| [Deployment](DEPLOYMENT.md)                               | Production deployment guide and readiness checks      |
| [Security](SECURITY.md)                                   | Security model, controls, and vulnerability reporting |
| [Privacy & Data Handling](PRIVACY-DATA-HANDLING.md)       | Privacy policies and data minimization                |
| [Smart Contract Operations](SMART-CONTRACT-OPERATIONS.md) | Contract deployment and treasury management           |
| [Contributing](CONTRIBUTING.md)                           | Development standards and contribution guidelines     |
| [Launch Plan](docs/LAUNCH_PLAN.md)                        | Launch readiness plan and organizational gates        |
| [Funding Brief](docs/FUNDING_AND_PARTNERSHIP_BRIEF.md)    | Funding posture and partner diligence questions       |
| [Entity Card](docs/entity_card.md)                        | Project status and verified vs. planning assumptions  |

## Known Limitations

- Auth provider credentials and production user lifecycle are not configured
- Traditional donation checkout is scaffolded but not connected to a verified provider account
- Direct RPC event scanning is suitable only for a small MVP history window; use an indexer for production reporting
- Legal, fundraising, tax, recipient privacy, and treasury operating controls require external approval before launch
- Mobile app uses a separate data model (Drizzle) and is not yet integrated with the web backend

## References

1. [IRS — Application for recognition of exemption](https://www.irs.gov/charities-non-profits/application-for-recognition-of-exemption)
2. [IRS — Charitable solicitation: initial state registration](https://www.irs.gov/charities-non-profits/charitable-organizations/charitable-solicitation-initial-state-registration)
3. [SEC — Crypto assets and the federal securities laws](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/crypto-assets-federal-securities-laws)

## License

MIT License
