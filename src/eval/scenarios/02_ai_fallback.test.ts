import { describe, expect, it } from 'vitest';
import { validatePlanOrFallback } from '@/server/agent/validatePlan';

describe('scenario 2', () => {
  it('fallback runs when plan invalid', () => {
    const result = validatePlanOrFallback({ invalid: true }, 'trk_1');
    expect(result.usedFallback).toBe(true);
    expect(result.plan.steps.length).toBeGreaterThan(0);
  });
});
