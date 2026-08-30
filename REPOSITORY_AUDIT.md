# Repository Audit — Give A Wonderful Day

> **Archive / Reference — 2026-08-30 refresh**: Document reflects pre-refresh repository state (branch divergence, staged files, mobile/web gap analysis). Post-refresh: `README.md`, docs (`FUNDING_AND_PARTNERSHIP_BRIEF.md`, `LAUNCH_PLAN.md`, `SOCIAL_CONTENT.md`), `ARCHITECTURE.md`, `DEPLOYMENT.md`, `SECURITY.md`, `PRIVACY-DATA-HANDLING.md`, `SMART-CONTRACT-OPERATIONS.md`, `CONTRIBUTING.md`, `AI_AUTOMATION_PLAN.md`, `findings.md`, `docs/entity_card.md`, `REPO_TODO.md` updated to crypto-forward direct-impact brand. Historical audit preserved for reference.
Generated: 2026-08-18

---

## 1. Repository Status

| Item | Value |
|------|-------|
| Current branch | `codex/production-readiness-upgrade` |
| Clean/dirty | **dirty** — 117 staged files, 1 unstaged file (package-lock.json) |
| Node.js | v24.16.0 |
| Package manager | npm (root), pnpm (mobile/) |
| Workspace path | Contains commas and spaces — causes npm script failures |

### Working Tree Summary

- **117 staged files** (+20,785 lines) — the full web application, mobile app, contracts, docs, and tests
- **1 unstaged file** — package-lock.json (minor diff)
- These staged changes represent the bulk of the application code that was developed on the `jules` branch and landed here via the `codex/production-readiness-upgrade` branch workflow

---

## 2. Branch Inventory

### Local Branches

| Branch | Status | Notes |
|--------|--------|-------|
| `codex/production-readiness-upgrade` | **current** | 10 commits ahead of local `main` |
| `main` | behind | 1 commit ahead of `origin/main`, 44 commits behind `origin/main` |

### Remote Branches

| Branch | Relationship to `origin/main` | Unique Work | Notes |
|--------|-------------------------------|-------------|-------|
| `origin/main` | **canonical remote** | 44 commits ahead of local `main` | Contains mobile demo, launch docs, CI, dependabot merges, feature work |
| `origin/codex/production-readiness-upgrade` | 10 commits ahead of `origin/main` | Infrastructure, security, tests, contract hardening | Most complete branch — has all `origin/main` + 10 unique commits |
| `origin/jules-gawd-demos-and-pr-triage-*` | 40+ commits ahead of `origin/main` | Bulk feature development: all web pages, components, admin, AI, mobile, contracts, tests | Parallel development line — **substantial unique work** |
| `origin/dependabot/npm_and_yarn/weekly-dependencies-*` | ~44 commits ahead of `origin/main` | Dependency bumps, README/index.html revisions, CI workflows | Contains `origin/main` content + deps + some docs rework |
| `origin/dependabot/npm_and_yarn/mobile/npm_and_yarn-*` | ~5 commits ahead of `origin/main` | Mobile vitest bump, grant-fetcher HTML sanitization fix, deps | Contains specific security/quality improvements |

### Branch Divergence Analysis

```
merge-base of local main ↔ origin/main: caa9427
merge-base of local main ↔ codex/production-readiness-upgrade: cd36795 (which is local main HEAD)
merge-base of local main ↔ jules branch: caa9427
```

**Key finding:** Local `main` (at `cd36795`) is a single-commit divergence from `origin/main`. The `cd36795` commit (Node.js 22 upgrade) is only in local main, not in `origin/main`.

The `codex/production-readiness-upgrade` branch contains all of local `main`'s history and adds 10 infrastructure/security commits on top.

The `jules` branch diverged from `caa9427` (which is before the Next.js pin) and has 40+ commits of feature development.

---

## 3. Application Architecture

### Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router), React 19 |
| UI | Tailwind CSS, server/client components |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth.js (Auth.js) with Prisma adapter |
| Blockchain | ethers.js, Solidity 0.8.24, Hardhat |
| AI | Provider abstraction (mock or HTTP JSON) |
| Email | Provider abstraction (mock or HTTP) |
| Mobile | Expo SDK 54, React Native, NativeWind, Drizzle ORM, tRPC |
| Testing | Vitest (unit), Playwright (e2e), Hardhat/Chai (contracts) |
| CI/CD | GitHub Actions |

### Application Entry Points

1. **Next.js web app:** `app/page.tsx` (landing page)
2. **Expo mobile app:** `mobile/app/` (standalone Expo app)
3. **Static GitHub Pages:** `index.html` (standalone landing page)

### Page Routes (Web)

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Landing page with 3 stakeholder pathways | Scaffolded |
| `/about` | About/disclaimer page | Scaffolded |
| `/assistance` | Assistance application portal (5 services) | Functional demo |
| `/chat` | GAWD AI chatbot with crisis hotlines | Functional demo |
| `/contact` | Contact form | Scaffolded |
| `/donate` | Investor/donor portal with impact calculator | Functional demo |
| `/mission` | Mission statement page | Scaffolded |
| `/nominate` | Nomination form | Scaffolded |
| `/partners` | Nonprofit partner network portal | Functional demo |
| `/privacy` | Privacy policy page | Scaffolded |
| `/programs` | Programs listing (3 scaffolded programs) | Scaffolded |
| `/signin` | Admin sign-in page | Scaffolded |
| `/stories` | Stories page | Scaffolded |
| `/terms` | Terms of use page | Scaffolded |
| `/transparency` | Transparency/reporting page | Scaffolded |
| `/admin` | Admin dashboard | Scaffolded |
| `/admin/audit-log` | Audit log viewer | Scaffolded |
| `/admin/automation` | Automation controls | Scaffolded |
| `/admin/donations` | Donation management | Scaffolded |
| `/admin/events` | Event management | Scaffolded |
| `/admin/hotline` | Hotline escalation queue | Functional |
| `/admin/nominations` | Nomination review | Scaffolded |
| `/admin/recipients` | Recipient management | Scaffolded |
| `/admin/reports` | Impact reports | Scaffolded |
| `/admin/users` | User management | Scaffolded |

### API Routes

| Route | Method | Purpose | Status |
|-------|--------|---------|--------|
| `/api/ai/generate-email` | POST | Generate donor email draft | Scaffolded |
| `/api/ai/generate-grant-draft` | POST | Generate grant draft | Scaffolded |
| `/api/ai/generate-impact-report` | POST | Generate impact report | Scaffolded |
| `/api/auth/[...nextauth]` | * | NextAuth handler | Scaffolded |
| `/api/chat` | POST | GAWD AI chat endpoint | Functional |
| `/api/grants/hotline` | POST | Hotline grant submission | Functional |
| `/api/health` | GET | Health check | Functional |
| `/api/nft/mint` | POST | NFT minting endpoint | Scaffolded |
| `/api/payments/webhook` | POST | Payment webhook | Scaffolded (disabled) |
| `/api/scrape` | POST | Grant URL scraping | Functional (SSRF-protected) |
| `/api/send-email` | POST | Email sending | Scaffolded (preview only) |

---

## 4. Smart Contracts

| Contract | File | Purpose | Status |
|----------|------|---------|--------|
| `NonprofitDonation` | `contracts/NonprofitDonation.sol` | ETH donations, pause, withdraw | Production-ready (with review) |
| `GAWDCharacter` | `contracts/GAWDCharacter.sol` | Character NFT for recipients | Scaffolded |
| `ReentrantTreasury` | `contracts/test/ReentrantTreasury.sol` | Reentrancy test helper | Test-only |

---

## 5. Data Model (Prisma)

### Enums (11)
- `RoleName` (9 values) — RBAC roles
- `NominationType` (2) — STANDARD, HOTLINE_GRANT
- `NominationStatus` (5) — SUBMITTED → RECIPIENT_CREATED
- `ConsentStatus` (4) — PENDING → REVOKED
- `WonderfulDayStatus` (6) — DRAFT → CANCELLED
- `ExpenseStatus` (4) — PROJECTED → REJECTED
- `DonationProvider` (4) — BLOCKCHAIN, STRIPE, PAYPAL, MANUAL
- `DonationStatus` (4) — PENDING → REFUNDED
- `CommunicationStatus` (4) — DRAFT → FAILED
- `GrantStatus` (6) — IDENTIFIED → DECLINED
- `ImpactReportStatus` (4) — DRAFT → PUBLISHED
- `DocumentVisibility` (3) — INTERNAL, PUBLIC, RESTRICTED
- `ChatStatus` (3) — ACTIVE, ESCALATED, CLOSED
- `ChatRole` (3) — USER, GAWD, SYSTEM

### Models (22)
User, Role, Account, Session, VerificationToken, Nomination, Recipient, Consent, WonderfulDay, EventPlan, Vendor, Expense, Donor, Donation, BlockchainTransaction, Communication, Grant, GrantApplication, ImpactReport, Document, AuditLog, ChatSession, ChatMessage, ChatEscalation

### Key Relationships
```
Nomination → Recipient → WonderfulDay → EventPlan → Vendor
                                           ↓
                                         Expense
                                           ↓
                                      ImpactReport
Recipient → Consent
Donor → Donation → BlockchainTransaction
Grant → GrantApplication
User → AuditLog
ChatSession → ChatMessage, ChatEscalation
```

---

## 6. Identified Gaps and Issues

### A. Build Issues
- **npm scripts fail** due to commas/spaces in workspace path
- `findings.md` reports package.json as "invalid JSON" (likely outdated)
- 30 ESLint errors (mostly `@typescript-eslint/no-explicit-any` in mobile code)

### B. Architecture Gaps
- No program/category abstraction — WonderfulDay is the only program
- No birthday-specific models or logic
- No application/tier system for different case types
- No selection mechanism for periodic opportunities
- No configurable experience packages

### C. Privacy Considerations
- PII fields are marked with comments in Prisma schema (good)
- No active PII filtering/redaction layer
- No consent management beyond the Consent model
- No data retention automation

### D. Documentation Coherence
- `README.md` describes a "local-first mobile demo" which conflicts with the full web application
- `index.html` also describes a mobile demo focus
- Multiple documents describe different maturity levels
- No unified program documentation

### E. Mobile App
- Standalone Expo app with its own data model (Drizzle, not Prisma)
- Separate authentication system
- No integration with the web app's backend
- Contains Manus runtime, tRPC server — appears to be a generated template

---

## 7. Unification Recommendations

### Immediate (P0)
1. Establish `origin/main` as the canonical remote branch
2. Determine relationship between local `main` and `origin/main`
3. Resolve the working tree staging (commit or unstage the 117 files)

### Short-term (P1)
1. Add program/category abstraction to Prisma schema
2. Add Wonderful Birthday Project models
3. Update README and index.html to reflect actual application state
4. Fix ESLint errors

### Medium-term (P2)
1. Consolidate branch work from `jules` branch
2. Align mobile and web data models
3. Add birthday program UI pages
4. Add application/tier system

### Long-term (P3)
1. Merge appropriate dependabot branches
2. Archive obsolete branches
3. Unify mobile and web authentication
4. Add data retention automation
