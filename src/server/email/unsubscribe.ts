import crypto from 'node:crypto';
import { prisma } from '@/server/db/prisma';

function secret() {
  const value = process.env.NEXTAUTH_SECRET;
  if (!value) throw new Error('NEXTAUTH_SECRET is required');
  return value;
}

export function createUnsubscribeToken(userId: string) {
  const sig = crypto.createHmac('sha256', secret()).update(userId).digest('hex');
  return Buffer.from(`${userId}.${sig}`).toString('base64url');
}

export function verifyUnsubscribeToken(token: string) {
  const raw = Buffer.from(token, 'base64url').toString('utf8');
  const [userId, sig] = raw.split('.');
  if (!userId || !sig) return null;
  const expected = crypto.createHmac('sha256', secret()).update(userId).digest('hex');
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  return userId;
}

export async function unsubscribeByToken(token: string) {
  const userId = verifyUnsubscribeToken(token);
  if (!userId) return false;
  await prisma.user.update({ where: { id: userId }, data: { emailOptOut: true } });
  return true;
}

export function isUnsubscribed(user: { emailOptOut?: boolean }) {
  return Boolean(user.emailOptOut);
}
