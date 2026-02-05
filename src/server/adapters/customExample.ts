import { safeFetch } from '@/server/http/safeFetch';
import type { Adapter } from '@/server/adapters/types';

export const customExampleAdapter: Adapter = {
  name: 'CustomExampleAdapter',
  async fetch(url) {
    const response = await safeFetch(url);
    return { text: response.text, url: response.url };
  },
  extractDeterministic(content) {
    return {
      id: 'custom-product',
      title: 'Custom Product',
      priceCents: 0,
      currency: 'USD',
      variants: [{ id: 'default', title: 'Default', available: false }]
    };
  },
  verifyBuyable(product) {
    return {
      buyable: false,
      reasons: ['Custom adapter skeleton: no deterministic verifier configured'],
      verifiedFields: {
        price: product.priceCents,
        currency: product.currency,
        availability: false
      }
    };
  },
  checkVariantAvailability() {
    return { ok: false, reasons: ['Custom adapter skeleton'] };
  }
};
