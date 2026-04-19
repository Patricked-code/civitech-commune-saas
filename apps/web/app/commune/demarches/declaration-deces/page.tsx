"use client";

import { useState, type FormEvent } from 'react';
import { apiPost } from '../../../../lib/api';
import { readToken } from '../../../../lib/session';
import { ProtectedView } from '../../../../components/ProtectedView';

export default function DeclarationDecesPage() {
  const [form, setForm] = useState({
    declarantFirstName: '',
    declarantLastName: '',
    declarantPhone: '',
    deceasedFullName: '',
    dateDeces: '',
    lieuDeces: '',
    dateNaissanceDefunt: '',
    lienAvecDefunt: '',
    observations: '',
  });
  const [createdReference, setCreatedReference] = useState('');
  const [status, setStatus] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = readToken();
    if (!token) {
      setStatus('Session absente.');
      return;
    }

    try {
      const response = await apiPost('/api/dossiers', {
        procedureCode: 'STATE_CIVIL_DEATH',
        service: 'Etat civil',
        formData: form,
      }, token);
      setCreatedReference(response.reference || '');
      setStatus('Declaration de deces enregistree comme brouillon.');
      setForm({
        declarantFirstName: '',
        declarantLastName: '',
        declarantPhone: '',
        deceasedFullName: '',
        dateDeces: '',
        lieuDeces: '',
        dateNaissanceDefunt: '',
        lienAvecDefunt: '',
        observations: '',
      });
    } catch (error) {
      setStatus('Creation du brouillon impossible.');
    }
  }

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Declaration de deces</h1>
            <p style={{ color: '#475569', lineHeight: 1.7 }}>
              Troisieme formulaire metier reel connecte au backend. Il cree un brouillon de dossier de declaration de deces avec persistance des informations saisies.
            </p>
          </div>

          {status ? <p style={{ color: status.includes('impossible') ? '#b91c1c' : '#166534' }}>{status}</p> : null}
          {createdReference ? <p style={{ color: '#1e3a8a', fontWeight: 700 }}>Reference creee : {createdReference}</p> : null}

          <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24, display: 'grid', gap: 16 }}>
            <h2 style={{ marginTop: 0 }}>Informations du declarant</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input placeholder='Prenom declarant' value={form.declarantFirstName} onChange={(e) => setForm({ ...form, declarantFirstName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
              <input placeholder='Nom declarant' value={form.declarantLastName} onChange={(e) => setForm({ ...form, declarantLastName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            </div>
            <input placeholder='Telephone declarant' value={form.declarantPhone} onChange={(e) => setForm({ ...form, declarantPhone: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />

            <h2>Informations sur le defunt</h2>
            <input placeholder='Nom complet du defunt' value={form.deceasedFullName} onChange={(e) => setForm({ ...form, deceasedFullName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input type='date' value={form.dateDeces} onChange={(e) => setForm({ ...form, dateDeces: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
              <input placeholder='Lieu du deces' value={form.lieuDeces} onChange={(e) => setForm({ ...form, lieuDeces: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input type='date' value={form.dateNaissanceDefunt} onChange={(e) => setForm({ ...form, dateNaissanceDefunt: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
              <input placeholder='Lien avec le defunt' value={form.lienAvecDefunt} onChange={(e) => setForm({ ...form, lienAvecDefunt: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            </div>
            <textarea placeholder='Observations complementaires' value={form.observations} onChange={(e) => setForm({ ...form, observations: e.target.value })} style={{ minHeight: 120, padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />

            <button type='submit' style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '14px 18px', borderRadius: 12, fontWeight: 700 }}>
              Creer le brouillon de declaration
            </button>
          </form>
        </div>
      </main>
    </ProtectedView>
  );
}
