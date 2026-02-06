import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '@/lib/auth/requireUser';
import { apiTry } from '@/server/http/apiError';
import { stripe } from '@/server/billing/stripeClient';

const checkoutSchema = z.object({ planKey: z.enum(['BASIC', 'PRO']) });

export async function POST(req: Request) {
  return apiTry(async () => {
    const user = await requireUser();
    const payload = checkoutSchema.parse(await req.json());

    const priceId = payload.planKey === 'PRO' ? process.env.STRIPE_PRICE_PRO : process.env.STRIPE_PRICE_BASIC;
    if (!priceId) return NextResponse.json({ error: `Missing Stripe price for ${payload.planKey}` }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.APP_URL}/app/billing?status=success`,
      cancel_url: `${process.env.APP_URL}/app/billing?status=cancelled`,
      customer_email: user.email ?? undefined
    });

    return NextResponse.json({ url: session.url });
  });
}
