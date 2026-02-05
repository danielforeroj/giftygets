import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '@/lib/auth/requireUser';
import { updateIntentProfile } from '@/server/intent/updateIntentProfile';

const feedbackSchema = z.object({
  trackerId: z.string().optional(),
  type: z.enum(['LIKE', 'DISLIKE', 'NOT_RELEVANT']),
  category: z.string().optional()
});

export async function POST(req: Request) {
  const user = await requireUser();
  const feedback = feedbackSchema.parse(await req.json());
  const profile = updateIntentProfile(user.id, feedback);
  return NextResponse.json({ ok: true, profile });
}
