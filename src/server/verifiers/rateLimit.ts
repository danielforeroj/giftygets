import { prisma } from '@/server/db/prisma';

export async function rateLimitAlert(userId: string, trackerId: string, dayKey: string) {
  const max = Number(process.env.ALERT_RATE_LIMIT_PER_DAY ?? 5);
  const key = `alerts:${trackerId}`;

  const ledger = await prisma.rateLimitLedger.upsert({
    where: { userId_key_bucket: { userId, key, bucket: dayKey } },
    create: { userId, trackerId, key, bucket: dayKey, count: 1 },
    update: { count: { increment: 1 } }
  });

  if (ledger.count > max) {
    return { ok: false, reason: 'Rate limit reached', count: ledger.count };
  }

  return { ok: true, count: ledger.count };
}
