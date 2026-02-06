import { z } from 'zod';
import { openAIProvider } from '@/server/ai/openaiProvider';
import { deterministicFilter } from '@/server/alternatives/deterministicFilter';
import { rankAlternatives } from '@/server/alternatives/ranker';
import { staticCandidates } from '@/server/alternatives/candidates';
import { getAllowedDomains } from '@/server/policy/domainAllowlist';

const schema = z.object({
  query: z.string().min(1),
  maxPrice: z.number().int().positive()
});

export async function SELECT_ALTERNATIVES(input: unknown) {
  const parsed = schema.parse(input);

  // embed() already has a no-API-key fallback in openAIProvider, so this won't break your deploy.
  const vector = await openAIProvider.embed(parsed.query);

  const filtered = deterministicFilter(staticCandidates, getAllowedDomains(), parsed.maxPrice);

  // We slice to 3 to match the demo candidate vectors in staticCandidates (length 3).
  const ranked = rankAlternatives(vector.slice(0, 3), filtered).slice(0, 3);

  return { ok: true, data: ranked };
}
