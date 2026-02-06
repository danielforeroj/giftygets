import type Stripe from 'stripe';
import { prisma } from '@/server/db/prisma';

export function mapSubscriptionStatus(status: Stripe.Subscription.Status) {
  if (status === 'active' || status === 'trialing') return 'ACTIVE' as const;
  if (status === 'past_due' || status === 'unpaid') return 'PAST_DUE' as const;
  return 'CANCELED' as const;
}

export async function ensurePlanByPriceId(priceId?: string | null) {
  if (!priceId) return null;
  const key = priceId === process.env.STRIPE_PRICE_PRO ? 'PRO' : 'BASIC';
  return prisma.plan.upsert({
    where: { key },
    create: { key, name: key === 'PRO' ? 'Pro' : 'Basic', monthlyPriceCents: key === 'PRO' ? 2900 : 900, maxTrackers: key === 'PRO' ? 50 : 5, maxChecksPerDay: key === 'PRO' ? 1200 : 120 },
    update: {}
  });
}
