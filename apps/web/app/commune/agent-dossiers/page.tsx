"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiGet, apiPost } from '../../../lib/api';
import { readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';

export default function AgentDossiersPage() {
  const [dossiers, setDossiers] = useState([]);
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
      const response = await apiGet('/api/dossiers', token);
      setDossiers(response.data || []);
      setStatus('');
    } catch (error) {
      setStatus('Chargement des dossiers impossible.');
    }
  }

  useEffect(() => {
    load();
  }, []);

  const procedureOptions = useMemo(() => Array.from(new Set(dossiers.map((item) => item.procedureCode || item.procedureId))).filter(Boolean), [dossiers]);

  const filtered = useMemo(() => {
    return dossiers.filter((item) => {
      const okStatus = statusFilter === 'all' || item.status === statusFilter;
      const okProcedure = procedureFilter === 'all' || (item.procedureCode || item.procedureId) === procedureFilter;
      return okStatus && okProcedure;
    });
  }, [dossiers, statusFilter, procedureFilter]);

  async function pushNext(reference) {
    const token = readToken();
    if (!token) return;
    try {
      await apiPost('/api/dossiers/' + encodeURIComponent(reference) + '/next-step', { comment: 'Transition agent depuis la file de traitement' }, token);
      setStatus('Transition agent effectuee.');
      await load();
    } catch (error) {
      setStatus('Transition agent impossible.');
    }
  }

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Vue agent de traitement dossier</h1>
            <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 900 }}>
              Cette vue offre une file de traitement agent avec filtres de statut et de procedure, acces au detail dossier et action de progression rapide du workflow.
            </p>
          </div>

          {status ? <p style={{ color: status.includes('impossible') ? '#b91c1c' : '#166534' }}>{status}</p> : null}

          <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ marginTop: 0, marginBottom: 0 }}>File de traitement</h2>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }}>
                  <option value='all'>Tous statuts</option>
                  <option value='draft'>draft</option>
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
                <Link href='/commune/agent-validation-documents' style={{ color: '#1d4ed8', textDecoration: 'none', fontWeight: 700, paddingTop: 10 }}>
                  Validation documentaire
                </Link>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
              {filtered.map((dossier) => (
                <article key={dossier.reference} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                  <strong>{dossier.reference}</strong>
                  <div style={{ color: '#334155', marginTop: 4 }}>{dossier.procedureTitle || dossier.procedureCode || dossier.procedureId}</div>
                  <div style={{ color: '#334155', marginTop: 4 }}>Statut : {dossier.status}</div>
                  <div style={{ color: '#334155', marginTop: 4 }}>Etape : {dossier.currentStep}</div>
                  <div style={{ color: '#334155', marginTop: 4 }}>Prochaine etape : {dossier.nextStep || 'N/A'}</div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
                    <button onClick={() => pushNext(dossier.reference)} style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 8 }}>
                      Avancer le workflow
                    </button>
                    <Link href={'/commune/dossiers/' + encodeURIComponent(dossier.reference)} style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'none', paddingTop: 10 }}>
                      Ouvrir le detail
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
