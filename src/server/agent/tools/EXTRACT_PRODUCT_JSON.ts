import { productSchema } from '@/server/product/productSchema';
import { getAdapterForUrl } from '@/server/adapters/registry';

export async function EXTRACT_PRODUCT_JSON(input: { url: string; htmlOrJson: string; aiResult?: unknown }) {
  const adapter = getAdapterForUrl(input.url);
  const aiParsed = productSchema.safeParse(input.aiResult);
  if (aiParsed.success) return { ok: true, data: { product: aiParsed.data, source: 'ai' } };

  const product = adapter.extractDeterministic(input.htmlOrJson);
  const deterministicParsed = productSchema.parse(product);
  return { ok: true, data: { product: deterministicParsed, source: 'deterministic_fallback' } };
}
