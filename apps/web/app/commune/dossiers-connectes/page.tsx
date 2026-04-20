"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../../../lib/api';
import { readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';
import type { DossierListItem } from '../../../lib/appTypes';

export default function DossiersConnectesPage() {
  const [dossiers, setDossiers] = useState<DossierListItem[]>([]);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  async function loadDossiers() {
    const token = readToken();
    if (!token) {
      setError('Connecte-toi d abord via /auth/demo-login');
      return;
    }
    try {
      const response = await apiGet('/api/dossiers', token);
      setDossiers(response.data || []);
    } catch (err) {
      setError('Impossible de charger les dossiers.');
    }
  }

  useEffect(() => {
    loadDossiers();
  }, []);

  async function createSampleDossier() {
    const token = readToken();
    if (!token) {
      setError('Aucun token disponible.');
      return;
    }
    setCreating(true);
    try {
      await apiPost('/api/dossiers', { procedureCode: 'STATE_CIVIL_BIRTH', service: 'Etat civil', formData: { sample: true } }, token);
      await loadDossiers();
    } catch (err) {
      setError('Creation impossible.');
    } finally {
      setCreating(false);
    }
  }

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontSize: 38, marginBottom: 8 }}>Dossiers connectes</h1>
              <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 900 }}>
                Cette page consomme les endpoints proteges de gestion des dossiers et fournit un acces direct vers la page detail de chaque dossier.
              </p>
            </div>
            <button onClick={createSampleDossier} disabled={creating} style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>
              {creating ? 'Creation...' : 'Creer un dossier test'}
            </button>
          </div>

          {error ? <p style={{ color: '#b91c1c', marginTop: 18 }}>{error}</p> : null}

          <section style={{ background: '#fff', borderRadius: 18, border: '1px solid #e5e7eb', padding: 24, marginTop: 24 }}>
            <h2 style={{ marginTop: 0 }}>Liste des dossiers</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {dossiers.map((dossier) => (
                <article key={dossier.reference} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                  <strong>{dossier.reference}</strong>
                  <div style={{ color: '#334155', marginTop: 4 }}>Procedure: {dossier.procedureTitle || dossier.procedureCode || dossier.procedureId}</div>
                  <div style={{ color: '#334155', marginTop: 4 }}>Statut: {dossier.status}</div>
                  <div style={{ color: '#334155', marginTop: 4 }}>Etape courante: {dossier.currentStep}</div>
                  <div style={{ color: '#334155', marginTop: 4 }}>Prochaine etape: {dossier.nextStep || 'N/A'}</div>
                  <div style={{ color: '#334155', marginTop: 4 }}>Documents: {dossier.documentsCount || 0}</div>
                  <Link href={'/commune/dossiers/' + encodeURIComponent(dossier.reference)} style={{ display: 'inline-block', marginTop: 10, color: '#1d4ed8', textDecoration: 'none', fontWeight: 700 }}>
                    Ouvrir le detail du dossier
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </ProtectedView>
  );
}
