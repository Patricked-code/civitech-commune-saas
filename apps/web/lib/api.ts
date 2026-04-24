import { siteConfig } from './site';

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const message = payload?.message || payload?.error || 'La requete API a echoue.';
    throw new ApiError(message, response.status, payload?.error);
  }

  return payload;
}

function buildHeaders(token?: string | null) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export function getApiErrorMessage(error: unknown, fallback = 'Une erreur technique est survenue.') {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export async function apiGet(path: string, token?: string | null) {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(siteConfig.apiBaseUrl + path, {
    cache: 'no-store',
    headers,
  });
  return parseResponse(response);
}

export async function apiPost(path: string, body: Record<string, unknown>, token?: string | null) {
  const response = await fetch(siteConfig.apiBaseUrl + path, { method: 'POST', headers: buildHeaders(token), body: JSON.stringify(body) });
  return parseResponse(response);
}

export async function apiPut(path: string, body: Record<string, unknown>, token?: string | null) {
  const response = await fetch(siteConfig.apiBaseUrl + path, { method: 'PUT', headers: buildHeaders(token), body: JSON.stringify(body) });
  return parseResponse(response);
}

export async function apiDelete(path: string, token?: string | null) {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(siteConfig.apiBaseUrl + path, { method: 'DELETE', headers });
  return parseResponse(response);
}
