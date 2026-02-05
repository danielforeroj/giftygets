import { createBoss } from '@/server/jobs/boss';
import { JOB_TYPES } from '@/server/jobs/jobTypes';
import { runCheck } from '@/server/checker/runCheck';

async function main() {
  const boss = createBoss();
  await boss.start();
  await boss.work(JOB_TYPES.CHECK_TRACKER, { teamSize: Number(process.env.JOBS_CONCURRENCY ?? 10) }, async (job) => {
    const payload = job.data as { url: string; rules: any };
    await runCheck(payload);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
