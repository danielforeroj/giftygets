import { describe, expect, it } from 'vitest';
import { rateLimitAlert } from '@/server/verifiers/rateLimit';

describe('scenario 4', () => {
  it('rate limit enforced', () => {
    process.env.ALERT_RATE_LIMIT_PER_DAY = '1';
    expect(rateLimitAlert('u1', '2026-01-01').ok).toBe(true);
    expect(rateLimitAlert('u1', '2026-01-01').ok).toBe(false);
  });
});
