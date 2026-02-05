const truthy = new Set(['1', 'true', 'yes']);

export function isAuthBypassEnabled(): boolean {
  return truthy.has((process.env.AUTH_BYPASS ?? '').toLowerCase());
}
