import { z } from 'zod';

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  priceCents: z.number().int().nonnegative(),
  currency: z.string(),
  variants: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      available: z.boolean(),
      size: z.string().optional(),
      color: z.string().optional()
    })
  ),
  addToCartUrl: z.string().optional()
});
