"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiGet } from '../../../lib/api';
import { readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';

export default function MesDossiersSoumisPage() {
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
        setError('Impossible de charger les dossiers soumis.');
      }
    }
    load();
  }, []);

  const submitted = useMemo(() => (dashboard?.dossiers || []).filter((item) => ['submitted','in_review','validated','issued','available'].includes(item.status)), [dashboard]);

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Mes dossiers soumis</h1>
            <p style={{ color: '#475569', lineHeight: 1.7 }}>Cette page regroupe les dossiers deja soumis ou en cours de traitement.</p>
          </div>
          {error ? <p style={{ color: '#b91c1c' }}>{error}</p> : null}
          <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
            <div style={{ display: 'grid', gap: 12 }}>
              {submitted.map((dossier) => (
                <article key={dossier.reference} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                  <strong>{dossier.procedureTitle || dossier.procedureCode || dossier.procedureId}</strong>
                  <div style={{ color: '#64748b', marginTop: 4 }}>{dossier.reference}</div>
                  <div style={{ color: '#334155', marginTop: 4 }}>Statut : {dossier.status}</div>
                  <div style={{ color: '#334155', marginTop: 4 }}>Progression : {dossier.computedProgress || 0}%</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
                    <Link href={'/commune/dossiers/' + encodeURIComponent(dossier.reference)} style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'none' }}>Ouvrir le detail</Link>
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
