export function mapSubscriptionStatus(eventType: string) {
  if (eventType.includes('deleted')) return 'CANCELED';
  if (eventType.includes('past_due')) return 'PAST_DUE';
  return 'ACTIVE';
}
