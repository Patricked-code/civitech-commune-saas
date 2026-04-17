"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiGet, apiPut } from '../../../lib/api';
import { readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';

export default function AgentValidationDocumentsPage() {
  const [rows, setRows] = useState([]);
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
      setStatus('Chargement des documents impossible.');
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((row) => docFilter === 'ALL' ? true : (row.document.validationStatus || 'PENDING') === docFilter);
  }, [rows, docFilter]);

  async function updateStatus(reference, documentId, validationStatus) {
    const token = readToken();
    if (!token) return;
    try {
      await apiPut('/api/agent/dossiers/' + encodeURIComponent(reference) + '/documents/' + encodeURIComponent(documentId) + '/status', { validationStatus }, token);
      setStatus('Statut documentaire mis a jour.');
      await load();
    } catch (error) {
      setStatus('Mise a jour documentaire impossible.');
    }
  }

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Validation documentaire agent</h1>
            <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 900 }}>
              Vue dediee a la validation documentaire, securisee cote agent, avec priorisation naturelle des documents en attente.
            </p>
          </div>

          {status ? <p style={{ color: status.includes('impossible') ? '#b91c1c' : '#166534' }}>{status}</p> : null}

          <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <h2 style={{ marginTop: 0, marginBottom: 0 }}>Documents a controler</h2>
              <select value={docFilter} onChange={(e) => setDocFilter(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }}>
                <option value='ALL'>Tous</option>
                <option value='PENDING'>PENDING</option>
                <option value='APPROVED'>APPROVED</option>
                <option value='REJECTED'>REJECTED</option>
              </select>
            </div>
            <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
              {filtered.map(({ dossierReference, procedureTitle, dossierStatus, document }) => (
                <article key={document.id} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                  <strong>{document.originalFilename}</strong>
                  <div style={{ color: '#334155', marginTop: 4 }}>Dossier : {dossierReference}</div>
                  <div style={{ color: '#334155', marginTop: 4 }}>Procedure : {procedureTitle}</div>
                  <div style={{ color: '#334155', marginTop: 4 }}>Statut dossier : {dossierStatus}</div>
                  <div style={{ color: '#334155', marginTop: 4 }}>Statut document : {document.validationStatus || 'PENDING'}</div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
                    <button onClick={() => updateStatus(dossierReference, document.id, 'APPROVED')} style={{ background: '#0f766e', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 8 }}>
                      Approuver
                    </button>
                    <button onClick={() => updateStatus(dossierReference, document.id, 'REJECTED')} style={{ background: '#b91c1c', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 8 }}>
                      Rejeter
                    </button>
                    <Link href={'/commune/dossiers/' + encodeURIComponent(dossierReference)} style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'none', paddingTop: 10 }}>
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
