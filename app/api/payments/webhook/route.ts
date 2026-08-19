import { jsonError, jsonOk, safeJsonError } from '../../../../lib/api';
import { writeAuditLog } from '../../../../lib/audit';
import { getTraditionalDonationProvider } from '../../../../lib/payments/traditional';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const length = request.headers.get('content-length');
    if (length && Number(length) > 64_000) {
      return jsonError('Webhook payload is too large.', 413);
    }

    const rawBody = await request.text();
    const signature =
      request.headers.get('stripe-signature') ||
      request.headers.get('paypal-transmission-sig') ||
      request.headers.get('x-provider-signature');

    const valid = await getTraditionalDonationProvider().verifyWebhook(rawBody, signature);
    if (!valid) {
      return jsonError('Invalid webhook signature.', 401);
    }

    await writeAuditLog({
      action: 'payment.webhook_received',
      entity: 'Donation',
      metadata: { length: rawBody.length },
    });

    return jsonOk({ received: true });
  } catch (error) {
    return safeJsonError(error, 400);
  }
}
