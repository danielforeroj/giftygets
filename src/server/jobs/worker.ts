import { prisma } from '@/server/db/prisma';
import { runCheck } from '@/server/checker/runCheck';
import { createBoss } from '@/server/jobs/boss';
import { JOB_TYPES } from '@/server/jobs/jobTypes';
import { scheduleClamp } from '@/server/checker/scheduleClamp';

async function enqueueDueTrackers(boss: ReturnType<typeof createBoss>) {
  const due = await prisma.tracker.findMany({
    where: {
      status: 'ACTIVE',
      OR: [{ nextRunAt: null }, { nextRunAt: { lte: new Date() } }]
    },
    include: { user: { include: { subscriptions: true } }, rules: true }
  });

  for (const tracker of due) {
    const activeSub = tracker.user.subscriptions.some((s) => s.status === 'ACTIVE');
    if (!activeSub) continue;

    const nextRunAt = new Date(Date.now() + scheduleClamp(3600) * 1000);
    await prisma.tracker.update({ where: { id: tracker.id }, data: { nextRunAt, lastRunAt: new Date() } });

    await boss.send(JOB_TYPES.CHECK_TRACKER, {
      trackerId: tracker.id,
      userId: tracker.userId,
      url: tracker.url,
      rules: tracker.rules[0] ?? {}
    });
  }
}

async function main() {
  const boss = createBoss();
  await boss.start();

  setInterval(() => {
    enqueueDueTrackers(boss).catch((error) => console.error('scheduler loop failed', error));
  }, 60_000);

  await boss.work(JOB_TYPES.CHECK_TRACKER, { teamSize: Number(process.env.JOBS_CONCURRENCY ?? 10) }, async (job) => {
    const payload = job.data as { trackerId: string; userId: string; url: string; rules: any };
    await runCheck(payload);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
