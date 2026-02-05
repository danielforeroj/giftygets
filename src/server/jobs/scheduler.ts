import { schedulePolicy } from '@/server/checker/schedulePolicy';

export function nextRunFromTier(tier: string) {
  const seconds = schedulePolicy(tier);
  return new Date(Date.now() + seconds * 1000);
}
