import { isDomainAllowed } from '@/server/policy/domainAllowlist';

const PRIVATE_IP_PATTERN = /^(10\.|127\.|169\.254\.|172\.(1[6-9]|2\d|3[0-1])\.|192\.168\.|::1|fc00:|fe80:)/;

function isUnsafeHost(host: string) {
  return PRIVATE_IP_PATTERN.test(host);
}

export async function safeFetch(url: string) {
  const parsed = new URL(url);
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Only http/https are allowed.');
  }
  if (!isDomainAllowed(url)) {
    throw new Error('Domain not allowed.');
  }
  if (isUnsafeHost(parsed.hostname)) {
    throw new Error('Private network hosts are blocked.');
  }

  const timeoutMs = Number(process.env.FETCH_TIMEOUT_MS ?? 8000);
  const maxBytes = Number(process.env.FETCH_MAX_BYTES ?? 1500000);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const response = await fetch(url, {
    headers: { 'User-Agent': process.env.FETCH_USER_AGENT ?? 'EAAlertsBot/1.0' },
    redirect: 'follow',
    signal: controller.signal
  });

  clearTimeout(timeout);
  const text = await response.text();
  if (text.length > maxBytes) {
    throw new Error('Response exceeded max size.');
  }

  return { status: response.status, text, url: response.url };
}
