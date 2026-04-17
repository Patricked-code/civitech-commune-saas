"use client";

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiGet, apiPost } from '../../../../../lib/api';
import { readToken } from '../../../../../lib/session';
import { ProtectedView } from '../../../../../components/ProtectedView';

export default function AgentInternalCommentsPage() {
  const params = useParams();
  const reference = Array.isArray(params.reference) ? params.reference[0] : params.reference;
  const [dossier, setDossier] = useState(null);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');

  async function load() {
    const token = readToken();
    if (!token || !reference) return;
    try {
      const response = await apiGet('/api/dossiers/' + encodeURIComponent(reference), token);
      setDossier(response);
      setStatus('');
    } catch (error) {
      setStatus('Chargement des commentaires internes impossible.');
    }
  }

  useEffect(() => {
    load();
  }, [reference]);

  const internalComments = useMemo(() => {
    return (dossier?.events || []).filter((item) => item.eventType === 'INTERNAL_COMMENT');
  }, [dossier]);

  async function submitComment(event) {
    event.preventDefault();
    const token = readToken();
    if (!token || !reference || !comment) return;
    try {
      await apiPost('/api/agent/dossiers/' + encodeURIComponent(reference) + '/internal-comments', { comment }, token);
      setComment('');
      setStatus('Commentaire interne ajoute.');
      await load();
    } catch (error) {
      setStatus('Ajout du commentaire interne impossible.');
    }
  }

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Panneau commentaires internes</h1>
            <p style={{ color: '#475569', lineHeight: 1.7 }}>Vue agent dediee aux commentaires internes de traitement pour le dossier {reference}.</p>
          </div>
          {status ? <p style={{ color: status.includes('impossible') ? '#b91c1c' : '#166534' }}>{status}</p> : null}
          <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
            <form onSubmit={submitComment} style={{ display: 'grid', gap: 12 }}>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Ajouter un commentaire interne de traitement' style={{ minHeight: 120, padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
              <button type='submit' style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>Ajouter le commentaire interne</button>
            </form>
          </section>
          <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Historique interne</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {internalComments.map((item, index) => (
                <article key={item.id || index} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                  <div style={{ fontWeight: 700 }}>{item.eventLabel}</div>
                  <pre style={{ whiteSpace: 'pre-wrap', marginTop: 10, background: '#f8fafc', padding: 12, borderRadius: 10 }}>{item.payloadJson || ''}</pre>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </ProtectedView>
  );
}
