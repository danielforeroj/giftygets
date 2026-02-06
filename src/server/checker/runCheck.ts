import { prisma } from '@/server/db/prisma';
import { toPrismaJson } from '@/server/json/toPrismaJson';
import { getAdapterForUrl } from '@/server/adapters/registry';
import { EXTRACT_PRODUCT_JSON } from '@/server/agent/tools/EXTRACT_PRODUCT_JSON';
import { computeConfidence } from '@/server/verifiers/computeConfidence';
import { runAlertEngine } from '@/server/alerts/alertEngine';

export async function runCheck(input: { trackerId: string; userId: string; url: string; rules: { variantSize?: string; variantColor?: string; priceCapCents?: number } }) {
  const checkRun = await prisma.checkRun.create({ data: { userId: input.userId, trackerId: input.trackerId, status: 'RUNNING', startedAt: new Date() } });

  try {
    const adapter = getAdapterForUrl(input.url);
    const fetched = await adapter.fetch(input.url);
    const extracted = await EXTRACT_PRODUCT_JSON({ url: input.url, htmlOrJson: fetched.text });
    const product = extracted.data.product;
    const verify = adapter.verifyBuyable(product, input.rules);
    const variant = adapter.checkVariantAvailability(product, input.rules);
    const confidence = computeConfidence({ verified: verify.buyable, matchedRules: variant.ok, freshnessMinutes: 5 });

    const alert = await runAlertEngine({
      userId: input.userId,
      trackerId: input.trackerId,
      email: product?.merchant ?? 'alerts@example.com',
      dedupeKey: `${product.id ?? product.url ?? input.url}:${product.price ?? 'na'}`,
      buyable: verify.buyable,
      variantOk: variant.ok,
      confidence,
      title: product.title ?? 'Product update',
      reasons: verify.reasons ?? [],
      verifiedPrice: product.price,
      verifiedAvailability: verify.buyable
    });

    await prisma.checkRun.update({ where: { id: checkRun.id }, data: { status: 'SUCCEEDED', finishedAt: new Date(), metadata: toPrismaJson({ alert }) } });

    return { product, verify, variant, confidence, alert };
  } catch (error) {
    await prisma.checkRun.update({ where: { id: checkRun.id }, data: { status: 'FAILED', finishedAt: new Date(), error: (error as Error).message } });
    throw error;
  }
}
