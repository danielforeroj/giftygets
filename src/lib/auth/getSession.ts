import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';

export function getSession() {
  return getServerSession(authOptions);
}
