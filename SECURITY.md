# Security
## Brand Alignment

Direct-impact security: no recipient PII on public blockchain, donation events only, multisig treasury controls, and private vulnerability reporting. No speculative token mechanisms without separate security review.

## Reporting

Report suspected vulnerabilities privately to the repository owner. Do not open a public issue containing exploit details, secrets, donor information, recipient information, or private keys.

## Implemented Controls

- Strict TypeScript and safe unknown-error handling.
- Server-side Auth.js/NextAuth role checks for admin routes and privileged APIs.
- Admin automation disabled by default using server-only `ENABLE_ADMIN_AUTOMATION`.
- SSRF protections for grant retrieval, including DNS validation and redirect revalidation.
- Request size limits and in-memory rate limits on sensitive APIs.
- Security headers through `next.config.js`.
- Draft-only AI architecture with untrusted external content separated from trusted instructions.
- Email preview/approval boundary before any send.
- OpenZeppelin contract ownership, pause, and reentrancy controls.

## Remaining Security Blockers

- Replace in-memory rate limiting with shared infrastructure for production.
- Complete MFA-capable identity provider setup.
- Complete Hardhat 3 audit remediation or wait for patched Hardhat 2-compatible dependencies.
- Add production monitoring, alerting, WAF rules, and secret scanning at the GitHub organization level.
