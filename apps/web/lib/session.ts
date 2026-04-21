export const AUTH_TOKEN_KEY = 'civitech_commune_auth_token';
export const AUTH_USER_KEY = 'civitech_commune_auth_user';

export function readToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function readStoredUser(): Record<string, unknown> | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

export function writeToken(token: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function writeStoredUser(user: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearSessionStorage() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);
}

export function removeToken() {
  clearSessionStorage();
}
