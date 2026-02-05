import { PrismaAdapter } from '@auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { prisma } from '@/server/db/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.RESEND_API_KEY ? 'resend' : undefined,
      from: process.env.EMAIL_FROM ?? 'alerts@yourdomain.com'
    })
  ],
  session: { strategy: 'database' },
  secret: process.env.NEXTAUTH_SECRET
};
