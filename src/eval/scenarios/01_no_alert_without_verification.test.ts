import { describe, expect, it } from 'vitest';
import { runScenario } from '@/eval/harness';

describe('scenario 1', () => {
  it('does not send without deterministic verification', async () => {
    const result = await runScenario({
      trackerId: 'trk_1',
      rawPlan: {},
      candidate: {
        userId: 'u1',
        trackerId: 't1',
        email: 'a@b.com',
        dedupeKey: 'k1',
        title: 'Alert',
        buyable: false,
        variantOk: true,
        confidence: 0.99,
        reasons: ['not buyable'],
        verifiedPrice: 100,
        verifiedAvailability: false
      }
    });
    expect(result.alert.status).toBe('NOT_SENT');
  });
});
