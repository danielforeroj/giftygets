import { z } from 'zod';
import { ALLOWED_TOOLS } from '@/server/agent/types';

export const planSchema = z.object({
  goal: z.string(),
  trackerId: z.string(),
  steps: z
    .array(
      z.object({
        id: z.string(),
        tool: z.enum(ALLOWED_TOOLS),
        args: z.record(z.unknown()),
        dependsOn: z.array(z.string()).default([])
      })
    )
    .max(12),
  policies: z.object({ maxSteps: z.number().int().max(12), requireVerification: z.boolean() }),
  nextCheckProposal: z.number().int().positive()
});

export type AgentPlan = z.infer<typeof planSchema>;
