export function normalizeUrl(input: string) {
  const url = new URL(input);
  url.hash = '';
  return url.toString();
}

export function normalizedDomain(input: string) {
  return new URL(input).hostname.toLowerCase();
}
