const profiles = new Map<string, { score: number; tags: string[] }>();

export function updateIntentProfile(userId: string, feedback: { type: string; category?: string }) {
  const current = profiles.get(userId) ?? { score: 0, tags: [] };
  const delta = feedback.type === 'LIKE' ? 0.1 : -0.05;
  const score = Math.max(0, Math.min(1, current.score * 0.95 + delta));
  const tags = feedback.category ? Array.from(new Set([...current.tags, feedback.category])).slice(0, 10) : current.tags;
  const next = { score, tags };
  profiles.set(userId, next);
  return next;
}
