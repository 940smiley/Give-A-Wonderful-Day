# Give A Wonderful Day — Launch Readiness Plan

> **Direct-impact, crypto-native launch.** This is not a simulated-only demo plan. Give A Wonderful Day takes donations through a hardened `NonprofitDonation.sol` contract and distributes funds to verified recipients — terminally ill patients, families in crisis, children who need a wonderful birthday. Legal, tax, security, and privacy approvals are prerequisites, not excuses for inaction. Launch when controls are verified; operate openly once they are.

---

## Launch Definition

The first public release is a **live mobile experience with active donation flow**, mission landing page, and transparent impact reporting. People donate ETH directly to the audited smart contract. Funds are withdrawn through a multisig treasury for approved recipient programs. No simulated records presented as reality. No hidden middlemen. Success is measured by verified donations delivered to real recipients, not by simulated engagement metrics.

| Release layer | Active at launch (post-verification) | Held until independently confirmed |
|---|---|---|
| **Product** | Live donation widget (`DonationWidget`, `TonDonationWidget`), wallet connection with wrong-network blocking, on-chain event emission (`DonationReceived`), explorer links, receipt generation, aggregate impact view. | Automated recipient eligibility decisions without human review; tokenized rights or rewards. |
| **Organization** | Clear mission statement, proposed status disclosure, direct solicitation with verified treasury controls, privacy policy, safeguarding protocol. | Tax-deductible claim unless IRS/status determination is confirmed independently. No public charity claim without evidence. |
| **Technology** | Deployed `NonprofitDonation.sol` (Ownable2Step, Pausable, ReentrancyGuard), open-source repo, public contract verification, security contact. | New token contracts, NFT issuance, DAO mechanics — require separate legal, governance, and security review before any reconsideration. |

---

## Critical Path — From Contract to Recipient

| Gate | Evidence required before activation | Consequence if skipped |
|---|---|---|
| **Smart contract audit + verification** | Independent review of `NonprofitDonation.sol`, bytecode verification on explorer, multisig (Safe) treasury configured as owner, testnet rehearsal complete. | Do not deploy to mainnet or accept donations. |
| **Treasury and custody controls** | Approved gift-acceptance policy, restricted-fund tracking, withdrawal process documented, multisig signers named, incident response plan active. | No live ETH custody or withdrawals. |
| **Legal / tax / solicitation review** | Nonprofit counsel reviews entity formation, solicitation requirements for target geographies, public disclosure language. The IRS notes that approximately 40 states have solicitation statutes.[1] Tax-deductibility claim requires independent verification.[2] | No claim that donations are tax-deductible; no public fundraising without state-level clearance where required. |
| **Privacy and safeguarding** | Data map, privacy notice, recipient PII separation from public blockchain data, consent language for any documented stories, moderation/escalation path, deletion process. | Do not collect recipient PII; do not publish any beneficiary story without explicit consent. |
| **Program operations (Wonderful Birthday)** | Named pilot thesis, partner selection criteria, safeguarding protocol, experience design (Wonderful / Extraordinary / Dream tiers), family application/review flow. | Do not promise outcomes before a measured pilot. |
| **Security and Web3 architecture** | Threat model completed, wallet/custody decision recorded, dependencies inventory (Hardhat, RPC, indexer), contract audit scope executed. | Do not expose production contract to unaudited changes. |

---

## 3-Month Activation Roadmap (Post-Verification)

| Phase | Outcome | Product milestone | Funding / operation milestone | Exit criteria |
|---|---|---|---|---|
| **0. Contract live** | Donations can be made with proof. | `NonprofitDonation.sol` deployed, verified, multisig configured; donation widget connects; event emission and explorer links active. | Treasury controls approved; no tax-deductibility claim without confirmation. | Independent audit signed; first donation event verifiable on-chain. |
| **1. Direct recipient delivery** | Verified wonderful days funded. | Program application/review flow active; Wonderful Birthday tiers (Wonderful / Extraordinary / Dream) delivered to approved recipients; aggregate reporting public. | Board-approved pilot budget; partner letters; gift-acceptance and privacy policies confirmed. | Recipient experience delivered; cost per experience tracked; family feedback recorded; no sensitive data exposed. |
| **2. Partner and sponsor scale** | Repeatable program with transparent funding. | Partner toolkit; standardized aggregate reporting; sponsored cohort option with mission-aligned sponsors. | Diversified funding (crypto donations + sponsor support); monthly financial cadence; reserve policy active. | Program, finance, safeguarding reviewed monthly; external evaluation or equivalent outcome review supports next phase. |
| **3. Network expansion (optional)** | Additional partners only when controls repeat. | Expanded partner toolkit; service reliability targets; optional provenance layer only after user research and separate legal review. | Board-approved expansion budget; no token/NFT/DAO mechanics without specialized counsel and governance review. | Written go/no-go on any crypto-asset addition shows a user benefit that cannot be achieved more safely with conventional tooling. |

---

## Metrics — Impact Over Speculation

No token price, transaction volume, or social reach is a proxy for impact.

| Dimension | Metric | Why it matters | Cadence |
|---|---|---|---|
| **Donation flow** | Verified donations, total ETH raised, transaction success rate, explorer-link verification rate. | Confirms the contract works and donors can verify their contribution. | Real-time + weekly. |
| **Recipient delivery** | Birthdays funded, birthdays delivered, children served, families supported, average cost per experience. | Connects donations directly to mission outcomes. | Per delivery + monthly. |
| **Program quality** | Family/partner-rated experience; consent documentation rate; safeguarding event count and resolution time. | Keeps recipient wellbeing above growth. | Per pilot + monthly. |
| **Financial discipline** | Budget variance against board-approved pilot; treasury withdrawal approvals; reserve status. | Ensures donations go to approved recipient programs, not speculative use. | Monthly. |
| **Transparency** | Aggregate impact reports published; smart contract event logs accessible; no private recipient data leaked. | Builds trust with crypto donors who expect verifiable flow. | Per report cycle. |

---

## Communication and Technology Guardrails

- **Public communication must show actual status**: no false tax-deductible claims; no investment framing; no return or value expectations for any crypto asset.
- **On-chain transparency = impact transparency, not recipient exposure**: aggregate statistics only; recipient names, medical details, family contacts never on public blockchain. Any on-chain identifier uses non-sensitive hashes or aggregate values only.
- **Before any new crypto asset, digital collectible, transferable benefit, or token mechanism**: specialized counsel must review. The SEC explains that rights attached to a crypto asset materially change its regulatory treatment.[3]
- **Demo / simulated framing removed once verified**: once audit and treasury controls are complete, the product is live — not simulated — and should be described as such.

---

## References

[1]: https://www.irs.gov/charities-non-profits/charitable-organizations/charitable-solicitation-initial-state-registration "IRS — Charitable solicitation: initial state registration"
[2]: https://www.irs.gov/charities-non-profits/application-for-recognition-of-exemption "IRS — Application for recognition of exemption"
[3]: https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/crypto-assets-federal-securities-laws "SEC — Crypto assets and the federal securities laws"
