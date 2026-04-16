"use client";

import { useEffect, useState } from 'react';
import { apiGet } from '../../../lib/api';
import { removeToken, readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';

export default function AdminConsolePage() {
  const [summary, setSummary] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const token = readToken();
      if (!token) {
        setError('Aucun token de session detecte.');
        return;
      }
      try {
        const [summaryData, usersData] = await Promise.all([
          apiGet('/api/admin/summary', token),
          apiGet('/api/admin/users', token),
        ]);
        setSummary(summaryData);
        setUsers(usersData.data || []);
      } catch (err) {
        setError('Impossible de charger le cockpit admin.');
      }
    }
    load();
  }, []);

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontSize: 38, marginBottom: 8 }}>Admin console connectee</h1>
              <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 900 }}>
                Cette vue consomme les endpoints admin proteges et prepare le vrai cockpit SaaS.
              </p>
            </div>
            <button onClick={() => { removeToken(); window.location.href = '/auth/demo-login'; }} style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '10px 14px', borderRadius: 10 }}>
              Se deconnecter
            </button>
          </div>

          {error ? <p style={{ color: '#b91c1c', marginTop: 18 }}>{error}</p> : null}

          {summary ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 24 }}>
              <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #e5e7eb', padding: 22 }}>
                <div style={{ color: '#64748b' }}>Utilisateurs</div>
                <div style={{ fontSize: 32, fontWeight: 800, marginTop: 8 }}>{summary.usersCount}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #e5e7eb', padding: 22 }}>
                <div style={{ color: '#64748b' }}>Procedures</div>
                <div style={{ fontSize: 32, fontWeight: 800, marginTop: 8 }}>{summary.proceduresCount}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #e5e7eb', padding: 22 }}>
                <div style={{ color: '#64748b' }}>Dossiers</div>
                <div style={{ fontSize: 32, fontWeight: 800, marginTop: 8 }}>{summary.dossiersCount}</div>
              </div>
            </div>
          ) : null}

          <section style={{ background: '#fff', borderRadius: 18, border: '1px solid #e5e7eb', padding: 24, marginTop: 24 }}>
            <h2 style={{ marginTop: 0 }}>Utilisateurs</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {users.map((user) => (
                <article key={user.email} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                  <strong>{user.firstName} {user.lastName}</strong>
                  <div style={{ color: '#64748b', marginTop: 4 }}>{user.email}</div>
                  <div style={{ color: '#334155', marginTop: 4 }}>{(user.roleCodes || []).join(', ')}</div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </ProtectedView>
  );
}
