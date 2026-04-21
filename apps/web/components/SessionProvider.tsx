"use client";

import { createContext, useContext } from 'react';
import { useSession } from '../hooks/useSession';
import type { SessionState } from '../lib/appTypes';

const SessionContext = createContext<SessionState>({ token: null, user: null, loading: true });

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export function useSessionContext() {
  return useContext(SessionContext);
}
