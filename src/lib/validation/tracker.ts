import { z } from 'zod';

export const trackerSchema = z.object({
  name: z.string().min(2),
  url: z.string().url(),
  frequencyTier: z.enum(['hourly', 'daily']).default('hourly'),
  variantSize: z.string().optional(),
  variantColor: z.string().optional(),
  priceCapCents: z.number().int().positive().optional()
});

export type TrackerInput = z.infer<typeof trackerSchema>;
