import { z } from 'zod';
import { computeConfidence } from '@/server/verifiers/computeConfidence';

const schema = z.object({ verified: z.boolean(), matchedRules: z.boolean(), freshnessMinutes: z.number() });

export function COMPUTE_CONFIDENCE(input: unknown) {
  return computeConfidence(schema.parse(input));
}
