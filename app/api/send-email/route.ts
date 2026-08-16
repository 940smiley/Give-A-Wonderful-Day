import { jsonError, jsonOk, readJsonBody, safeJsonError } from '../../../lib/api';
import { requireApiPermission } from '../../../lib/auth/session';
import { writeAuditLog } from '../../../lib/audit';
import { emailDraftSchema, getEmailProvider } from '../../../lib/email/provider';
import { checkRateLimit, rateLimitKey } from '../../../lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const limit = checkRateLimit(rateLimitKey(request, 'email:send'), {
    limit: 20,
    windowMs: 60_000,
  });
  if (!limit.allowed) {
    return jsonError('Too many email requests.', 429);
  }

  try {
    const user = await requireApiPermission('automation:run');
    const input = await readJsonBody(request, emailDraftSchema, 32_000);
    const result = await getEmailProvider().send(input);
    await writeAuditLog({
      actorId: user.id,
      action: result.status === 'sent' ? 'email.sent' : 'email.previewed',
      entity: 'Communication',
      metadata: { provider: result.provider, status: result.status },
    });
    return jsonOk(result);
  } catch (error) {
    return safeJsonError(
      error,
      error instanceof Error && error.message === 'Unauthorized.' ? 401 : 400,
    );
  }
}
