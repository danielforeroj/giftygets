import { customExampleAdapter } from '@/server/adapters/customExample';
import { shopifyGenericAdapter } from '@/server/adapters/shopifyGeneric';
import type { Adapter } from '@/server/adapters/types';

export function getAdapterForUrl(url: string): Adapter {
  if (url.includes('myshopify.com')) return shopifyGenericAdapter;
  return customExampleAdapter;
}
