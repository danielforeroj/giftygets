import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth/requireUser';
import { deleteTracker, getTracker, updateTracker } from '@/server/trackers/trackerService';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const tracker = getTracker(params.id);
  if (!tracker || tracker.userId !== user.id) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ tracker });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const payload = await req.json();
  const tracker = updateTracker(params.id, user.id, payload);
  return NextResponse.json({ tracker });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const user = await requireUser();
  deleteTracker(params.id, user.id);
  return NextResponse.json({ ok: true });
}
