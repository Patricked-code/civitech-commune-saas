"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../hooks/useSession';

export function ProtectedView({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, loading } = useSession();

  useEffect(() => {
    if (!loading && !token) {
      router.push('/auth/demo-login');
    }
  }, [loading, token, router]);

  if (loading || !token) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc' }}>
        <p style={{ color: '#475569' }}>Verification de session...</p>
      </main>
    );
  }

  return <>{children}</>;
}
