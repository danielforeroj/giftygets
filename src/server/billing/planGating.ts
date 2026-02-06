import { prisma } from '@/server/db/prisma';

export type PlanLimits = { maxTrackers: number; maxChecksPerDay: number; planKey: 'BASIC' | 'PRO' };

export async function getPlanLimitsForUser(userId: string): Promise<PlanLimits> {
  const subscription = await prisma.subscription.findFirst({
    where: { userId, status: 'ACTIVE' },
    include: { plan: true },
    orderBy: { updatedAt: 'desc' }
  });

  if (!subscription) return { planKey: 'BASIC', maxTrackers: 0, maxChecksPerDay: 0 };
  return { planKey: subscription.plan.key, maxTrackers: subscription.plan.maxTrackers, maxChecksPerDay: subscription.plan.maxChecksPerDay };
}
