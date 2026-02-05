import { z } from 'zod';
import { checkVariantAvailability } from '@/server/verifiers/checkVariantAvailability';

const schema = z.object({ product: z.any(), rules: z.any() });

export function CHECK_VARIANT_AVAILABILITY(input: unknown) {
  const parsed = schema.parse(input);
  return checkVariantAvailability(parsed.product, parsed.rules);
}
