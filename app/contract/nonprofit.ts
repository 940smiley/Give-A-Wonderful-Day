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

if (!NONPROFIT_CONTRACT_ADDRESS || !ethers.utils.isAddress(NONPROFIT_CONTRACT_ADDRESS)) {
  throw new Error(
    "NEXT_PUBLIC_NONPROFIT_CONTRACT_ADDRESS is not set or is not a valid Ethereum address"
  );
}
      "NEXT_PUBLIC_NONPROFIT_CONTRACT_ADDRESS is not set"
    );
  }
  return new ethers.Contract(
    NONPROFIT_CONTRACT_ADDRESS,
    NONPROFIT_CONTRACT_ABI,
    signerOrProvider
  );
}
