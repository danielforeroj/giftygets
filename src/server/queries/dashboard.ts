import { prisma } from '@/server/db/prisma';

export async function getDashboardStats(userId: string) {
  const activeTrackers = await prisma.tracker.count({ where: { userId, status: 'ACTIVE' } });

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const alertsSentToday = await prisma.alertEvent.count({
    where: { userId, status: 'SENT', createdAt: { gte: startOfDay } }
  });

  return {
    activeTrackers,
    alertsSentToday,
    avgConfidence: null as number | null
  };
}

export async function getRecentAlerts(userId: string) {
  return prisma.alertEvent.findMany({
    where: { userId },
    include: { tracker: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
    take: 10
  });
}

export async function getRecentTrackers(userId: string) {
  return prisma.tracker.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 10 });
}
