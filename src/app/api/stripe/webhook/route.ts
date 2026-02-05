import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/server/billing/stripeClient';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'missing signature' }, { status: 400 });

  stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET ?? '');
  return NextResponse.json({ ok: true });
}
