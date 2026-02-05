const counters = new Map<string, { count: number; windowStart: number }>();

export function checkRateLimit(key: string, maxPerHour: number) {
  const now = Date.now();
  const existing = counters.get(key);
  if (!existing || now - existing.windowStart > 3_600_000) {
    counters.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: maxPerHour - 1 };
  }
  if (existing.count >= maxPerHour) return { allowed: false, remaining: 0 };
  existing.count += 1;
  counters.set(key, existing);
  return { allowed: true, remaining: maxPerHour - existing.count };
}
