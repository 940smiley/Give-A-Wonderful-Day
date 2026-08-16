import { jsonError, jsonOk, readJsonBody, safeJsonError } from '../../../../lib/api';
import { requireApiPermission } from '../../../../lib/auth/session';
import { writeAuditLog } from '../../../../lib/audit';
import { donorEmailInputSchema, getAiProvider } from '../../../../lib/ai/provider';
import { checkRateLimit, rateLimitKey } from '../../../../lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const limit = checkRateLimit(rateLimitKey(request, 'ai:donor-email'), {
    limit: 30,
    windowMs: 60_000,
  });
  if (!limit.allowed) {
    return jsonError('Too many AI draft requests.', 429);
  }

  try {
    const user = await requireApiPermission('automation:run');
    const input = await readJsonBody(request, donorEmailInputSchema, 32_000);
    const draft = await getAiProvider().generateDonorEmail(input);
    await writeAuditLog({
      actorId: user.id,
      action: 'ai.donor_email_draft_created',
      entity: 'Communication',
      metadata: { provider: draft.metadata.provider, model: draft.metadata.model },
    });
    return jsonOk(draft);
  } catch (error) {
    return safeJsonError(
      error,
      error instanceof Error && error.message === 'Unauthorized.' ? 401 : 400,
    );
  }
}
