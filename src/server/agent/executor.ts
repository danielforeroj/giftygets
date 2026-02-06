import { prisma } from '@/server/db/prisma';
import { toolRegistry } from '@/server/agent/tools';
import type { AgentPlan } from '@/server/agent/planSchema';

export async function executePlan(plan: AgentPlan, context: Record<string, unknown> & { userId?: string; checkRunId?: string; traceId?: string }) {
  const outputs = new Map<string, unknown>();
  const traceId =
    context.traceId ??
    (context.userId && context.checkRunId
      ? (
          await prisma.agentTrace.create({
            data: { userId: context.userId, checkRunId: context.checkRunId, planJson: plan }
          })
        ).id
      : undefined);

  for (const step of plan.steps) {
    try {
      const tool = (toolRegistry as Record<string, any>)[step.tool];
      if (!tool) throw new Error(`Unknown tool: ${step.tool}`);
      const args = { ...context, ...step.args };
      traceId && (await prisma.toolCall.create({ data: { agentTraceId: traceId, stepId: step.id, tool: step.tool, args } }));
      const result = await tool(args);
      outputs.set(step.id, result);
      traceId && (await prisma.toolResult.create({ data: { agentTraceId: traceId, stepId: step.id, ok: true, data: result } }));
    } catch (error) {
      traceId &&
        (await prisma.toolResult.create({
          data: { agentTraceId: traceId, stepId: step.id, ok: false, error: (error as Error).message }
        }));
      break;
    }
  }

  return { outputs, traceId };
}
