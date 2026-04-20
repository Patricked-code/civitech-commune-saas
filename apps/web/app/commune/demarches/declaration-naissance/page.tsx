"use client";

import { useState, type FormEvent } from 'react';
import { apiPost } from '../../../../lib/api';
import { readToken } from '../../../../lib/session';
import { ProtectedView } from '../../../../components/ProtectedView';

export default function DeclarationNaissancePage() {
  const [form, setForm] = useState({
    declarantFirstName: '',
    declarantLastName: '',
    declarantPhone: '',
    enfantFirstName: '',
    enfantLastName: '',
    dateNaissance: '',
    lieuNaissance: '',
    motherName: '',
    fatherName: '',
    notes: '',
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
        procedureCode: 'STATE_CIVIL_BIRTH',
        service: 'Etat civil',
        formData: form,
      }, token);
      setCreatedReference(response.reference || '');
      setStatus('Brouillon de dossier cree avec succes.');
      setForm({
        declarantFirstName: '',
        declarantLastName: '',
        declarantPhone: '',
        enfantFirstName: '',
        enfantLastName: '',
        dateNaissance: '',
        lieuNaissance: '',
        motherName: '',
        fatherName: '',
        notes: '',
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
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Declaration de naissance</h1>
            <p style={{ color: '#475569', lineHeight: 1.7 }}>
              Premier formulaire metier reel connecte au backend. Il cree un brouillon de dossier et persiste les donnees du formulaire dans l evenement initial du dossier.
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

            <h2>Informations de l enfant</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input placeholder='Prenom enfant' value={form.enfantFirstName} onChange={(e) => setForm({ ...form, enfantFirstName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
              <input placeholder='Nom enfant' value={form.enfantLastName} onChange={(e) => setForm({ ...form, enfantLastName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input type='date' value={form.dateNaissance} onChange={(e) => setForm({ ...form, dateNaissance: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
              <input placeholder='Lieu de naissance' value={form.lieuNaissance} onChange={(e) => setForm({ ...form, lieuNaissance: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input placeholder='Nom de la mere' value={form.motherName} onChange={(e) => setForm({ ...form, motherName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
              <input placeholder='Nom du pere' value={form.fatherName} onChange={(e) => setForm({ ...form, fatherName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            </div>
            <textarea placeholder='Observations complementaires' value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} style={{ minHeight: 120, padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />

            <button type='submit' style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '14px 18px', borderRadius: 12, fontWeight: 700 }}>
              Creer le brouillon de dossier
            </button>
          </form>
        </div>
      </main>
    </ProtectedView>
  );
}
