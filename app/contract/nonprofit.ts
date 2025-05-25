import { ethers } from "ethers";

// Replace with your deployed contract address
export const NONPROFIT_CONTRACT_ADDRESS = "0xYourContractAddressHere";

export const NONPROFIT_CONTRACT_ABI = [
  "function donate(string message) payable",
  "function getBalance() view returns (uint256)",
  "event DonationReceived(address indexed donor, uint256 amount, string message, uint256 timestamp)"
];

export function getContract(signerOrProvider) {
  return new ethers.Contract(
    NONPROFIT_CONTRACT_ADDRESS,
    NONPROFIT_CONTRACT_ABI,
    signerOrProvider
  );
}
