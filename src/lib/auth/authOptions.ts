import { PrismaAdapter } from '@auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { Resend } from 'resend';
import { prisma } from '@/server/db/prisma';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM ?? 'alerts@yourdomain.com',
      async sendVerificationRequest({ identifier, url, provider }) {
        if (process.env.NODE_ENV === 'test') return;
        if (!resend) throw new Error('RESEND_API_KEY is required for magic links');

        await resend.emails.send({
          from: provider.from,
          to: identifier,
          subject: 'Your magic sign-in link',
          html: `<p>Sign in to Gifty Gets by clicking the link below:</p><p><a href="${url}">${url}</a></p>`
        });
      }
    })
  ],
  pages: { signIn: '/auth/signin' },
  callbacks: {
    async session({ session, user }) {
      const u = user as unknown as { id: string; role?: 'USER' | 'ADMIN' };
      if (session.user) {
        (session.user as any).id = u.id;
        (session.user as any).role = u.role ?? 'USER';
      }
      return session;
    }
  },
  session: { strategy: 'database' },
  secret: process.env.NEXTAUTH_SECRET
};
