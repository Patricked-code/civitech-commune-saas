"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiGet, apiPost, getApiErrorMessage } from '../../../lib/api';
import { readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';
import type { DossierListItem } from '../../../lib/appTypes';

export default function AgentDossiersPage() {
  const [dossiers, setDossiers] = useState<DossierListItem[]>([]);
  const [status, setStatus] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [procedureFilter, setProcedureFilter] = useState('all');

  async function load() {
    const token = readToken();
    if (!token) {
      setStatus('Session absente.');
      return;
    }
    try {
      const query = new URLSearchParams({ status: statusFilter, procedureCode: procedureFilter }).toString();
      const response = await apiGet('/api/agent/queue?' + query, token);
      setDossiers(response.data || []);
      setStatus('');
    } catch (error) {
      setStatus(getApiErrorMessage(error, 'Chargement des dossiers impossible.'));
    }
  }

  useEffect(() => {
    load();
  }, [statusFilter, procedureFilter]);

  const procedureOptions = Array.from(new Set(dossiers.map((item) => item.procedureCode || item.procedureId))).filter(Boolean) as string[];

  const queueStats = useMemo(() => {
    return {
      total: dossiers.length,
      submitted: dossiers.filter((item) => item.status === 'submitted').length,
      inReview: dossiers.filter((item) => item.status === 'in_review').length,
      highPriority: dossiers.filter((item) => (item.priorityScore || 0) >= 80).length,
    };
  }, [dossiers]);

  async function pushNext(reference: string) {
    const token = readToken();
    if (!token) return;
    try {
      await apiPost('/api/dossiers/' + encodeURIComponent(reference) + '/next-step', { comment: 'Transition agent depuis la file de traitement' }, token);
      setStatus('Transition agent effectuee.');
      await load();
    } catch (error) {
      setStatus(getApiErrorMessage(error, 'Transition agent impossible.'));
    }
  }

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px', color: '#0f172a' }}>
        <div style={{ maxWidth: 1220, margin: '0 auto', display: 'grid', gap: 24 }}>
          <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 60%, #0ea5e9 100%)', color: '#fff', borderRadius: 26, padding: 30 }}>
            <div style={{ display: 'inline-block', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', fontWeight: 900, marginBottom: 14 }}>
              Cockpit agent · File de traitement
            </div>
            <h1 style={{ fontSize: 40, lineHeight: 1.1, margin: 0 }}>Priorites dossiers</h1>
            <p style={{ lineHeight: 1.75, opacity: 0.95, maxWidth: 860 }}>
              Vue de travail pour filtrer les dossiers, comprendre les priorites, avancer les workflows et acceder rapidement aux commentaires internes.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
              <Link href='/commune/admin-console' style={{ background: '#fff', color: '#0f172a', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 900 }}>Cockpit mairie</Link>
              <Link href='/commune/agent-validation-documents' style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.35)', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 900 }}>Validation documentaire</Link>
            </div>
          </section>

          {status ? <p style={{ color: status.includes('impossible') || status.includes('absente') ? '#b91c1c' : '#166534', background: status.includes('impossible') || status.includes('absente') ? '#fee2e2' : '#dcfce7', border: '1px solid ' + (status.includes('impossible') || status.includes('absente') ? '#fecaca' : '#bbf7d0'), padding: 14, borderRadius: 14 }}>{status}</p> : null}

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { label: 'Dossiers filtres', value: queueStats.total },
              { label: 'Soumis', value: queueStats.submitted },
              { label: 'En revue', value: queueStats.inReview },
              { label: 'Haute priorite', value: queueStats.highPriority },
            ].map((item) => (
              <article key={item.label} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: 20, boxShadow: '0 8px 24px rgba(15,23,42,0.05)' }}>
                <div style={{ color: '#64748b', fontWeight: 800 }}>{item.label}</div>
                <div style={{ fontSize: 32, fontWeight: 900, marginTop: 8 }}>{item.value}</div>
              </article>
            ))}
          </section>

          <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 22, padding: 24, boxShadow: '0 10px 30px rgba(15,23,42,0.06)' }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ marginTop: 0, marginBottom: 0, fontSize: 28 }}>File de traitement priorisee</h2>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }}>
                  <option value='all'>Tous statuts</option>
                  <option value='submitted'>submitted</option>
                  <option value='in_review'>in_review</option>
                  <option value='validated'>validated</option>
                  <option value='issued'>issued</option>
                  <option value='available'>available</option>
                </select>
                <select value={procedureFilter} onChange={(e) => setProcedureFilter(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }}>
                  <option value='all'>Toutes procedures</option>
                  {procedureOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
              {dossiers.length === 0 ? (
                <div style={{ border: '1px dashed #cbd5e1', borderRadius: 14, padding: 18, color: '#64748b' }}>Aucun dossier ne correspond aux filtres selectionnes.</div>
              ) : null}
              {dossiers.map((dossier) => (
                <article key={dossier.reference} style={{ border: '1px solid #e2e8f0', borderRadius: 16, padding: 18, background: '#fcfdff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div>
                      <strong style={{ fontSize: 18 }}>{dossier.reference}</strong>
                      <div style={{ color: '#334155', marginTop: 4 }}>{dossier.procedureTitle || dossier.procedureCode || dossier.procedureId}</div>
                    </div>
                    <div style={{ display: 'grid', gap: 6, justifyItems: 'end' }}>
                      <span style={{ color: '#1d4ed8', fontWeight: 900 }}>Priorite : {dossier.priorityScore ?? 0}</span>
                      <span style={{ color: '#334155' }}>Statut : {dossier.status}</span>
                    </div>
                  </div>
                  <div style={{ color: '#334155', marginTop: 10 }}>Etape : {dossier.currentStep}</div>
                  <div style={{ color: '#334155', marginTop: 4 }}>Prochaine etape : {dossier.nextStep || 'N/A'}</div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                    <button onClick={() => pushNext(dossier.reference)} style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 10, fontWeight: 800 }}>
                      Avancer le workflow
                    </button>
                    <Link href={'/commune/dossiers/' + encodeURIComponent(dossier.reference)} style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none', paddingTop: 10 }}>
                      Ouvrir le detail
                    </Link>
                    <Link href={'/commune/agent-dossiers/' + encodeURIComponent(dossier.reference) + '/internal-comments'} style={{ color: '#0f766e', fontWeight: 800, textDecoration: 'none', paddingTop: 10 }}>
                      Commentaires internes
                    </Link>
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
