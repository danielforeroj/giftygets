import type { AIProvider } from '@/server/ai/provider';

export const openAIProvider: AIProvider = {
  async structuredJson<T>() {
    throw new Error('AI provider not configured in local deterministic mode.');
  },
  async embed(text: string) {
    return text.split('').slice(0, 8).map((char) => char.charCodeAt(0) / 255);
  }
};
