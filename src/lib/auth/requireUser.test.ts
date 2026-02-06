import { describe, expect, it, vi } from 'vitest';

const getSession = vi.fn();
const findUnique = vi.fn();

vi.mock('@/lib/auth/getSession', () => ({ getSession }));
vi.mock('@/server/db/prisma', () => ({ prisma: { user: { findUnique } } }));

describe('requireUser', () => {
  it('throws when there is no session email', async () => {
    getSession.mockResolvedValueOnce(null);
    const { requireUser } = await import('./requireUser');
    await expect(requireUser()).rejects.toThrow('Unauthenticated');
  });

  it('returns user from prisma', async () => {
    getSession.mockResolvedValueOnce({ user: { email: 'dev@example.com' } });
    findUnique.mockResolvedValueOnce({ id: 'u1', email: 'dev@example.com', role: 'USER' });
    const { requireUser } = await import('./requireUser');
    await expect(requireUser()).resolves.toEqual({ id: 'u1', email: 'dev@example.com', role: 'USER' });
  });
});
