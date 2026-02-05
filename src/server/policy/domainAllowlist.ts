import { normalizedDomain } from '@/lib/url/normalize';

export function getAllowedDomains() {
  return (process.env.ALLOWED_DOMAINS ?? '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function isDomainAllowed(url: string) {
  const host = normalizedDomain(url);
  return getAllowedDomains().includes(host);
}
