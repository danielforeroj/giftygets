import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function toApiErrorResponse(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const message = error instanceof Error ? error.message : 'Internal error';
  if (message === 'Unauthenticated') return NextResponse.json({ error: message }, { status: 401 });
  if (message === 'Forbidden') return NextResponse.json({ error: message }, { status: 403 });
  if (message === 'Domain not allowed.') return NextResponse.json({ error: message }, { status: 400 });

  return NextResponse.json({ error: 'Internal error' }, { status: 500 });
}

export async function apiTry<T>(fn: () => Promise<T>) {
  try {
    return await fn();
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
