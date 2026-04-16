import { siteConfig } from './site';

export async function apiGet(path: string, token?: string | null) {
  const response = await fetch(siteConfig.apiBaseUrl + path, {
    cache: 'no-store',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!response.ok) throw new Error('API request failed');
  return response.json();
}

export async function apiPost(path: string, body: Record<string, unknown>, token?: string | null) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(siteConfig.apiBaseUrl + path, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!response.ok) throw new Error('API request failed');
  return response.json();
}

export async function apiPut(path: string, body: Record<string, unknown>, token?: string | null) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(siteConfig.apiBaseUrl + path, { method: 'PUT', headers, body: JSON.stringify(body) });
  if (!response.ok) throw new Error('API request failed');
  return response.json();
}

export async function apiDelete(path: string, token?: string | null) {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(siteConfig.apiBaseUrl + path, { method: 'DELETE', headers });
  if (!response.ok) throw new Error('API request failed');
  return response.json();
}
