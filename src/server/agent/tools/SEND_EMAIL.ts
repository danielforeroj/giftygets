import { z } from 'zod';
import { sendEmail } from '@/server/email/sendEmail';

const schema = z.object({ to: z.string().email(), subject: z.string(), html: z.string(), userId: z.string().optional() });

export async function SEND_EMAIL(input: unknown) {
  const parsed = schema.parse(input);
  return sendEmail({ to: parsed.to, subject: parsed.subject, html: parsed.html, user: { id: parsed.userId } });
}
