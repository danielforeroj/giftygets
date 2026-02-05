import { runAlertEngine } from '@/server/alerts/alertEngine';
import { validatePlanOrFallback } from '@/server/agent/validatePlan';

export async function runScenario(input: {
  candidate: Parameters<typeof runAlertEngine>[0];
  rawPlan: unknown;
  trackerId: string;
}) {
  const validated = validatePlanOrFallback(input.rawPlan, input.trackerId);
  const alert = await runAlertEngine(input.candidate);
  return { validated, alert };
}
