import { afterEach, describe, expect, it } from 'vitest';
import { getTraditionalDonationProvider } from './traditional';

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
});

describe('traditional donation provider safety', () => {
  it('does not accept mock payment webhooks', async () => {
    delete process.env.PAYMENT_PROVIDER;

    await expect(getTraditionalDonationProvider().verifyWebhook('{}', 'signature')).resolves.toBe(
      false,
    );
  });

  it('keeps scaffolded production providers disabled until real verification exists', async () => {
    process.env.PAYMENT_PROVIDER = 'stripe';
    process.env.PAYMENT_SECRET_KEY = 'sk_test_placeholder';
    process.env.PAYMENT_WEBHOOK_SECRET = 'whsec_placeholder';

    const provider = getTraditionalDonationProvider();

    await expect(
      provider.createCheckoutSession({
        amountCents: 2_500,
        currency: 'USD',
        recurring: false,
        donorEmail: 'donor@example.org',
      }),
    ).rejects.toThrow(/disabled/);
    await expect(provider.verifyWebhook('{}', 'signature')).rejects.toThrow(
      /verification is not implemented/,
    );
  });
});
