import { z } from 'zod';
import { dedupeAlert } from '@/server/verifiers/dedupeAlert';

const schema = z.object({ trackerId: z.string(), dedupeKey: z.string(), userId: z.string() });

export async function DEDUPE_ALERT(input: unknown) {
  const parsed = schema.parse(input);
  return dedupeAlert(parsed.trackerId, parsed.dedupeKey, parsed.userId);
}
