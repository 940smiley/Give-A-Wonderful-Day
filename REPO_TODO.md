# REPO_TODO — Give-A-Wonderful-Day

Local path: `D:\WORK\GitRepos\PERSONAL\Give-A-Wonderful-Day`

Brand: simple, direct-impact, crypto-native. Donations in → wonderful days out.

## Repo links

- Repo: https://github.com/940smiley/Give-A-Wonderful-Day
- Actions: https://github.com/940smiley/Give-A-Wonderful-Day/actions
- Pulls: https://github.com/940smiley/Give-A-Wonderful-Day/pulls

## Working tree

- Branch: `main`
- Status: **clean after brand refresh** (README, launch plan, funding brief, social content, architecture docs updated to crypto-forward direct-impact tone)

## Recent updates (brand-aligned refresh)

- [x] `README.md` — rewritten: direct mission, live donation contract, no speculative framing
- [x] `docs/FUNDING_AND_PARTNERSHIP_BRIEF.md` — crypto-forward funding brief
- [x] `docs/LAUNCH_PLAN.md` — live activation timeline, smart contract gates, direct recipient delivery
- [x] `docs/SOCIAL_CONTENT.md` — X thread, Instagram, Telegram, LinkedIn, video script
- [x] `docs/LAUNCH_PLAN.md`, `ARCHITECTURE.md`, `DEPLOYMENT.md`, `SECURITY.md`, `PRIVACY-DATA-HANDLING.md`, `SMART-CONTRACT-OPERATIONS.md`, `CONTRIBUTING.md` — tone refreshed
- [ ] `REPO_TODO.md` — this file (update backlog status after refresh)
- [ ] `AI_AUTOMATION_PLAN.md` — review for brand alignment
- [ ] `FINAL_REPORT.md` — historical; keep as archive, add header note
- [ ] `findings.md` — stale; mark for removal/update

## Open PRs

- [#144] `dependabot/github_actions/actions/github-script-9` — review / close
- [#146] `dependabot/stefanzweifel/git-auto-commit-action-7` — review / close

## Suggested smoke validation

```bash
npm ci
npm run check
npm run contract:compile
npm run contract:test
npm run build
```

Confirm donation flow: wallet connects, contract event emits, explorer link works.

## Tagged backlog (post-refresh)

- **[BRAND]** Confirm all `.md` files reflect crypto-forward direct-impact tone.
- **[SECURITY]** Confirm smart contract audit completed before any mainnet deployment.
- **[PROGRAM]** Confirm Wonderful Birthday Project pilot partner selected; safeguarding protocol verified.
- **[LEGAL]** Confirm charitable solicitation, tax, and treasury reviews before public donation activation.
- **[INFRA]** Resolve OpenZeppelin 5.6.1 / Solidity ≥0.8.25 conflict (pre-existing).
- **[DEPLOY]** Confirm Safe multisig treasury configured; `NEXT_PUBLIC_NONPROFIT_CONTRACT_ADDRESS` set.
- **[ARCHIVE]** Remove stale `findings.md`, `dev-server.log` artifacts; clean `.snapshots/` if obsolete.
- **[CI]** Unblock Actions (dependabot PRs reviewed or merged).
- **[CONTENT]** Confirm social content (`docs/SOCIAL_CONTENT.md`) posted and tracked for publicity.
