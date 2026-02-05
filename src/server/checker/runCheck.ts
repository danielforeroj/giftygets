import { getAdapterForUrl } from '@/server/adapters/registry';
import { EXTRACT_PRODUCT_JSON } from '@/server/agent/tools/EXTRACT_PRODUCT_JSON';
import { computeConfidence } from '@/server/verifiers/computeConfidence';

export async function runCheck(input: { url: string; rules: { variantSize?: string; variantColor?: string; priceCapCents?: number } }) {
  const adapter = getAdapterForUrl(input.url);
  const fetched = await adapter.fetch(input.url);
  const extracted = await EXTRACT_PRODUCT_JSON({ url: input.url, htmlOrJson: fetched.text });
  const product = extracted.data.product;
  const verify = adapter.verifyBuyable(product, input.rules);
  const variant = adapter.checkVariantAvailability(product, input.rules);
  const confidence = computeConfidence({ verified: verify.buyable, matchedRules: variant.ok, freshnessMinutes: 5 });
  return { product, verify, variant, confidence };
}
