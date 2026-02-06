import { z } from 'zod';
import { checkVariantAvailability } from '@/server/verifiers/checkVariantAvailability';

const schema = z
  .object({
    url: z.string().optional(),
    trackerUrl: z.string().optional(),
    product: z.any(),
    rules: z.any()
  })
  .passthrough();

export function CHECK_VARIANT_AVAILABILITY(input: unknown) {
  const parsed = schema.parse(input);

  const url =
    parsed.url ??
    parsed.trackerUrl ??
    parsed.product?.url ??
    parsed.product?.canonicalUrl ??
    parsed.product?.sourceUrl;

  if (!url || typeof url !== 'string') {
    throw new Error('CHECK_VARIANT_AVAILABILITY requires url (input.url/trackerUrl) or product.url');
  }

  return checkVariantAvailability(url, parsed.product, parsed.rules);
}
