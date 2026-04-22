# Give-A-Wonderful-Day
A proposed 501(c)(3) nonprofit organization dedicated to bringing joy and respite to individuals facing significant life challenges with a single day of pure joy and respite, fostering hope, happiness, and a renewed sense of self-worth.

## Smart Contracts
- `contracts/NonprofitDonation.sol`: Core contract for transparent donations and fund management.
- `contracts/ThankYouNFT.sol`: Optional NFT thank-you experience for supporters.
- `contracts/SimpleDAO.sol`: Governance extension for nonprofit decisions.

## Launching the DApp (Web3-ready)
1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_NONPROFIT_CONTRACT_ADDRESS` to your deployed `NonprofitDonation` contract address.
4. Start locally with `npm run dev`.
5. Open `http://localhost:3000` and connect MetaMask/Exodus.

### What is now included
- Wallet connection flow and account change handling.
- Live contract balance display.
- Donation transaction submission and confirmation status.
- On-chain `DonationReceived` event history display (latest events).
- AI automation test UI for grant drafting, donor outreach, and impact reports.

## Repository Automation
This repository includes CI and automation workflows to support continuous maintenance:
- **CI**: install, typecheck, and production build.
- **PR auto-fix**: lockfile refresh/audit fixes with commit-back for same-repo PRs.
- **Dependabot**: npm + GitHub Actions updates.
- **Dependabot auto-merge**: enables auto-merge for safe dependency PRs that pass checks.
- **Maintenance report**: periodic summary issue with open PR/issue snapshot and dependency labeling.

## Commands
- `npm run dev` – local development server.
- `npm run typecheck` – TypeScript validation.
- `npm run build` – production build.
- `npm run check` – typecheck + build.

---
For questions or to request a specific feature, see the `intro` file or contact the project maintainer.
