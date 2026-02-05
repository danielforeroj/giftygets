export function computeConfidence(input: { verified: boolean; matchedRules: boolean; freshnessMinutes: number }) {
  let score = 0;
  if (input.verified) score += 0.55;
  if (input.matchedRules) score += 0.3;
  if (input.freshnessMinutes <= 30) score += 0.15;
  return Number(score.toFixed(2));
}
