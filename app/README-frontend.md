# Frontend Status
## Brand — Crypto-Forward Direct Impact
Public routes for direct donation flow (`NonprofitDonation.sol`), mission landing, Wonderful Birthday Project, privacy-controlled admin, and aggregate impact reporting. No simulated-only framing; live contract verification required before activation.

The public Next.js app includes the launch-facing routes, wallet connection, Web3 donation form,
wrong-network handling, contract bytecode validation, recent on-chain donation history, and guarded
admin route structure.

Run the local app with:

```bash
npm run dev
```

Before a public release, run:

```bash
npm run check:release
```

Remaining launch work is operational rather than placeholder frontend work: deploy and verify the
contract, set the public contract and chain environment values, configure production auth/database
secrets, and complete legal/privacy/fundraising review.
