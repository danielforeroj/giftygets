import { openAIProvider } from '@/server/ai/openaiProvider';
import { deterministicFilter } from '@/server/alternatives/deterministicFilter';
import { rankAlternatives } from '@/server/alternatives/ranker';
import { staticCandidates } from '@/server/alternatives/candidates';
import { getAllowedDomains } from '@/server/policy/domainAllowlist';

export async function SELECT_ALTERNATIVES(input: { query: string; maxPrice: number }) {
  const vector = await openAIProvider.embed(input.query);
  const filtered = deterministicFilter(staticCandidates, getAllowedDomains(), input.maxPrice);
  const ranked = rankAlternatives(vector.slice(0, 3), filtered).slice(0, 3);
  return { ok: true, data: ranked };
}
