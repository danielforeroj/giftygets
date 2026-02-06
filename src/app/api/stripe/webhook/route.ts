import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { prisma } from '@/server/db/prisma';
import { stripe } from '@/server/billing/stripeClient';
import { ensurePlanByPriceId, mapSubscriptionStatus } from '@/server/billing/webhookHandlers';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'missing signature' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET ?? '');
  } catch {
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.customer_email && session.customer) {
      await prisma.user.upsert({
        where: { email: session.customer_email },
        create: { email: session.customer_email, stripeCustomerId: String(session.customer) },
        update: { stripeCustomerId: String(session.customer) }
      });
    }
  }

  if (event.type.startsWith('customer.subscription.')) {
    const sub = event.data.object as Stripe.Subscription;
    const customerId = String(sub.customer);
    const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } });
    if (user) {
      const plan = await ensurePlanByPriceId(sub.items.data[0]?.price?.id);
      if (plan) {
        await prisma.subscription.upsert({
          where: { stripeSubscriptionId: sub.id },
          create: { userId: user.id, planId: plan.id, stripeSubscriptionId: sub.id, status: mapSubscriptionStatus(sub.status), currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null },
          update: { status: mapSubscriptionStatus(sub.status), planId: plan.id, currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null }
        });
      }
    }
  }

  return NextResponse.json({ ok: true });
}
