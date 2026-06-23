import { z } from 'zod';
import { getServerEnv } from '../env';

export const grantDraftInputSchema = z.object({
  requirements: z.string().min(10).max(20_000),
  orgProfile: z.record(z.string(), z.unknown()).default({}),
});

export const donorEmailInputSchema = z.object({
  donor: z.object({
    name: z.string().min(1).max(120).optional(),
    email: z.string().email().optional(),
  }),
  donationInfo: z.record(z.string(), z.unknown()).default({}),
});

export const impactReportInputSchema = z.object({
  onChainData: z.record(z.string(), z.unknown()).default({}),
  offChainData: z.record(z.string(), z.unknown()).default({}),
});

export type GrantDraftInput = z.infer<typeof grantDraftInputSchema>;
export type DonorEmailInput = z.infer<typeof donorEmailInputSchema>;
export type ImpactReportInput = z.infer<typeof impactReportInputSchema>;

export type DraftMetadata = {
  provider: string;
  model: string;
  generatedAt: string;
  requiresHumanApproval: true;
};

export type GrantDraft = {
  draft: string;
  metadata: DraftMetadata;
};

export type DonorEmailDraft = {
  subject: string;
  body: string;
  metadata: DraftMetadata;
};

export type ImpactReportDraft = {
  report: string;
  metadata: DraftMetadata;
};

export interface AiProvider {
  generateGrantDraft(input: GrantDraftInput): Promise<GrantDraft>;
  generateDonorEmail(input: DonorEmailInput): Promise<DonorEmailDraft>;
  generateImpactReport(input: ImpactReportInput): Promise<ImpactReportDraft>;
}

function metadata(provider: string): DraftMetadata {
  return {
    provider,
    model: getServerEnv().AI_MODEL,
    generatedAt: new Date().toISOString(),
    requiresHumanApproval: true,
  };
}

class MockAiProvider implements AiProvider {
  async generateGrantDraft(input: GrantDraftInput): Promise<GrantDraft> {
    const orgName =
      typeof input.orgProfile.name === 'string' ? input.orgProfile.name : 'the organization';
    return {
      draft:
        `Draft grant response for ${orgName}.\n\n` +
        `External requirements summary:\n${input.requirements}\n\n` +
        'Staff must verify eligibility, legal claims, budget details, and submission requirements before use.',
      metadata: metadata('mock'),
    };
  }

  async generateDonorEmail(input: DonorEmailInput): Promise<DonorEmailDraft> {
    const name = input.donor.name ?? 'there';
    return {
      subject: 'Thank you for supporting Give-A-Wonderful-Day',
      body:
        `Dear ${name},\n\n` +
        'Thank you for your support. This is a staff-review draft and must be approved before sending.\n\n' +
        'With gratitude,\nGive-A-Wonderful-Day',
      metadata: metadata('mock'),
    };
  }

  async generateImpactReport(input: ImpactReportInput): Promise<ImpactReportDraft> {
    return {
      report:
        'Draft impact report.\n\n' +
        `On-chain source data: ${JSON.stringify(input.onChainData)}\n` +
        `Off-chain source data: ${JSON.stringify(input.offChainData)}\n\n` +
        'Staff must verify outcomes, privacy approvals, and all public claims before publishing.',
      metadata: metadata('mock'),
    };
  }
}

class HttpJsonAiProvider extends MockAiProvider {
  async generateGrantDraft(input: GrantDraftInput): Promise<GrantDraft> {
    return this.request<GrantDraft>('grant-draft', input);
  }

  async generateDonorEmail(input: DonorEmailInput): Promise<DonorEmailDraft> {
    return this.request<DonorEmailDraft>('donor-email', input);
  }

  async generateImpactReport(input: ImpactReportInput): Promise<ImpactReportDraft> {
    return this.request<ImpactReportDraft>('impact-report', input);
  }

  private async request<T>(task: string, input: unknown): Promise<T> {
    const env = getServerEnv();
    if (!env.AI_BASE_URL || !env.AI_API_KEY) {
      throw new Error('AI provider credentials are not configured.');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), env.AI_TIMEOUT_MS);

    try {
      const response = await fetch(env.AI_BASE_URL, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          authorization: `Bearer ${env.AI_API_KEY}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          task,
          model: env.AI_MODEL,
          trustedInstructions:
            'Create a draft only. Never approve, send, submit, publish, authorize expenses, or make legal/tax claims.',
          untrustedInput: input,
        }),
      });

      if (!response.ok) {
        throw new Error('AI provider request failed.');
      }

      return (await response.json()) as T;
    } finally {
      clearTimeout(timeout);
    }
  }
}

export function getAiProvider(): AiProvider {
  const env = getServerEnv();
  if (env.AI_PROVIDER === 'http-json') {
    return new HttpJsonAiProvider();
  }

  return new MockAiProvider();
}
