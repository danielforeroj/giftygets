import { isAuthBypassEnabled } from '@/lib/env';

export type AuthUser = {
  id: string;
  email: string | null;
};

export async function requireUser(): Promise<AuthUser> {
  if (isAuthBypassEnabled()) {
    return {
      id: 'dev-user-id',
      email: 'dev@example.com'
    };
  }

  throw new Error('Unauthenticated: wire this to NextAuth session lookup.');
}
