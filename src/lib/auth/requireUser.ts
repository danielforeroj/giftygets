import { getSession } from '@/lib/auth/getSession';
import { prisma } from '@/server/db/prisma';

export type AuthUser = { id: string; email: string | null; role: 'USER' | 'ADMIN' };

export async function requireUser(): Promise<AuthUser> {
  const session = await getSession();
  if (!session?.user?.email) throw new Error('Unauthenticated');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true, role: true }
  });

  if (!user) throw new Error('Unauthenticated');
  return user;
}
