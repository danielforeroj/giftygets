export function schedulePolicy(tier: string) {
  if (tier === 'pro') return 15 * 60;
  if (tier === 'daily') return 24 * 60 * 60;
  return 60 * 60;
}
