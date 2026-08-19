import { PrismaClient } from '@prisma/client';

// Attach to globalThis in development so Next.js hot reload does not create
// multiple PrismaClient instances that exhaust the connection pool.
// In production modules are only evaluated once, so this is a no-op there.
const globalForPrisma = globalThis as unknown as { _prisma?: PrismaClient };

export function getPrisma(): PrismaClient {
  if (!globalForPrisma._prisma) {
    globalForPrisma._prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    });
  }

  return globalForPrisma._prisma;
}
