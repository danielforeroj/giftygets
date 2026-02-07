import type { ZodType } from 'zod';
import { OpenAI } from 'openai';
import type { AIProvider } from '@/server/ai/provider';

const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export const openAIProvider: AIProvider = {
  async structuredJson<T>(prompt: string, schema: ZodType<T>) {
    // Do NOT fabricate outputs. If not configured, throw so the caller can run deterministic fallbacks.
    if (!client) {
      throw new Error('AI_PROVIDER_NOT_CONFIGURED: OPENAI_API_KEY is missing');
    }

    const res = await client.responses.create({
      model: process.env.AI_MODEL ?? 'gpt-4.1-mini',
      input: prompt
    });

    // output_text is a string; parse to JSON then validate against schema
    return schema.parse(JSON.parse(res.output_text));
  },

  async embed(text: string) {
    // Keep embed fallback so deploy/dev works even without keys.
    if (!client) return text.split('').slice(0, 8).map((char) => char.charCodeAt(0) / 255);

    const embedding = await client.embeddings.create({
      model: process.env.AI_EMBEDDINGS_MODEL ?? 'text-embedding-3-small',
      input: text
    });

    return embedding.data[0]?.embedding ?? [];
  }
};
