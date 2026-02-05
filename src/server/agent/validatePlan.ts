import { planSchema, type AgentPlan } from '@/server/agent/planSchema';

export function validatePlanOrFallback(raw: unknown, trackerId: string): { plan: AgentPlan; usedFallback: boolean } {
  const parsed = planSchema.safeParse(raw);
  if (parsed.success) return { plan: parsed.data, usedFallback: false };

  return {
    usedFallback: true,
    plan: {
      goal: 'Fallback deterministic verification path',
      trackerId,
      steps: [
        { id: '1', tool: 'FETCH_PAGE', args: {}, dependsOn: [] },
        { id: '2', tool: 'EXTRACT_PRODUCT_JSON', args: {}, dependsOn: ['1'] },
        { id: '3', tool: 'CHECK_VARIANT_AVAILABILITY', args: {}, dependsOn: ['2'] },
        { id: '4', tool: 'COMPUTE_CONFIDENCE', args: {}, dependsOn: ['3'] },
        { id: '5', tool: 'DEDUPE_ALERT', args: {}, dependsOn: ['4'] }
      ],
      policies: { maxSteps: 5, requireVerification: true },
      nextCheckProposal: 3600
    }
  };
}
