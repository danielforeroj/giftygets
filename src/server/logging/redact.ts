const SENSITIVE = ['authorization', 'cookie', 'token', 'secret', 'password', 'apiKey'];

export function redact(input: unknown): unknown {
  if (input === null || input === undefined) return input;
  if (Array.isArray(input)) return input.map(redact);
  if (typeof input !== 'object') return input;

  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (SENSITIVE.some((needle) => key.toLowerCase().includes(needle.toLowerCase()))) {
      out[key] = '[REDACTED]';
    } else {
      out[key] = redact(value);
    }
  }
  return out;
}
