"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiGet } from '../../../lib/api';
import { readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';

export default function EspaceCitoyenPage() {
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
        setError('Impossible de charger le tableau de bord citoyen.');
      }
    }
    load();
  }, []);

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Espace citoyen</h1>
            <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 900 }}>
              Tableau de bord usager connecte aux vrais dossiers du citoyen, avec suivi des brouillons, dossiers soumis et dossiers en cours.
            </p>
          </div>

          {error ? <p style={{ color: '#b91c1c' }}>{error}</p> : null}

          {dashboard ? (
            <>
              <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 20 }}>
                  <div style={{ color: '#64748b' }}>Total dossiers</div>
                  <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>{dashboard.summary.total}</div>
                </div>
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 20 }}>
                  <div style={{ color: '#64748b' }}>Brouillons</div>
                  <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>{dashboard.summary.drafts}</div>
                </div>
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 20 }}>
                  <div style={{ color: '#64748b' }}>Soumis</div>
                  <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>{dashboard.summary.submitted}</div>
                </div>
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 20 }}>
                  <div style={{ color: '#64748b' }}>En cours</div>
                  <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>{dashboard.summary.inProgress}</div>
                </div>
              </section>

              <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
                <h2 style={{ marginTop: 0 }}>Mes demarches recentes</h2>
                <div style={{ display: 'grid', gap: 14 }}>
                  {(dashboard.dossiers || []).map((demande) => (
                    <article key={demande.reference} style={{ border: '1px solid #e2e8f0', borderRadius: 14, padding: 18, background: '#fcfdff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 18 }}>{demande.procedureTitle || demande.procedureCode || demande.procedureId}</div>
                          <div style={{ color: '#64748b', marginTop: 4 }}>{demande.reference}</div>
                        </div>
                        <div style={{ fontWeight: 700, color: '#1d4ed8' }}>{demande.status}</div>
                      </div>
                      <div style={{ marginTop: 12, color: '#475569' }}>Progression : {demande.computedProgress || 0}%</div>
                      <div style={{ marginTop: 6, color: '#475569' }}>Prochaine etape : {demande.nextStep || 'N/A'}</div>
                      <Link href={'/commune/dossiers/' + encodeURIComponent(demande.reference)} style={{ display: 'inline-block', marginTop: 10, color: '#1d4ed8', textDecoration: 'none', fontWeight: 700 }}>
                        Ouvrir le detail
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            </>
          ) : null}
        </div>
      </main>
    </ProtectedView>
  );
}
