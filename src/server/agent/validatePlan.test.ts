import { describe, expect, it } from 'vitest';
import { validatePlanOrFallback } from '@/server/agent/validatePlan';

describe('validatePlanOrFallback', () => {
  it('accepts valid plan', () => {
    const result = validatePlanOrFallback(
      {
        goal: 'test',
        trackerId: 't1',
        steps: [{ id: '1', tool: 'FETCH_PAGE', args: {}, dependsOn: [] }],
        policies: { maxSteps: 5, requireVerification: true },
        nextCheckProposal: 300
      },
      't1'
    );
    expect(result.usedFallback).toBe(false);
  });
});
