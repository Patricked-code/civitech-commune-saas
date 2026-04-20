"use client";

import { useState, type FormEvent } from 'react';
import { apiPost } from '../../../../lib/api';
import { readToken } from '../../../../lib/session';
import { ProtectedView } from '../../../../components/ProtectedView';

export default function DemandeCopieActePage() {
  const [form, setForm] = useState({
    requesterFirstName: '',
    requesterLastName: '',
    requesterPhone: '',
    typeActe: 'naissance',
    personneConcernee: '',
    dateApprox: '',
    lieuEnregistrement: '',
    referenceAncienne: '',
    motif: '',
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
        procedureCode: 'STATE_CIVIL_COPY',
        service: 'Etat civil',
        formData: form,
      }, token);
      setCreatedReference(response.reference || '');
      setStatus('Demande de copie d acte enregistree comme brouillon.');
      setForm({
        requesterFirstName: '',
        requesterLastName: '',
        requesterPhone: '',
        typeActe: 'naissance',
        personneConcernee: '',
        dateApprox: '',
        lieuEnregistrement: '',
        referenceAncienne: '',
        motif: '',
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
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Demande de copie d acte</h1>
            <p style={{ color: '#475569', lineHeight: 1.7 }}>
              Deuxieme formulaire metier reel connecte au backend. Il persiste un brouillon de dossier de type copie d acte avec les informations de recherche fournies par le demandeur.
            </p>
          </div>

          {status ? <p style={{ color: status.includes('impossible') ? '#b91c1c' : '#166534' }}>{status}</p> : null}
          {createdReference ? <p style={{ color: '#1e3a8a', fontWeight: 700 }}>Reference creee : {createdReference}</p> : null}

          <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24, display: 'grid', gap: 16 }}>
            <h2 style={{ marginTop: 0 }}>Informations du demandeur</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input placeholder='Prenom demandeur' value={form.requesterFirstName} onChange={(e) => setForm({ ...form, requesterFirstName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
              <input placeholder='Nom demandeur' value={form.requesterLastName} onChange={(e) => setForm({ ...form, requesterLastName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            </div>
            <input placeholder='Telephone' value={form.requesterPhone} onChange={(e) => setForm({ ...form, requesterPhone: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />

            <h2>Recherche d acte</h2>
            <select value={form.typeActe} onChange={(e) => setForm({ ...form, typeActe: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }}>
              <option value='naissance'>Acte de naissance</option>
              <option value='mariage'>Acte de mariage</option>
              <option value='deces'>Acte de deces</option>
            </select>
            <input placeholder='Personne concernee' value={form.personneConcernee} onChange={(e) => setForm({ ...form, personneConcernee: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input type='date' value={form.dateApprox} onChange={(e) => setForm({ ...form, dateApprox: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
              <input placeholder='Lieu d enregistrement' value={form.lieuEnregistrement} onChange={(e) => setForm({ ...form, lieuEnregistrement: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            </div>
            <input placeholder='Reference ancienne ou numero de registre' value={form.referenceAncienne} onChange={(e) => setForm({ ...form, referenceAncienne: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            <textarea placeholder='Motif ou precisions complementaires' value={form.motif} onChange={(e) => setForm({ ...form, motif: e.target.value })} style={{ minHeight: 120, padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />

            <button type='submit' style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '14px 18px', borderRadius: 12, fontWeight: 700 }}>
              Creer le brouillon de demande
            </button>
          </form>
        </div>
      </main>
    </ProtectedView>
  );
}
