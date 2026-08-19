# Architecture

## Application

- Framework: Next.js App Router.
- UI: React client components only where browser state is required.
- Validation: Zod schemas for public forms and API routes.
- Auth: Auth.js/NextAuth foundation with Prisma adapter and role-aware session claims.
- Database: PostgreSQL via Prisma.
- Blockchain: ethers.js for browser wallet donations and direct RPC event history.
- Contracts: Solidity 0.8.24 with Hardhat.

## Workflow Boundaries

Public users can submit nominations, contact inquiries, and wallet donations. Public users cannot trigger AI generation, scraping, email sending, grant drafting, or impact-report generation.

Admins must authenticate and hold a role with the relevant permission. AI-generated grant, donor-email, and impact-report content is stored or returned as a draft only. Staff review, edit, approve, and then send, submit, or publish.

## Data Layer

The Prisma schema includes users, roles, nominations, recipients, consent, Wonderful Day plans, vendors, expenses, donors, donations, blockchain transactions, grants, grant applications, communications, impact reports, documents, and audit logs.

Direct RPC event scanning is intentionally abstracted behind `DonationHistoryAdapter` so it can later be replaced by a database-backed indexer.
