"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiGet, getApiErrorMessage } from '../../../lib/api';
import { readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';
import type { CitizenDashboard } from '../../../lib/appTypes';

const citizenShortcuts = [
  { href: '/commune/profil', label: 'Profil', text: 'Consulter les informations de mon compte.' },
  { href: '/commune/notifications', label: 'Notifications', text: 'Suivre les alertes liees a mes dossiers.' },
  { href: '/commune/messages', label: 'Messages', text: 'Preparer les echanges avec la mairie.' },
  { href: '/commune/documents', label: 'Documents utiles', text: 'Retrouver les documents publics et pieces utiles.' },
];

export default function EspaceCitoyenPage() {
  const [dashboard, setDashboard] = useState<CitizenDashboard | null>(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

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
        setError(getApiErrorMessage(err, 'Impossible de charger le tableau de bord citoyen.'));
      }
    }
    load();
  }, []);

  const filteredDossiers = useMemo(() => {
    const all = dashboard?.dossiers || [];
    if (filter === 'all') return all;
    return all.filter((item) => item.status === filter);
  }, [dashboard, filter]);

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px', color: '#0f172a' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gap: 24 }}>
          <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 62%, #0ea5e9 100%)', color: '#fff', borderRadius: 26, padding: 30 }}>
            <div style={{ display: 'inline-block', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', fontWeight: 900, marginBottom: 14 }}>
              Espace citoyen connecte
            </div>
            <h1 style={{ fontSize: 40, lineHeight: 1.1, margin: 0 }}>Tableau de bord citoyen</h1>
            <p style={{ lineHeight: 1.75, opacity: 0.95, maxWidth: 880 }}>
              Retrouvez vos dossiers, vos brouillons, vos messages et les raccourcis utiles pour suivre vos demarches communales.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
              <Link href='/commune/demarches' style={{ background: '#fff', color: '#0f172a', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 900 }}>Nouvelle demarche</Link>
              <Link href='/commune/profil' style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.35)', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 900 }}>Mon profil</Link>
              <Link href='/commune/messages' style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.35)', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 900 }}>Messages</Link>
            </div>
          </section>

          {error ? <p style={{ color: '#b91c1c', background: '#fee2e2', border: '1px solid #fecaca', padding: 14, borderRadius: 14 }}>{error}</p> : null}

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {citizenShortcuts.map((item) => (
              <Link key={item.href} href={item.href} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 20, textDecoration: 'none', color: '#0f172a', boxShadow: '0 8px 24px rgba(15,23,42,0.05)' }}>
                <div style={{ fontWeight: 900, fontSize: 19 }}>{item.label}</div>
                <p style={{ color: '#475569', lineHeight: 1.65, marginBottom: 0 }}>{item.text}</p>
              </Link>
            ))}
          </section>

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
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <h2 style={{ marginTop: 0, marginBottom: 0 }}>Mes demarches recentes</h2>
                  <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }}>
                    <option value='all'>Tous</option>
                    <option value='draft'>Brouillons</option>
                    <option value='submitted'>Soumis</option>
                    <option value='in_review'>En cours</option>
                    <option value='validated'>Valides</option>
                    <option value='issued'>Emis</option>
                    <option value='available'>Disponibles</option>
                  </select>
                </div>
                <div style={{ display: 'grid', gap: 14, marginTop: 14 }}>
                  {filteredDossiers.length === 0 ? (
                    <div style={{ border: '1px dashed #cbd5e1', borderRadius: 14, padding: 18, color: '#64748b' }}>Aucun dossier ne correspond au filtre selectionne.</div>
                  ) : null}
                  {filteredDossiers.map((demande) => (
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
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 10 }}>
                        <Link href={'/commune/dossiers/' + encodeURIComponent(demande.reference)} style={{ color: '#1d4ed8', textDecoration: 'none', fontWeight: 700 }}>
                          Ouvrir le detail
                        </Link>
                        {demande.status === 'draft' ? (
                          <Link href={'/commune/dossiers/' + encodeURIComponent(demande.reference) + '/edit'} style={{ color: '#0f766e', textDecoration: 'none', fontWeight: 700 }}>
                            Reprendre le brouillon
                          </Link>
                        ) : null}
                      </div>
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
