import { describe, expect, it } from 'vitest';
import { backoffPolicy } from '@/server/checker/backoffPolicy';

describe('scenario 5', () => {
  it('backoff increases on failures', () => {
    expect(backoffPolicy(1)).toBeLessThan(backoffPolicy(3));
  });
});
