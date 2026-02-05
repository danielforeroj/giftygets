import { toolRegistry } from '@/server/agent/tools';
import type { AgentPlan } from '@/server/agent/planSchema';
import { TraceRecorder } from '@/server/agent/trace';

export async function executePlan(plan: AgentPlan, context: Record<string, unknown>) {
  const trace = new TraceRecorder();
  const outputs = new Map<string, unknown>();

  for (const step of plan.steps) {
    try {
      const tool = (toolRegistry as Record<string, any>)[step.tool];
      if (!tool) throw new Error(`Unknown tool: ${step.tool}`);
      const args = { ...context, ...step.args };
      const result = await tool(args);
      outputs.set(step.id, result);
      trace.push({ stepId: step.id, tool: step.tool, ok: true, data: result });
    } catch (error) {
      trace.push({ stepId: step.id, tool: step.tool, ok: false, error: (error as Error).message });
      break;
    }
  }

  return { outputs, trace: trace.events };
}
