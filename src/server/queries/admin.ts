import { prisma } from '@/server/db/prisma';

export type AdapterHealthRow = {
  id: string;
  domain: string;
  lastSuccessAt: Date | null;
  lastFailureAt: Date | null;
  failureCount: number;
  backoffUntil: Date | null;
  updatedAt: Date;
};

export async function getAdapterHealthRows(): Promise<AdapterHealthRow[]> {
  const rows = await prisma.adapterHealth.findMany({ orderBy: { updatedAt: 'desc' } });
  // Prisma returns Dates already; this cast is safe and prevents any[] inference in strict builds.
  return rows as AdapterHealthRow[];
}
