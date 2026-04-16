"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiGet } from '../../../../lib/api';
import { readToken } from '../../../../lib/session';
import { ProtectedView } from '../../../../components/ProtectedView';

export default function DossierDetailPage() {
  const params = useParams();
  const reference = Array.isArray(params.reference) ? params.reference[0] : params.reference;
  const [dossier, setDossier] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const token = readToken();
      if (!token || !reference) {
        setError('Session ou reference absente.');
        return;
      }
      try {
        const response = await apiGet('/api/dossiers/' + encodeURIComponent(reference), token);
        setDossier(response);
      } catch (err) {
        setError('Impossible de charger le detail du dossier.');
      }
    }
    load();
  }, [reference]);

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Detail dossier</h1>
            <p style={{ color: '#475569', lineHeight: 1.7 }}>
              Cette page lit les donnees persistées du dossier et l evenement initial contenant le payload metier du formulaire.
            </p>
          </div>

          {error ? <p style={{ color: '#b91c1c' }}>{error}</p> : null}

          {dossier ? (
            <>
              <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
                <h2 style={{ marginTop: 0 }}>Informations generales</h2>
                <div style={{ display: 'grid', gap: 8, color: '#334155' }}>
                  <div><strong>Reference :</strong> {dossier.reference}</div>
                  <div><strong>Procedure :</strong> {dossier.procedureId}</div>
                  <div><strong>Statut :</strong> {dossier.status}</div>
                  <div><strong>Etape courante :</strong> {dossier.currentStep}</div>
                  <div><strong>Service :</strong> {dossier.service}</div>
                </div>
              </section>

              <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
                <h2 style={{ marginTop: 0 }}>Evenements persistés</h2>
                <div style={{ display: 'grid', gap: 12 }}>
                  {(dossier.events || []).map((eventItem, index) => (
                    <article key={eventItem.id || index} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                      <div><strong>{eventItem.eventType}</strong></div>
                      <div style={{ color: '#64748b', marginTop: 4 }}>{eventItem.eventLabel}</div>
                      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 10, background: '#f8fafc', padding: 12, borderRadius: 10, overflowX: 'auto' }}>
{eventItem.payloadJson || ''}
                      </pre>
                    </article>
                  ))}
                </div>
              </section>
            </>
          ) : null}
        </div>
      </main>
    </ProtectedView>
  );
}
