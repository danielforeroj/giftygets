import { describe, expect, it } from 'vitest';
import { dedupeAlert } from '@/server/verifiers/dedupeAlert';

describe('scenario 3', () => {
  it('dedupe prevents repeats', () => {
    expect(dedupeAlert('t1', 'k1').ok).toBe(true);
    expect(dedupeAlert('t1', 'k1').ok).toBe(false);
  });
});
