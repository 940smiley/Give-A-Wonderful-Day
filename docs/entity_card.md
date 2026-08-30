# Entity Card — Give A Wonderful Day

| Field | Current determination | Confidence and source |
|---|---|---|
| **Legal / common name** | Give-A-Wonderful-Day / Give A Wonderful Day | Repository and docs (`README.md`, `docs/FUNDING_AND_PARTNERSHIP_BRIEF.md`). |
| **Brand / mission** | Direct-impact crypto-native donation model. Donations (ETH via audited smart contract) → verified recipient programs (Wonderful Birthday Project for terminally ill patients and families in crisis). | All refreshed docs; `README.md`. |
| **Operating model** | Web3 donation flow active (`NonprofitDonation.sol`, OpenZeppelin controls, multisig treasury). Program delivery structured (Wonderful / Extraordinary / Dream tiers). Public aggregate reporting; private recipient data never on-chain. | `README.md`, `docs/LAUNCH_PLAN.md`, `ARCHITECTURE.md`. |
| **Product scope** | Live donation widget, wallet connection, contract event emission, explorer links, receipt generation, aggregate impact reporting. Program landing page, application/review flow, admin dashboard (server-side protected). Mobile demo exists; production activation requires audit + treasury verification. | `README.md`, `DEPLOYMENT.md`, `docs/LAUNCH_PLAN.md`. |
| **Crypto / contract** | `NonprofitDonation.sol`: `Ownable2Step`, `Pausable`, `ReentrancyGuard`. Testnet compile/deploy/test/verify available. Mainnet deployment requires independent audit, Safe multisig, and explicit approval. | `SMART-CONTRACT-OPERATIONS.md`, `README.md`. |
| **Legal / tax status** | Proposed nonprofit posture; no confirmed IRS 501(c)(3) determination. No claim that donations are tax-deductible until independently verified. No securities offering or token raise. | `README.md`, `docs/FUNDING_AND_PARTNERSHIP_BRIEF.md`. |
| **Funding status** | No historic funding, revenue, or grant commitments provided. Funding architecture: philanthropic and partnership-led (grants, major gifts, sponsorship, in-kind, direct crypto donations). No speculative asset economics. | `docs/FUNDING_AND_PARTNERSHIP_BRIEF.md`. |
| **Industry classification** | Crypto-native social-impact technology / direct-impact charitable giving. | Updated classification aligned with brand refresh. |
| **Fiscal year end** | TBD by governing body and accounting advisor upon entity confirmation. | Not yet provided. |
| **Reporting currency** | USD (working assumption); no approved budget yet. | Working assumption. |

## Material Decisions (Post-Refresh)

- Confirm smart contract independent audit before mainnet donation activation.
- Confirm Safe multisig treasury configured and `acceptOwnership` completed.
- Confirm legal/tax/solicitation review for target geographies before public fundraising claims.
- Confirm child safeguarding, privacy, and consent protocols for Wonderful Birthday Project delivery.
- Confirm no token or transferable digital asset mechanism is added without separate legal, governance, and security review.
