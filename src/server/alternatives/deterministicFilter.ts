export function deterministicFilter<T extends { domain: string; priceCents: number }>(
  candidates: T[],
  allowlist: string[],
  maxPrice: number
): T[] {
  return candidates.filter((candidate) => allowlist.includes(candidate.domain) && candidate.priceCents <= maxPrice);
}
