const sentKeys = new Set<string>();

export function dedupeAlert(trackerId: string, dedupeKey: string) {
  const key = `${trackerId}:${dedupeKey}`;
  if (sentKeys.has(key)) return { ok: false, reason: 'Duplicate alert in dedupe window' };
  sentKeys.add(key);
  return { ok: true };
}
