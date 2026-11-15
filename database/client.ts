import { PrismaClient } from '@prisma/client';

// Declare global variable to preserve client across hot-reloads in development
declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

/**
 * Singleton instance of PrismaClient for PostgreSQL.
 * Ensures connection pooling is reused efficiently in server environments.
 */
export const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
