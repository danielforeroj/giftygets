import { requireUser } from '@/lib/auth/requireUser';

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== 'ADMIN') throw new Error('Forbidden');
  return user;
}
