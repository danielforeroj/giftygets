import { describe, expect, it } from 'vitest';
import { alertGate } from '@/server/verifiers/alertGate';

describe('alertGate', () => {
  it('blocks when buyable is false', () => {
    const result = alertGate({ userId: 'u', trackerId: 't', dedupeKey: 'a', buyable: false, variantOk: true, confidence: 0.95 });
    expect(result.ok).toBe(false);
  });
});
