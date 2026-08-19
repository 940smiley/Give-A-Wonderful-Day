import { ethers } from 'ethers';

export type DonationAmountValidation =
  | { valid: true; wei: bigint }
  | { valid: false; message: string };

export function validateDonationAmount(
  amount: string,
  options: { minEth: string; maxEth?: number },
): DonationAmountValidation {
  const trimmed = amount.trim();

  if (!trimmed) {
    return { valid: false, message: 'Enter a donation amount.' };
  }

  if (!/^\d+(\.\d{1,18})?$/.test(trimmed)) {
    return { valid: false, message: 'Enter a valid ETH amount with up to 18 decimals.' };
  }

  let wei: bigint;
  try {
    wei = ethers.parseEther(trimmed);
  } catch {
    return { valid: false, message: 'Enter a valid ETH amount.' };
  }

  const min = ethers.parseEther(options.minEth);
  if (wei < min) {
    return { valid: false, message: `Minimum donation is ${options.minEth} ETH.` };
  }

  if (options.maxEth !== undefined && wei > ethers.parseEther(String(options.maxEth))) {
    return { valid: false, message: `Maximum donation is ${options.maxEth} ETH.` };
  }

  return { valid: true, wei };
}
