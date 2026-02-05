import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { prisma } from '@/server/db/prisma';

const schema = z.object({ alertId: z.string(), note: z.string().optional() });

export async function POST(req: Request) {
  await requireAdmin();
  const payload = schema.parse(await req.json());
  await prisma.alertEvent.update({ where: { id: payload.alertId }, data: { falsePositive: true, falsePositiveNote: payload.note } });
  return NextResponse.json({ ok: true });
}
