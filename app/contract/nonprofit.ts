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
}
