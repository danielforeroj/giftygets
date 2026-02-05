import { Prisma } from '@prisma/client';
import { prisma } from '@/server/db/prisma';

export async function dedupeAlert(trackerId: string, dedupeKey: string, userId: string, checkRunId?: string) {
  try {
    await prisma.alertEvent.create({
      data: {
        userId,
        trackerId,
        checkRunId,
        status: 'NOT_SENT',
        dedupeKey,
        whyNotSent: 'reserved dedupe key'
      }
    });
    return { ok: true };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return { ok: false, reason: 'Duplicate alert in dedupe window' };
    }
    throw error;
  }
}
