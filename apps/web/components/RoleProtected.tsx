"use client";

import { useSessionContext } from './SessionProvider';
import { hasRole } from '../lib/roleGuards';

export function RoleProtected({ roles, fallback, children }: { roles: string[]; fallback?: React.ReactNode; children: React.ReactNode }) {
  const { user, loading } = useSessionContext();

  if (loading) {
    return <p style={{ color: '#64748b' }}>Chargement des permissions...</p>;
  }

  if (!hasRole(user, roles)) {
    return <>{fallback || <p style={{ color: '#b91c1c' }}>Action reservee a un role autorise.</p>}</>;
  }

  return <>{children}</>;
}
