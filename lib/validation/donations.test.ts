import { describe, expect, it } from 'vitest';
import { validateDonationAmount } from './donations';

describe('validateDonationAmount', () => {
  it('rejects empty values', () => {
    expect(validateDonationAmount('', { minEth: '0.001' })).toEqual({
      valid: false,
      message: 'Enter a donation amount.',
    });
  });

  it('rejects malformed numbers', () => {
    expect(validateDonationAmount('1.1234567890123456789', { minEth: '0.001' }).valid).toBe(false);
    expect(validateDonationAmount('abc', { minEth: '0.001' }).valid).toBe(false);
  });

  it('enforces minimum and maximum values', () => {
    expect(validateDonationAmount('0.0001', { minEth: '0.001' }).valid).toBe(false);
    expect(validateDonationAmount('101', { minEth: '0.001', maxEth: 100 }).valid).toBe(false);
  });

  it('returns wei for a valid amount', () => {
    const result = validateDonationAmount('0.5', { minEth: '0.001' });
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.wei).toBe(500000000000000000n);
    }
  });
});
