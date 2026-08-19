import { z } from 'zod';
import { getServerEnv } from '../env';

export const traditionalDonationSchema = z.object({
  amountCents: z.number().int().min(100).max(1_000_000),
  currency: z.string().length(3).default('USD'),
  recurring: z.boolean().default(false),
  donorEmail: z.string().email().optional(),
});

export type TraditionalDonationInput = z.infer<typeof traditionalDonationSchema>;

export type CheckoutSession = {
  provider: 'mock' | 'stripe' | 'paypal';
  id: string;
  url: string;
  mode: 'payment' | 'subscription';
};

export interface TraditionalDonationProvider {
  createCheckoutSession(input: TraditionalDonationInput): Promise<CheckoutSession>;
  verifyWebhook(rawBody: string, signature: string | null): Promise<boolean>;
}

class MockDonationProvider implements TraditionalDonationProvider {
  async createCheckoutSession(input: TraditionalDonationInput): Promise<CheckoutSession> {
    return {
      provider: 'mock',
      id: `mock-${input.recurring ? 'recurring' : 'one-time'}-${Date.now()}`,
      url: '/donate?traditional=preview',
      mode: input.recurring ? 'subscription' : 'payment',
    };
  }

  async verifyWebhook(_rawBody: string, _signature: string | null): Promise<boolean> {
    return true;
  }
}

class ProductionDonationProvider extends MockDonationProvider {
  async createCheckoutSession(_input: TraditionalDonationInput): Promise<CheckoutSession> {
    const env = getServerEnv();
    if (!env.PAYMENT_SECRET_KEY) {
      throw new Error('Payment provider credentials are not configured.');
    }

    throw new Error(
      `${env.PAYMENT_PROVIDER} checkout is scaffolded but disabled until the nonprofit account is verified.`,
    );
  }

  async verifyWebhook(_rawBody: string, signature: string | null): Promise<boolean> {
    const env = getServerEnv();
    return Boolean(env.PAYMENT_WEBHOOK_SECRET && signature);
  }
}

export function getTraditionalDonationProvider(): TraditionalDonationProvider {
  const env = getServerEnv();
  if (env.PAYMENT_PROVIDER === 'mock') {
    return new MockDonationProvider();
  }

  return new ProductionDonationProvider();
}
