"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiGet } from '../../../lib/api';
import { readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';

export default function MesBrouillonsPage() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const token = readToken();
      if (!token) {
        setError('Session absente.');
        return;
      }
      try {
        const response = await apiGet('/api/citizen/dashboard', token);
        setDashboard(response);
      } catch (err) {
        setError('Impossible de charger les brouillons.');
      }
    }
    load();
  }, []);

  const drafts = useMemo(() => (dashboard?.dossiers || []).filter((item) => item.status === 'draft'), [dashboard]);

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Mes brouillons</h1>
            <p style={{ color: '#475569', lineHeight: 1.7 }}>Cette page regroupe les demarches en brouillon et permet leur reprise rapide.</p>
          </div>
          {error ? <p style={{ color: '#b91c1c' }}>{error}</p> : null}
          <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
            <div style={{ display: 'grid', gap: 12 }}>
              {drafts.map((dossier) => (
                <article key={dossier.reference} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                  <strong>{dossier.procedureTitle || dossier.procedureCode || dossier.procedureId}</strong>
                  <div style={{ color: '#64748b', marginTop: 4 }}>{dossier.reference}</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
                    <Link href={'/commune/dossiers/' + encodeURIComponent(dossier.reference)} style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'none' }}>Ouvrir le detail</Link>
                    <Link href={'/commune/dossiers/' + encodeURIComponent(dossier.reference) + '/edit'} style={{ color: '#0f766e', fontWeight: 700, textDecoration: 'none' }}>Reprendre le brouillon</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </ProtectedView>
  );
}
