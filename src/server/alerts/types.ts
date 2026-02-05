export type AlertCandidate = {
  userId: string;
  trackerId: string;
  email: string;
  dedupeKey: string;
  title: string;
  buyable: boolean;
  variantOk: boolean;
  confidence: number;
  reasons: string[];
  verifiedPrice: number;
  verifiedAvailability: boolean;
};
