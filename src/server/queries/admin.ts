import { prisma } from '@/server/db/prisma';

export async function getRecentCheckRuns() {
  return prisma.checkRun.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { tracker: { select: { name: true } }, traces: true }
  });
}

export async function getCheckTrace(checkRunId: string) {
  return prisma.agentTrace.findFirst({
    where: { checkRunId },
    include: { toolCalls: { orderBy: { createdAt: 'asc' } }, toolResults: { orderBy: { createdAt: 'asc' } }, checkRun: true }
  });
}

export async function getAdapterHealthRows() {
  return prisma.adapterHealth.findMany({ orderBy: { updatedAt: 'desc' } });
}
