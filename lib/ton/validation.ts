export type TonValidationResult =
  | { valid: true; nanotons: string }
  | { valid: false; message: string };

export function validateTonAmount(
  amount: string,
  options: { minTon: string; maxTon: string }
): TonValidationResult {
  const parsed = Number.parseFloat(amount);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return { valid: false, message: 'Please enter a valid amount.' };
  }
  const min = Number.parseFloat(options.minTon);
  const max = Number.parseFloat(options.maxTon);

  if (parsed < min) {
    return { valid: false, message: `Minimum donation is ${options.minTon} TON.` };
  }
  if (parsed > max) {
    return { valid: false, message: `Maximum donation is ${options.maxTon} TON.` };
  }

  // Convert TON to nanotons (1 TON = 1,000,000,000 nanotons)
  const nanotons = Math.floor(parsed * 1_000_000_000).toString();
  return { valid: true, nanotons };
}
