import { NextResponse } from 'next/server';
import { waitlistSchema } from '@/lib/validation/waitlist';
import { checkRateLimit } from '@/server/rateLimit/dbRateLimit';

const emails = new Set<string>();

export async function POST(req: Request) {
  const payload = waitlistSchema.parse(await req.json());
  if (payload.company) return NextResponse.json({ error: 'Spam rejected' }, { status: 400 });

  const ip = req.headers.get('x-forwarded-for') ?? 'local';
  const rate = checkRateLimit(`waitlist:${ip}`, Number(process.env.RATE_LIMIT_MAX_PER_HOUR ?? 10));
  if (!rate.allowed) return NextResponse.json({ error: 'Rate limited' }, { status: 429 });

  if (emails.has(payload.email)) return NextResponse.json({ ok: true, duplicate: true });
  emails.add(payload.email);
  return NextResponse.json({ ok: true, duplicate: false }, { status: 201 });
}
