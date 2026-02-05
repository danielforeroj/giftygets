import { safeFetch } from '@/server/http/safeFetch';

export async function FETCH_PAGE(input: { url: string }) {
  const page = await safeFetch(input.url);
  return { ok: true, data: { html: page.text, url: page.url } };
}
