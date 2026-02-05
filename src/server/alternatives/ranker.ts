export function cosine(a: number[], b: number[]) {
  const dot = a.reduce((sum, value, idx) => sum + value * (b[idx] ?? 0), 0);
  const ma = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
  const mb = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));
  return dot / (ma * mb || 1);
}

export function rankAlternatives<T extends { vector: number[] }>(target: number[], items: T[]) {
  return [...items].sort((a, b) => cosine(target, b.vector) - cosine(target, a.vector));
}
