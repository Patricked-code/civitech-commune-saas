"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiGet, apiPut, getApiErrorMessage } from '../../../lib/api';
import { readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';
import type { AgentDocumentRow } from '../../../lib/appTypes';

export default function AgentValidationDocumentsPage() {
  const [rows, setRows] = useState<AgentDocumentRow[]>([]);
  const [status, setStatus] = useState('');
  const [docFilter, setDocFilter] = useState('PENDING');

  async function load() {
    const token = readToken();
    if (!token) {
      setStatus('Session absente.');
      return;
    }
    try {
      const response = await apiGet('/api/agent/documents', token);
      setRows(response.data || []);
      setStatus('');
    } catch (error) {
      setStatus(getApiErrorMessage(error, 'Chargement des documents impossible.'));
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((row) => docFilter === 'ALL' ? true : (row.document.validationStatus || 'PENDING') === docFilter);
  }, [rows, docFilter]);

  const documentStats = useMemo(() => {
    return {
      total: rows.length,
      pending: rows.filter((row) => (row.document.validationStatus || 'PENDING') === 'PENDING').length,
      approved: rows.filter((row) => row.document.validationStatus === 'APPROVED').length,
      rejected: rows.filter((row) => row.document.validationStatus === 'REJECTED').length,
    };
  }, [rows]);

  async function updateStatus(reference: string, documentId: string, validationStatus: string) {
    const token = readToken();
    if (!token) return;
    try {
      await apiPut('/api/agent/dossiers/' + encodeURIComponent(reference) + '/documents/' + encodeURIComponent(documentId) + '/status', { validationStatus }, token);
      setStatus('Statut documentaire mis a jour.');
      await load();
    } catch (error) {
      setStatus(getApiErrorMessage(error, 'Mise a jour documentaire impossible.'));
    }
  }

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px', color: '#0f172a' }}>
        <div style={{ maxWidth: 1220, margin: '0 auto', display: 'grid', gap: 24 }}>
          <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 60%, #0ea5e9 100%)', color: '#fff', borderRadius: 26, padding: 30 }}>
            <div style={{ display: 'inline-block', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', fontWeight: 900, marginBottom: 14 }}>
              Cockpit agent · Validation documentaire
            </div>
            <h1 style={{ fontSize: 40, lineHeight: 1.1, margin: 0 }}>Documents a controler</h1>
            <p style={{ lineHeight: 1.75, opacity: 0.95, maxWidth: 860 }}>
              Priorisez les pieces en attente, approuvez ou rejetez les documents et revenez rapidement au dossier complet pour conserver une trace claire du traitement.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
              <Link href='/commune/admin-console' style={{ background: '#fff', color: '#0f172a', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 900 }}>Cockpit mairie</Link>
              <Link href='/commune/agent-dossiers' style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.35)', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 900 }}>File dossiers</Link>
            </div>
          </section>

          {status ? <p style={{ color: status.includes('impossible') || status.includes('absente') ? '#b91c1c' : '#166534', background: status.includes('impossible') || status.includes('absente') ? '#fee2e2' : '#dcfce7', border: '1px solid ' + (status.includes('impossible') || status.includes('absente') ? '#fecaca' : '#bbf7d0'), padding: 14, borderRadius: 14 }}>{status}</p> : null}

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { label: 'Documents', value: documentStats.total },
              { label: 'En attente', value: documentStats.pending },
              { label: 'Approuves', value: documentStats.approved },
              { label: 'Rejetes', value: documentStats.rejected },
            ].map((item) => (
              <article key={item.label} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: 20, boxShadow: '0 8px 24px rgba(15,23,42,0.05)' }}>
                <div style={{ color: '#64748b', fontWeight: 800 }}>{item.label}</div>
                <div style={{ fontSize: 32, fontWeight: 900, marginTop: 8 }}>{item.value}</div>
              </article>
            ))}
          </section>

          <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 22, padding: 24, boxShadow: '0 10px 30px rgba(15,23,42,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <h2 style={{ marginTop: 0, marginBottom: 0, fontSize: 28 }}>Documents a controler</h2>
              <select value={docFilter} onChange={(e) => setDocFilter(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }}>
                <option value='ALL'>Tous</option>
                <option value='PENDING'>PENDING</option>
                <option value='APPROVED'>APPROVED</option>
                <option value='REJECTED'>REJECTED</option>
              </select>
            </div>
            <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
              {filtered.length === 0 ? (
                <div style={{ border: '1px dashed #cbd5e1', borderRadius: 14, padding: 18, color: '#64748b' }}>Aucun document ne correspond au filtre selectionne.</div>
              ) : null}
              {filtered.map(({ dossierReference, procedureTitle, dossierStatus, document }) => (
                <article key={document.id} style={{ border: '1px solid #e2e8f0', borderRadius: 16, padding: 18, background: '#fcfdff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div>
                      <strong style={{ fontSize: 18 }}>{document.originalFilename}</strong>
                      <div style={{ color: '#334155', marginTop: 4 }}>Dossier : {dossierReference}</div>
                      <div style={{ color: '#334155', marginTop: 4 }}>Procedure : {procedureTitle}</div>
                    </div>
                    <div style={{ display: 'grid', gap: 6, justifyItems: 'end' }}>
                      <span style={{ color: '#1d4ed8', fontWeight: 900 }}>Document : {document.validationStatus || 'PENDING'}</span>
                      <span style={{ color: '#334155' }}>Dossier : {dossierStatus}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                    <button onClick={() => updateStatus(dossierReference, document.id, 'APPROVED')} style={{ background: '#0f766e', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 10, fontWeight: 800 }}>
                      Approuver
                    </button>
                    <button onClick={() => updateStatus(dossierReference, document.id, 'REJECTED')} style={{ background: '#b91c1c', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 10, fontWeight: 800 }}>
                      Rejeter
                    </button>
                    <Link href={'/commune/dossiers/' + encodeURIComponent(dossierReference)} style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none', paddingTop: 10 }}>
                      Ouvrir le dossier
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
