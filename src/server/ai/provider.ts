export type AIProvider = {
  structuredJson<T>(prompt: string): Promise<T>;
  embed(text: string): Promise<number[]>;
};
