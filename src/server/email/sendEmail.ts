import { resend } from '@/server/email/resendClient';
import { isUnsubscribed } from '@/server/email/unsubscribe';

export async function sendEmail(input: { to: string; subject: string; html: string; user: { emailOptOut?: boolean } }) {
  if (isUnsubscribed(input.user)) return { ok: false, reason: 'User opted out' };
  if (process.env.NODE_ENV === 'test') return { ok: true, id: 'mock-email-id' };

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'alerts@yourdomain.com',
    to: input.to,
    subject: input.subject,
    html: input.html,
    headers: { 'X-Entity-Ref-ID': 'gifty-alert' }
  });
  return { ok: true };
}
