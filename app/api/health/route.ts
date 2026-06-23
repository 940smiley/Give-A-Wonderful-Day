import { jsonOk, safeJsonError } from '../../../lib/api';
import { getServerEnv } from '../../../lib/env';
import { getPrisma } from '../../../lib/db';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const deep = url.searchParams.get('deep') === 'true';
  const env = getServerEnv();

  const checks = {
    app: 'ok',
    database: process.env.DATABASE_URL ? 'configured' : 'not_configured',
    email: env.EMAIL_PROVIDER,
    ai: env.AI_PROVIDER,
    payments: env.PAYMENT_PROVIDER,
  };

  if (deep && process.env.DATABASE_URL) {
    try {
      await getPrisma().$queryRaw`SELECT 1`;
      return jsonOk({ status: 'ok', checks: { ...checks, database: 'ok' } });
    } catch (error) {
      return safeJsonError(error, 503);
    }
  }

  return jsonOk({ status: 'ok', checks });
}
