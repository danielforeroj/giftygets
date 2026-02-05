import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth/requireUser';
import { stripe } from '@/server/billing/stripeClient';

export async function POST(req: Request) {
  const user = await requireUser();
  const { priceId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.APP_URL}/app/billing?status=success`,
    cancel_url: `${process.env.APP_URL}/app/billing?status=cancelled`,
    customer_email: user.email ?? undefined
  });

  return NextResponse.json({ url: session.url });
}
