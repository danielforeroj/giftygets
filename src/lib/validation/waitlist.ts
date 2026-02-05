import { z } from 'zod';

export const waitlistSchema = z.object({
  email: z.string().email(),
  intentTags: z.array(z.string()).default([]),
  company: z.string().optional().default('')
});
