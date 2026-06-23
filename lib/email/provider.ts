import { z } from 'zod';
import { getServerEnv } from '../env';

export const emailDraftSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(3).max(160),
  body: z.string().min(10).max(20_000),
  approved: z.boolean().default(false),
  previewOnly: z.boolean().default(true),
});

export type EmailDraftInput = z.infer<typeof emailDraftSchema>;

export type EmailSendResult = {
  provider: string;
  status: 'preview' | 'sent';
  messageId?: string;
};

export interface EmailProvider {
  send(input: EmailDraftInput): Promise<EmailSendResult>;
}

class MockEmailProvider implements EmailProvider {
  async send(input: EmailDraftInput): Promise<EmailSendResult> {
    if (!input.approved || input.previewOnly) {
      return { provider: 'mock', status: 'preview' };
    }

    return { provider: 'mock', status: 'sent', messageId: `mock-${Date.now()}` };
  }
}

class HttpEmailProvider implements EmailProvider {
  async send(input: EmailDraftInput): Promise<EmailSendResult> {
    const env = getServerEnv();
    if (!input.approved) {
      return { provider: env.EMAIL_PROVIDER, status: 'preview' };
    }

    if (input.previewOnly) {
      return { provider: env.EMAIL_PROVIDER, status: 'preview' };
    }

    if (!env.EMAIL_API_KEY || !env.EMAIL_FROM) {
      throw new Error('Email provider credentials are not configured.');
    }

    throw new Error(
      `${env.EMAIL_PROVIDER} transport is configured as an adapter boundary. Add the provider SDK call after account verification.`,
    );
  }
}

export function getEmailProvider(): EmailProvider {
  const env = getServerEnv();
  if (env.EMAIL_PROVIDER === 'mock') {
    return new MockEmailProvider();
  }

  return new HttpEmailProvider();
}
