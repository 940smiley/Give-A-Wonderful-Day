import { z } from 'zod';
import { jsonError, jsonOk, readJsonBody, safeJsonError } from '../../../lib/api';
import { requireApiPermission } from '../../../lib/auth/session';
import { writeAuditLog } from '../../../lib/audit';
import { fetchGrantPage } from '../../../lib/scraping/grant-fetcher';
import { checkRateLimit, rateLimitKey } from '../../../lib/rate-limit';

export const runtime = 'nodejs';

const scrapeSchema = z.object({
  url: z.string().url(),
});

export async function POST(request: Request) {
  const limit = checkRateLimit(rateLimitKey(request, 'scrape'), { limit: 20, windowMs: 60_000 });
  if (!limit.allowed) {
    return jsonError('Too many grant retrieval requests.', 429);
  }

  try {
    const user = await requireApiPermission('automation:run');
    const input = await readJsonBody(request, scrapeSchema, 4_000);
    const result = await fetchGrantPage(input.url);
    await writeAuditLog({
      actorId: user.id,
      action: 'grant.scrape',
      entity: 'Grant',
      metadata: { url: result.url, finalUrl: result.finalUrl },
    });
    return jsonOk(result);
  } catch (error) {
    return safeJsonError(
      error,
      error instanceof Error && error.message === 'Unauthorized.' ? 401 : 400,
    );
  }
}
