<<<<<<< HEAD
import { ethers } from "ethers";

// Contract address is injected via environment variable for flexibility across
// deployments. Use a NEXT_PUBLIC_ prefix so the value is available in the
// browser bundle.
export const NONPROFIT_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_NONPROFIT_CONTRACT_ADDRESS || "";

export const NONPROFIT_CONTRACT_ABI = [
  "function donate(string message) payable",
  "function getBalance() view returns (uint256)",
  "event DonationReceived(address indexed donor, uint256 amount, string message, uint256 timestamp)"
];

export function getContract(
  signerOrProvider: ethers.Signer | ethers.Provider
) {
  if (!NONPROFIT_CONTRACT_ADDRESS) {
    throw new Error("NEXT_PUBLIC_NONPROFIT_CONTRACT_ADDRESS is not set");
  }

  if (!ethers.isAddress(NONPROFIT_CONTRACT_ADDRESS)) {
    throw new Error(
      "NEXT_PUBLIC_NONPROFIT_CONTRACT_ADDRESS is not a valid Ethereum address"
    );
  }

  return new ethers.Contract(
    NONPROFIT_CONTRACT_ADDRESS,
    NONPROFIT_CONTRACT_ABI,
    signerOrProvider
  );
=======
import { ethers } from 'ethers';

export const NONPROFIT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NONPROFIT_CONTRACT_ADDRESS || '';

export const NONPROFIT_CONTRACT_ABI = [
  'function donate(string message) payable',
  'function getBalance() view returns (uint256)',
  'function paused() view returns (bool)',
  'event DonationReceived(address indexed donor, uint256 amount, string message, uint256 timestamp)',
] as const;

export function assertContractAddress(): string {
  if (!NONPROFIT_CONTRACT_ADDRESS) {
    throw new Error('Donation contract address is not configured.');
  }

  if (!ethers.isAddress(NONPROFIT_CONTRACT_ADDRESS)) {
    throw new Error('Donation contract address is not a valid Ethereum address.');
  }

  return NONPROFIT_CONTRACT_ADDRESS;
}

export function getContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(assertContractAddress(), NONPROFIT_CONTRACT_ABI, signerOrProvider);
>>>>>>> origin/codex/production-readiness-upgrade
}
