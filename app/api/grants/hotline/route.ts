import { z } from 'zod';
import { jsonError, jsonOk, readJsonBody, safeJsonError } from '../../../../lib/api';
import { requireApiPermission } from '../../../../lib/auth/session';
import { writeAuditLog } from '../../../../lib/audit';
import { getPrisma } from '../../../../lib/db';
import { checkRateLimit, rateLimitKey } from '../../../../lib/rate-limit';

export const runtime = 'nodejs';

const hotlineGrantSchema = z.object({
  nomineeName: z.string().min(2).max(120),
  city: z.string().min(2).max(120),
  state: z.string().min(2).max(80),
  reason: z.string().min(40).max(2_500),
  privacyAcknowledged: z.boolean().refine(val => val === true, {
    message: "Privacy acknowledgment is required."
  }),
});

export async function POST(request: Request) {
  const limit = checkRateLimit(rateLimitKey(request, 'hotline:grant'), {
    limit: 10,
    windowMs: 60_000,
  });
  
  if (!limit.allowed) {
    return jsonError('Too many hotline grant requests.', 429);
  }

  try {
    const user = await requireApiPermission('nomination:review'); // Ensure agent has review rights
    const input = await readJsonBody(request, hotlineGrantSchema, 4_000);

    const prisma = getPrisma();

    // Directly create an APPROVED nomination of type HOTLINE_GRANT
    const nomination = await prisma.nomination.create({
      data: {
        nomineeName: input.nomineeName,
        city: input.city,
        state: input.state,
        reason: input.reason,
        nominatorName: user.name ?? 'Hotline Agent',
        nominatorEmail: user.email ?? 'agent@giveawonderfulday.org',
        type: 'HOTLINE_GRANT',
        status: 'APPROVED', 
        reviewedById: user.id,
        reviewedAt: new Date(),
      },
    });

    await writeAuditLog({
      actorId: user.id,
      action: 'grant.hotline_submitted',
      entity: 'Nomination',
      entityId: nomination.id,
      metadata: { city: input.city, state: input.state },
    });

    return jsonOk({ success: true, nominationId: nomination.id });
  } catch (error) {
    return safeJsonError(
      error,
      error instanceof Error && error.message === 'Unauthorized.' ? 401 : 400,
    );
  }
}
