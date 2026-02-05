const daily = new Map<string, number>();

export function rateLimitAlert(userId: string, dayKey: string) {
  const max = Number(process.env.ALERT_RATE_LIMIT_PER_DAY ?? 5);
  const key = `${userId}:${dayKey}`;
  const count = daily.get(key) ?? 0;
  if (count >= max) return { ok: false, reason: 'Rate limit reached' };
  daily.set(key, count + 1);
  return { ok: true };
}
