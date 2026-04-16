"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPost } from '../../../lib/api';
import { writeToken } from '../../../lib/session';

export default function DemoLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@niakara.ci');
  const [password, setPassword] = useState('demo1234');
  const [status, setStatus] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    setStatus('Connexion en cours...');
    try {
      const response = await apiPost('/api/auth/login', { email, password });
      writeToken(response.token);
      setStatus('Connexion reussie.');
      router.push('/commune/admin-console');
    } catch (error) {
      setStatus('Echec de connexion.');
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 540, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 28 }}>
        <h1 style={{ marginTop: 0 }}>Demo login connecte</h1>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
          <button type="submit" style={{ background: '#1d4ed8', color: '#fff', padding: '14px 18px', borderRadius: 12, border: 'none' }}>
            Login API
          </button>
        </form>
        <p style={{ color: '#475569', marginTop: 12 }}>{status}</p>
      </div>
    </main>
  );
}
