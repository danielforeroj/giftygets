import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '@/lib/auth/requireUser';
import { prisma } from '@/server/db/prisma';
import { apiTry } from '@/server/http/apiError';

const patchSchema = z.object({
  timezone: z.string().min(1).optional(),
  notificationEmail: z.string().email().optional().or(z.literal(''))
});

export async function GET() {
  return apiTry(async () => {
    const user = await requireUser();
    const settings = await prisma.user.findUnique({
      where: { id: user.id },
      select: { timezone: true, notificationEmail: true, email: true }
    });
    return NextResponse.json({ settings });
  });
}

export async function PATCH(req: Request) {
  return apiTry(async () => {
    const user = await requireUser();
    const payload = patchSchema.parse(await req.json());

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        timezone: payload.timezone,
        notificationEmail: payload.notificationEmail === '' ? null : payload.notificationEmail
      },
      select: { timezone: true, notificationEmail: true }
    });

    return NextResponse.json({ settings: updated });
  });
}
