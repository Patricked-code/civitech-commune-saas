"use client";

import { useEffect, useState } from 'react';
import { apiGet } from '../lib/api';
import { clearSessionStorage, readStoredUser, readToken, writeStoredUser } from '../lib/session';
import type { SessionState, SessionUser } from '../lib/appTypes';

export function useSession(): SessionState {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const storedToken = readToken();
      const storedUser = readStoredUser() as SessionUser | null;
      setToken(storedToken);
      if (storedUser) {
        setUser(storedUser);
      }
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const me = await apiGet('/api/auth/me', storedToken);
        setUser(me as SessionUser);
        writeStoredUser(me as SessionUser);
      } catch (error) {
        clearSessionStorage();
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, []);

  return { token, user, loading };
}
