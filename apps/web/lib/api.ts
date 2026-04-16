import { siteConfig } from './site';

export async function apiGet(path: string) {
  const response = await fetch(siteConfig.apiBaseUrl + path, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('API request failed');
  }
  return response.json();
}

export async function apiPost(path: string, body: Record<string, unknown>) {
  const response = await fetch(siteConfig.apiBaseUrl + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('API request failed');
  }
  return response.json();
}
