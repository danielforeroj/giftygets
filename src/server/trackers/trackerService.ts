import { normalizedDomain } from '@/lib/url/normalize';
import { trackerSchema } from '@/lib/validation/tracker';
import { isDomainAllowed } from '@/server/policy/domainAllowlist';

const inMemory: Record<string, any> = {};

export function listTrackers(userId: string) {
  return Object.values(inMemory).filter((tracker: any) => tracker.userId === userId);
}

export function getTracker(id: string) {
  return inMemory[id] ?? null;
}

export function createTracker(userId: string, payload: unknown) {
  const input = trackerSchema.parse(payload);
  if (!isDomainAllowed(input.url)) throw new Error('Domain not allowed.');

  const id = `trk_${Math.random().toString(36).slice(2, 8)}`;
  inMemory[id] = { id, userId, ...input, normalizedDomain: normalizedDomain(input.url) };
  return inMemory[id];
}

export function updateTracker(id: string, userId: string, payload: unknown) {
  const existing = inMemory[id];
  if (!existing || existing.userId !== userId) throw new Error('Not found');
  const input = trackerSchema.partial().parse(payload);
  inMemory[id] = { ...existing, ...input };
  return inMemory[id];
}

export function deleteTracker(id: string, userId: string) {
  const existing = inMemory[id];
  if (!existing || existing.userId !== userId) throw new Error('Not found');
  delete inMemory[id];
  return { ok: true };
}
