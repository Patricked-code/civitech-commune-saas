"use client";

import { useState } from 'react';
import { apiPost } from '../../../../lib/api';
import { readToken } from '../../../../lib/session';
import { ProtectedView } from '../../../../components/ProtectedView';

export default function OrganisationMariagePage() {
  const [form, setForm] = useState({
    applicantFirstName: '',
    applicantLastName: '',
    applicantPhone: '',
    spouseOneFullName: '',
    spouseTwoFullName: '',
    preferredDate: '',
    celebrationPlace: '',
    witnessCount: '',
    observations: '',
  });
  const [createdReference, setCreatedReference] = useState('');
  const [status, setStatus] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const token = readToken();
    if (!token) {
      setStatus('Session absente.');
      return;
    }

    try {
      const response = await apiPost('/api/dossiers', {
        procedureCode: 'STATE_CIVIL_MARRIAGE',
        service: 'Etat civil',
        formData: form,
      }, token);
      setCreatedReference(response.reference || '');
      setStatus('Demande d organisation de mariage enregistree comme brouillon.');
      setForm({
        applicantFirstName: '',
        applicantLastName: '',
        applicantPhone: '',
        spouseOneFullName: '',
        spouseTwoFullName: '',
        preferredDate: '',
        celebrationPlace: '',
        witnessCount: '',
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
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Organisation de mariage</h1>
            <p style={{ color: '#475569', lineHeight: 1.7 }}>
              Quatrieme formulaire metier reel connecte au backend. Il cree un brouillon de dossier de mariage avec les informations preparatoires de celebration.
            </p>
          </div>

          {status ? <p style={{ color: status.includes('impossible') ? '#b91c1c' : '#166534' }}>{status}</p> : null}
          {createdReference ? <p style={{ color: '#1e3a8a', fontWeight: 700 }}>Reference creee : {createdReference}</p> : null}

          <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24, display: 'grid', gap: 16 }}>
            <h2 style={{ marginTop: 0 }}>Informations du demandeur</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input placeholder='Prenom demandeur' value={form.applicantFirstName} onChange={(e) => setForm({ ...form, applicantFirstName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
              <input placeholder='Nom demandeur' value={form.applicantLastName} onChange={(e) => setForm({ ...form, applicantLastName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            </div>
            <input placeholder='Telephone demandeur' value={form.applicantPhone} onChange={(e) => setForm({ ...form, applicantPhone: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />

            <h2>Informations mariage</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <input placeholder='Nom complet epoux 1' value={form.spouseOneFullName} onChange={(e) => setForm({ ...form, spouseOneFullName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
              <input placeholder='Nom complet epoux 2' value={form.spouseTwoFullName} onChange={(e) => setForm({ ...form, spouseTwoFullName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input type='date' value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
              <input placeholder='Lieu de celebration souhaite' value={form.celebrationPlace} onChange={(e) => setForm({ ...form, celebrationPlace: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            </div>
            <input placeholder='Nombre de temoins prevus' value={form.witnessCount} onChange={(e) => setForm({ ...form, witnessCount: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            <textarea placeholder='Observations complementaires' value={form.observations} onChange={(e) => setForm({ ...form, observations: e.target.value })} style={{ minHeight: 120, padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />

            <button type='submit' style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '14px 18px', borderRadius: 12, fontWeight: 700 }}>
              Creer le brouillon de mariage
            </button>
          </form>
        </div>
      </main>
    </ProtectedView>
  );
}
