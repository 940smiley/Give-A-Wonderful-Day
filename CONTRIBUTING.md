# Contributing
## Brand Posture

Direct-impact contributions only. No speculative token features, no unverified investment framing, no recipient data exposure. Every PR should make the donation-to-recipient flow more transparent or safer.

## Development Standard

- Work on a feature branch, not `main`.
- Keep changes scoped and auditable.
- Run `npm run check` before requesting review.
- Do not commit secrets, real donor data, recipient data, private keys, seed phrases, or production credentials.
- Use server-side validation for mutations and route handlers.
- Treat AI output as a draft that requires staff approval.

## Commit Labels

Use these labels in commit messages and PR summaries where applicable:

- `FIX`
- `SECURITY`
- `UPGRADE`
- `FEATURE`
- `REFACTOR`
- `TEST`
- `DOCUMENTATION`
- `INFRASTRUCTURE`

## Pull Request Checklist

- Tests were added or updated for changed behavior.
- Public claims are verified or clearly marked as placeholders.
- Admin behavior is protected server-side.
- Environment variables are documented in `.env.example`.
- Smart contract changes include Hardhat tests.
