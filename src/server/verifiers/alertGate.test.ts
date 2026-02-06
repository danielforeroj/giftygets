import { describe, expect, it, vi } from 'vitest';

vi.mock('@/server/verifiers/dedupeAlert', () => ({ dedupeAlert: vi.fn(async () => ({ ok: true })) }));
vi.mock('@/server/verifiers/rateLimit', () => ({ rateLimitAlert: vi.fn(async () => ({ ok: true })) }));

describe('alertGate', () => {
  it('blocks when buyable is false', async () => {
    const { alertGate } = await import('@/server/verifiers/alertGate');
    const result = await alertGate({ userId: 'u', trackerId: 't', dedupeKey: 'a', buyable: false, variantOk: true, confidence: 0.95 });
    expect(result.ok).toBe(false);
  });
});
