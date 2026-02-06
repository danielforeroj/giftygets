import { describe, expect, it } from 'vitest';
import { toApiErrorResponse } from '@/server/http/apiError';

describe('toApiErrorResponse', () => {
  it('maps Unauthenticated to 401', async () => {
    const res = toApiErrorResponse(new Error('Unauthenticated'));
    expect(res.status).toBe(401);
  });

  it('maps Forbidden to 403', async () => {
    const res = toApiErrorResponse(new Error('Forbidden'));
    expect(res.status).toBe(403);
  });

  it('maps Domain not allowed to 400', async () => {
    const res = toApiErrorResponse(new Error('Domain not allowed.'));
    expect(res.status).toBe(400);
  });
});
