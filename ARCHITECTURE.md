# Architecture

## Brand and Mission Alignment

Direct-impact, crypto-native. Donations through `NonprofitDonation.sol` fund verified recipient programs. No speculative layer between donor and recipient. Aggregate impact is public; recipient identity stays private.

## Application

- Framework: Next.js App Router.
- UI: React client components only where browser state is required.
- Validation: Zod schemas for public forms and API routes.
- Auth: Auth.js/NextAuth foundation with Prisma adapter and role-aware session claims.
- Database: PostgreSQL via Prisma.
- Blockchain: ethers.js for browser wallet donations and direct RPC event history.
- Contracts: Solidity 0.8.24 with Hardhat.

## Program Abstraction

The platform supports multiple G.A.W.D. programs through a `Program` model that categorizes different initiatives. Each program links to `WonderfulDay` instances for execution.

### Wonderful Birthday Project

The flagship program providing extraordinary birthday experiences for children facing severe, life-limiting, or terminal medical circumstances.

**Application flow:**

```
Program (WONDERFUL_BIRTHDAY)
→ BirthdayApplication
→ Eligibility/Review
→ Selection (Priority Emergency or Periodic)
→ Experience Planning (tier assignment)
→ Funding (via NonprofitDonation.sol or treasury)
→ WonderfulDay (execution)
→ Impact Report
```

**Key models:**

- `Program` — Categorizes initiatives (WONDERFUL_BIRTHDAY, GENERAL_WONDERFUL_DAY, etc.)
- `BirthdayApplication` — Application with privacy-preserving fields
- `ExperiencePackage` — Configurable experience tiers (WONDERFUL, EXTRAORDINARY, DREAM)
- `WonderfulDay` — Execution model (linked to Program)

**Privacy architecture:**

- PII fields marked in schema with `/// PII:` comments
- Medical context stored as general category only (no diagnosis)
- Age stored as range (no exact DOB)
- No sensitive information on public blockchain
- Public impact data architecturally separated from private beneficiary data

**Selection mechanism:**

- Tier 1 (Priority/Emergency): Rolling review as funding permits
- Tier 2 (Standard Opportunity): Periodic selection windows with transparent, auditable process
- Selection logic in `lib/programs/wonderful-birthday/selection.ts`

**Experience configuration:**

- Three tiers: Wonderful, Extraordinary, Dream
- Each tier defines included components with cost estimates
- Default packages in `lib/programs/wonderful-birthday/experience-packages.ts`
- Components: celebration, family experience, travel, lodging, transportation, meals, entertainment, gifts, special activities, photography, video memory preservation, accessibility accommodations, family support

## Workflow Boundaries

Public users can submit birthday applications, nominations, contact inquiries, and wallet donations. Public users cannot trigger AI generation, scraping, email sending, grant drafting, or impact-report generation.

Admins must authenticate and hold a role with the relevant permission. Birthday application review requires `nomination:review` permission. AI-generated grant, donor-email, and impact-report content is stored or returned as a draft only. Staff review, edit, approve, and then send, submit, or publish.

## Data Layer

The Prisma schema includes:

- **Core:** users, roles, accounts, sessions, verification tokens
- **Programs:** program, birthday applications, experience packages
- **Workflow:** nominations, recipients, consent, wonderful days, event plans, vendors, expenses
- **Financial:** donors, donations, blockchain transactions
- **Communication:** communications, grants, grant applications
- **Reporting:** impact reports, documents, audit logs
- **Chat:** chat sessions, messages, escalations

Direct RPC event scanning is intentionally abstracted behind `DonationHistoryAdapter` so it can later be replaced by a database-backed indexer.

## File Structure

```
lib/programs/wonderful-birthday/
├── constants.ts          # Program constants, age ranges, medical contexts, tiers
├── validation.ts         # Zod schemas for application and review forms
├── experience-packages.ts # Default experience tier configurations
├── selection.ts          # Selection mechanism for standard opportunity track
└── index.ts              # Module barrel export

app/programs/wonderful-birthday/
├── page.tsx              # Program landing page
└── apply/
    ├── page.tsx           # Application form page wrapper
    └── BirthdayApplicationForm.tsx # Client-side form component

app/admin/birthday-applications/
└── page.tsx              # Admin review dashboard (requires nomination:review)
```
