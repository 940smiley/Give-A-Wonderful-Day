import { jsonError, jsonOk, readJsonBody, safeJsonError } from '../../../../lib/api';
import { requireApiPermission } from '../../../../lib/auth/session';
import { writeAuditLog } from '../../../../lib/audit';
import { getAiProvider, impactReportInputSchema } from '../../../../lib/ai/provider';
import { checkRateLimit, rateLimitKey } from '../../../../lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const limit = checkRateLimit(rateLimitKey(request, 'ai:impact-report'), {
    limit: 30,
    windowMs: 60_000,
  });
  if (!limit.allowed) {
    return jsonError('Too many AI draft requests.', 429);
  }

  try {
    const user = await requireApiPermission('automation:run');
    const input = await readJsonBody(request, impactReportInputSchema, 32_000);
    const draft = await getAiProvider().generateImpactReport(input);
    await writeAuditLog({
      actorId: user.id,
      action: 'ai.impact_report_draft_created',
      entity: 'ImpactReport',
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
