import { Prisma } from '@prisma/client';
import { getPrisma } from './db';

type AuditInput = {
  actorId?: string;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
};

export async function writeAuditLog(input: AuditInput): Promise<void> {
  if (!process.env.DATABASE_URL) {
    return;
  }

  await getPrisma().auditLog.create({
    data: {
      actorId: input.actorId,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId,
      metadata: input.metadata as Prisma.InputJsonValue | undefined,
      ipAddress: input.ipAddress,
    },
  });
}
