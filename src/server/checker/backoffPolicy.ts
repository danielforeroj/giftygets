export function backoffPolicy(failureCount: number) {
  return Math.min(60 * 60 * 6, 60 * Math.pow(2, failureCount));
}
