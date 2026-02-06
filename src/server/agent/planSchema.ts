import { z } from 'zod';
import { ALLOWED_TOOLS } from '@/server/agent/types';

const JsonValue: z.ZodType<any> = z.lazy(() =>
  z.union([z.string(), z.number(), z.boolean(), z.null(), z.array(JsonValue), z.record(JsonValue)])
);

export const planSchema = z.object({
  goal: z.string(),
  trackerId: z.string(),
  steps: z
    .array(
      z.object({
        id: z.string(),
        tool: z.enum(ALLOWED_TOOLS),
        args: z.record(JsonValue),
        dependsOn: z.array(z.string()).default([])
      })
    )
    .max(12),
  policies: z.object({ maxSteps: z.number().int().max(12), requireVerification: z.boolean() }),
  nextCheckProposal: z.number().int().positive()
});

export type AgentPlan = z.infer<typeof planSchema>;
