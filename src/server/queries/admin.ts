import { prisma } from '@/server/db/prisma';
import type { Prisma } from '@prisma/client';

export type AdapterHealthRow = Prisma.AdapterHealthGetPayload<{}>;

export type RecentCheckRunRow = Prisma.CheckRunGetPayload<{
  include: {
    tracker: { select: { name: true } };
    traces: true;
  };
}>;

export type CheckTraceRow = Prisma.AgentTraceGetPayload<{
  include: {
    toolCalls: true;
    toolResults: true;
    checkRun: true;
  };
}>;

export async function getRecentCheckRuns(): Promise<RecentCheckRunRow[]> {
  return prisma.checkRun.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { tracker: { select: { name: true } }, traces: true }
  });
}

export async function getCheckTrace(checkRunId: string): Promise<CheckTraceRow | null> {
  return prisma.agentTrace.findFirst({
    where: { checkRunId },
    include: {
      toolCalls: { orderBy: { createdAt: 'asc' } },
      toolResults: { orderBy: { createdAt: 'asc' } },
      checkRun: true
    }
  });
}

export async function getAdapterHealthRows(): Promise<AdapterHealthRow[]> {
  return prisma.adapterHealth.findMany({ orderBy: { updatedAt: 'desc' } });
}
