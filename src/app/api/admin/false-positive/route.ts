import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

const labels: Array<{ alertId: string; note?: string }> = [];

export async function POST(req: Request) {
  await requireAdmin();
  const payload = (await req.json()) as { alertId: string; note?: string };
  labels.push(payload);
  return NextResponse.json({ ok: true, labels });
}
