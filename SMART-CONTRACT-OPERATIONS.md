# Smart Contract Operations
## Brand Posture

Direct-impact contract: donations in, treasury withdrawals to verified recipient programs only. No token issuance, no investment framing, no speculative asset layer. Production requires independent audit, Safe multisig, and verified testnet rehearsal.

## Contract

`NonprofitDonation` records ETH donations and allows the owner to withdraw funds to the nonprofit treasury.

## Ownership

Production ownership should be transferred to a Safe multisig using `transferOwnership` followed by `acceptOwnership`. Do not leave production ownership with an individual wallet.

## Treasury

`setNonprofitWallet` rejects the zero address and emits `NonprofitWalletUpdated`. Consider a timelock or documented governance delay before treasury updates in production.

## Deployment

Required values:

- `RPC_URL`
- `DEPLOYER_PRIVATE_KEY`
- `TREASURY_ADDRESS`
- `EXPECTED_CHAIN_ID`
- `BLOCK_EXPLORER_API_KEY`

Commands:

```bash
npm run contract:compile
npm run contract:test
npm run contract:coverage
npm run contract:deploy:testnet
npm run contract:verify
```

Never commit a deployer private key. Never deploy to mainnet without explicit approval, multisig confirmation, and testnet rehearsal.
