import { isAuthBypassEnabled } from '@/lib/env';
import { getSession } from '@/lib/auth/getSession';

export type AuthUser = { id: string; email: string | null; role?: string };

export async function requireUser(): Promise<AuthUser> {
  if (isAuthBypassEnabled()) return { id: 'dev-user-id', email: 'dev@example.com', role: 'ADMIN' };
  const session = await getSession();
  if (!session?.user?.email) throw new Error('Unauthenticated');
  return { id: session.user.email, email: session.user.email, role: 'USER' };
}
