import { resend } from '@/server/email/resendClient';
import { createUnsubscribeToken, isUnsubscribed } from '@/server/email/unsubscribe';

export async function sendEmail(input: { to: string; subject: string; html: string; user: { id?: string; emailOptOut?: boolean } }) {
  if (isUnsubscribed(input.user)) return { ok: false, reason: 'User opted out' };
  if (process.env.NODE_ENV === 'test') return { ok: true, id: 'mock-email-id' };

  const html = input.user.id
    ? `${input.html}<p style="font-size:12px">Unsubscribe: ${process.env.APP_URL}/unsubscribe?token=${createUnsubscribeToken(input.user.id)}</p>`
    : input.html;

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'alerts@yourdomain.com',
    to: input.to,
    subject: input.subject,
    html,
    headers: { 'X-Entity-Ref-ID': 'gifty-alert' }
  });
  return { ok: true };
}
