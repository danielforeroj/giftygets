import { safeFetch } from '@/server/http/safeFetch';
import type { Adapter, ProductJson, TrackerRules } from '@/server/adapters/types';

function parseProduct(content: string): ProductJson {
  const parsed = JSON.parse(content);
  return {
    id: String(parsed.id),
    title: parsed.title,
    priceCents: Number(parsed.variants?.[0]?.price ?? parsed.price ?? 0),
    currency: parsed.currency ?? 'USD',
    variants: (parsed.variants ?? []).map((variant: any) => ({
      id: String(variant.id),
      title: String(variant.title ?? ''),
      available: Boolean(variant.available),
      size: variant.option1,
      color: variant.option2
    })),
    addToCartUrl: parsed.handle ? `/cart/add?id=${parsed.variants?.[0]?.id}` : undefined
  };
}

function variantMatch(product: ProductJson, rules: TrackerRules) {
  return product.variants.find((variant) => {
    const sizeOk = !rules.variantSize || variant.size === rules.variantSize;
    const colorOk = !rules.variantColor || variant.color === rules.variantColor;
    return sizeOk && colorOk;
  });
}

export const shopifyGenericAdapter: Adapter = {
  name: 'ShopifyGenericAdapter',
  async fetch(url) {
    const response = await safeFetch(url.endsWith('.js') ? url : `${url.replace(/\/$/, '')}.js`);
    return { text: response.text, url: response.url };
  },
  extractDeterministic: parseProduct,
  verifyBuyable(product, rules) {
    const variant = variantMatch(product, rules);
    const availability = Boolean(variant?.available);
    const priceOk = !rules.priceCapCents || product.priceCents <= rules.priceCapCents;
    const buyable = availability && priceOk;
    return {
      buyable,
      reasons: [availability ? 'variant available' : 'variant unavailable', priceOk ? 'within price cap' : 'above price cap'],
      verifiedFields: {
        price: product.priceCents,
        currency: product.currency,
        variantId: variant?.id,
        availability,
        addToCartUrl: product.addToCartUrl
      }
    };
  },
  checkVariantAvailability(product, rules) {
    const variant = variantMatch(product, rules);
    if (!variant) return { ok: false, reasons: ['No matching variant'] };
    if (!variant.available) return { ok: false, reasons: ['Matching variant is sold out'] };
    return { ok: true, reasons: ['Matching variant is available'] };
  }
};
