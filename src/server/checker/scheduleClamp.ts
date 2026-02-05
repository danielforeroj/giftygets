export function scheduleClamp(proposalSeconds: number, failureBackoffSeconds: number) {
  const min = Number(process.env.MIN_CHECK_SECONDS ?? 300);
  const max = Number(process.env.MAX_CHECK_SECONDS ?? 21600);
  const clamped = Math.min(max, Math.max(min, proposalSeconds));
  return Math.max(clamped, failureBackoffSeconds);
}
