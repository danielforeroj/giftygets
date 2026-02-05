export function isUnsubscribed(user: { emailOptOut?: boolean }) {
  return Boolean(user.emailOptOut);
}
