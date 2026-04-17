"use client";

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiGet, apiPut } from '../../../../../lib/api';
import { readToken } from '../../../../../lib/session';
import { ProtectedView } from '../../../../../components/ProtectedView';

function parsePayload(payloadJson) {
  if (!payloadJson) return {};
  try {
    return JSON.parse(payloadJson);
  } catch (error) {
    return {};
  }
}

export default function EditDraftPage() {
  const params = useParams();
  const router = useRouter();
  const reference = Array.isArray(params.reference) ? params.reference[0] : params.reference;
  const [dossier, setDossier] = useState(null);
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function load() {
      const token = readToken();
      if (!token || !reference) return;
      try {
        const response = await apiGet('/api/dossiers/' + encodeURIComponent(reference), token);
        setDossier(response);
        const initialPayload = response.events && response.events.length ? parsePayload(response.events[0].payloadJson) : {};
        setFormData(initialPayload);
      } catch (error) {
        setStatus('Chargement du brouillon impossible.');
      }
    }
    load();
  }, [reference]);

  const entries = useMemo(() => Object.entries(formData || {}), [formData]);

  async function saveDraft(event) {
    event.preventDefault();
    const token = readToken();
    if (!token || !reference) return;
    try {
      await apiPut('/api/dossiers/' + encodeURIComponent(reference) + '/draft', { formData }, token);
      setStatus('Brouillon mis a jour avec succes.');
      router.push('/commune/dossiers/' + encodeURIComponent(reference));
    } catch (error) {
      setStatus('Mise a jour du brouillon impossible.');
    }
  }

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Reprendre un brouillon</h1>
            <p style={{ color: '#475569', lineHeight: 1.7 }}>Edition reelle d un brouillon existant depuis l espace citoyen.</p>
          </div>
          {status ? <p style={{ color: status.includes('impossible') ? '#b91c1c' : '#166534' }}>{status}</p> : null}
          {dossier ? (
            <form onSubmit={saveDraft} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24, display: 'grid', gap: 14 }}>
              {entries.map(([key, value]) => (
                <label key={key} style={{ display: 'grid', gap: 8 }}>
                  <span style={{ fontWeight: 700 }}>{key}</span>
                  <input value={String(value ?? '')} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                </label>
              ))}
              <button type='submit' style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10, fontWeight: 700 }}>
                Sauvegarder le brouillon
              </button>
            </form>
          ) : null}
        </div>
      </main>
    </ProtectedView>
  );
}
