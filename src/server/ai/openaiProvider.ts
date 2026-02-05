import { z } from 'zod';
import { OpenAI } from 'openai';
import type { AIProvider } from '@/server/ai/provider';

const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export const openAIProvider: AIProvider = {
  async structuredJson<T>(prompt: string, schema: z.ZodType<T>) {
    if (!client) {
      return schema.parse({
        goal: 'fallback plan',
        trackerId: 'fallback',
        steps: [
          { id: '1', tool: 'FETCH_PAGE', args: {}, dependsOn: [] },
          { id: '2', tool: 'EXTRACT_PRODUCT_JSON', args: {}, dependsOn: ['1'] }
        ],
        policies: { maxSteps: 12, requireVerification: true },
        nextCheckProposal: 600
      });
    }

    const res = await client.responses.create({
      model: process.env.AI_MODEL ?? 'gpt-4.1-mini',
      input: prompt
    });
    return schema.parse(JSON.parse(res.output_text));
  },
  async embed(text: string) {
    if (!client) return text.split('').slice(0, 8).map((char) => char.charCodeAt(0) / 255);
    const embedding = await client.embeddings.create({ model: process.env.AI_EMBEDDINGS_MODEL ?? 'text-embedding-3-small', input: text });
    return embedding.data[0]?.embedding ?? [];
  }
};
