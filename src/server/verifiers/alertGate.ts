import { dedupeAlert } from '@/server/verifiers/dedupeAlert';
import { rateLimitAlert } from '@/server/verifiers/rateLimit';

export type AlertGateInput = {
  userId: string;
  trackerId: string;
  dedupeKey: string;
  buyable: boolean;
  variantOk: boolean;
  confidence: number;
};

export function alertGate(input: AlertGateInput) {
  const reasons: string[] = [];
  if (!input.buyable) reasons.push('buyable verification failed');
  if (!input.variantOk) reasons.push('variant mismatch');
  if (input.confidence < Number(process.env.CONFIDENCE_MIN ?? 0.85)) reasons.push('confidence below threshold');

  const dedupe = dedupeAlert(input.trackerId, input.dedupeKey);
  if (!dedupe.ok) reasons.push(dedupe.reason);

  const rate = rateLimitAlert(input.userId, new Date().toISOString().slice(0, 10));
  if (!rate.ok) reasons.push(rate.reason);

  return { ok: reasons.length === 0, reasons };
}
