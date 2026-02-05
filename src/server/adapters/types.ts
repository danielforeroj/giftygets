export type TrackerRules = { variantSize?: string; variantColor?: string; priceCapCents?: number };

export type ProductJson = {
  id: string;
  title: string;
  priceCents: number;
  currency: string;
  variants: Array<{ id: string; title: string; available: boolean; size?: string; color?: string }>;
  addToCartUrl?: string;
};

export type VerifyResult = {
  buyable: boolean;
  reasons: string[];
  verifiedFields: {
    price: number;
    currency: string;
    variantId?: string;
    availability: boolean;
    addToCartUrl?: string;
  };
};

export interface Adapter {
  name: string;
  fetch(url: string): Promise<{ text: string; url: string }>;
  extractDeterministic(content: string): ProductJson;
  verifyBuyable(product: ProductJson, rules: TrackerRules): VerifyResult;
  checkVariantAvailability(product: ProductJson, rules: TrackerRules): { ok: boolean; reasons: string[] };
}
