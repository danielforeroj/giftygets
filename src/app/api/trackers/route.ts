import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth/requireUser';
import { createTracker, listTrackers } from '@/server/trackers/trackerService';

export async function GET() {
  const user = await requireUser();
  return NextResponse.json({ trackers: listTrackers(user.id) });
}

export async function POST(req: Request) {
  const user = await requireUser();
  const payload = await req.json();
  const tracker = createTracker(user.id, payload);
  return NextResponse.json({ tracker }, { status: 201 });
}
