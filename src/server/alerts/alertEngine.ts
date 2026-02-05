import { prisma } from '@/server/db/prisma';
import { DRAFT_EMAIL } from '@/server/agent/tools/DRAFT_EMAIL';
import { alertEmailTemplate } from '@/server/email/templates/alertEmail';
import { sendEmail } from '@/server/email/sendEmail';
import { explainAlert } from '@/server/alerts/explain';
import type { AlertCandidate } from '@/server/alerts/types';
import { alertGate } from '@/server/verifiers/alertGate';

export async function runAlertEngine(candidate: AlertCandidate) {
  const gate = await alertGate({
    userId: candidate.userId,
    trackerId: candidate.trackerId,
    dedupeKey: candidate.dedupeKey,
    buyable: candidate.buyable,
    variantOk: candidate.variantOk,
    confidence: candidate.confidence
  });

  if (!gate.ok) {
    const why = explainAlert({ title: candidate.title, why: gate.reasons, verifiedPrice: candidate.verifiedPrice, verifiedAvailability: candidate.verifiedAvailability });
    await prisma.alertEvent.update({
      where: { trackerId_dedupeKey: { trackerId: candidate.trackerId, dedupeKey: candidate.dedupeKey } },
      data: { status: 'NOT_SENT', whyNotSent: gate.reasons.join('; '), whySent: why }
    });
    return { status: 'NOT_SENT', reasons: gate.reasons, why };
  }

  const draft = DRAFT_EMAIL({ title: candidate.title, verifiedReasons: candidate.reasons });
  const html = alertEmailTemplate({ subject: draft.subject, body: draft.body, unsubscribeUrl: `${process.env.APP_URL}/unsubscribe` });
  const sent = await sendEmail({ to: candidate.email, subject: draft.subject, html, user: { id: candidate.userId } });

  await prisma.alertEvent.update({
    where: { trackerId_dedupeKey: { trackerId: candidate.trackerId, dedupeKey: candidate.dedupeKey } },
    data: { status: sent.ok ? 'SENT' : 'NOT_SENT', whySent: sent.ok ? 'All deterministic gates passed' : undefined, whyNotSent: sent.ok ? undefined : sent.reason }
  });

  return { status: sent.ok ? 'SENT' : 'NOT_SENT', reasons: sent.ok ? ['sent'] : [sent.reason ?? 'send failed'] };
}
