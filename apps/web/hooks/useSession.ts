"use client";

import { useEffect, useState } from 'react';
import { readToken } from '../lib/session';
import { apiGet } from '../lib/api';
import type { SessionState, SessionUser } from '../lib/appTypes';

export function useSession(): SessionState {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const storedToken = readToken();
      setToken(storedToken);
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const me = await apiGet('/api/auth/me', storedToken);
        setUser(me as SessionUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, []);

  return { token, user, loading };
}
