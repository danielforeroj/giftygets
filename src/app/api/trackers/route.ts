import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth/requireUser';
import { apiTry } from '@/server/http/apiError';
import { createTracker, listTrackers } from '@/server/trackers/trackerService';

export async function GET() {
  return apiTry(async () => {
    const user = await requireUser();
    return NextResponse.json({ trackers: await listTrackers(user.id) });
  });
}

export async function POST(req: Request) {
  return apiTry(async () => {
    const user = await requireUser();
    const payload = await req.json();
    const tracker = await createTracker(user.id, payload);
    return NextResponse.json({ tracker }, { status: 201 });
  });
}
