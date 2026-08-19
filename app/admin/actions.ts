'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getPrisma } from '../../lib/db';
import { requirePagePermission } from '../../lib/auth/session';
import { writeAuditLog } from '../../lib/audit';

const updateNominationSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['UNDER_REVIEW', 'APPROVED', 'REJECTED', 'RECIPIENT_CREATED']),
});

export async function updateNominationStatus(formData: FormData): Promise<void> {
  const user = await requirePagePermission('nomination:review');
  const parsed = updateNominationSchema.parse(Object.fromEntries(formData.entries()));

  if (!process.env.DATABASE_URL) {
    return;
  }

  await getPrisma().nomination.update({
    where: { id: parsed.id },
    data: {
      status: parsed.status,
      reviewedAt: new Date(),
      reviewedById: user.id,
    },
  });

  await writeAuditLog({
    actorId: user.id,
    action: 'nomination.status_updated',
    entity: 'Nomination',
    entityId: parsed.id,
    metadata: { status: parsed.status },
  });

  revalidatePath('/admin/nominations');
}
