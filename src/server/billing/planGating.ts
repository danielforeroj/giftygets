export type PlanLimits = { maxTrackers: number; maxChecksPerDay: number };

const plans: Record<string, PlanLimits> = {
  BASIC: { maxTrackers: 5, maxChecksPerDay: 120 },
  PRO: { maxTrackers: 50, maxChecksPerDay: 1200 }
};

export function getPlanLimits(plan: string | undefined): PlanLimits {
  return plans[plan ?? 'BASIC'] ?? plans.BASIC;
}
