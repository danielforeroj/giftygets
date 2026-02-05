export function deterministicFilter(candidates: Array<{ domain: string; priceCents: number }>, allowlist: string[], maxPrice: number) {
  return candidates.filter((candidate) => allowlist.includes(candidate.domain) && candidate.priceCents <= maxPrice);
}
