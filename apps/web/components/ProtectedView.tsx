"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { readToken } from '../lib/session';

export function ProtectedView({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = readToken();
    if (!token) {
      router.push('/auth/demo-login');
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc' }}>
        <p style={{ color: '#475569' }}>Verification de session...</p>
      </main>
    );
  }

  return <>{children}</>;
}
