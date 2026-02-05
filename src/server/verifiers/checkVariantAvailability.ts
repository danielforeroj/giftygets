import { getAdapterForUrl } from '@/server/adapters/registry';
import type { ProductJson, TrackerRules } from '@/server/adapters/types';

export function checkVariantAvailability(url: string, product: ProductJson, rules: TrackerRules) {
  return getAdapterForUrl(url).checkVariantAvailability(product, rules);
}
