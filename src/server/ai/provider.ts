import type { ZodType } from 'zod';

export type AIProvider = {
  structuredJson<T>(prompt: string, schema: ZodType<T>): Promise<T>;
  embed(text: string): Promise<number[]>;
};
