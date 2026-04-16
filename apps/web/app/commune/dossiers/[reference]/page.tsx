"use client";

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiGet, apiPost } from '../../../../lib/api';
import { readToken } from '../../../../lib/session';
import { ProtectedView } from '../../../../components/ProtectedView';

function parsePayload(payloadJson) {
  if (!payloadJson) return null;
  try {
    return JSON.parse(payloadJson);
  } catch (error) {
    return null;
  }
}

export default function DossierDetailPage() {
  const params = useParams();
  const reference = Array.isArray(params.reference) ? params.reference[0] : params.reference;
  const [dossier, setDossier] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [attachment, setAttachment] = useState({
    documentType: 'piece-identite',
    storageKey: '',
    originalFilename: '',
    mimeType: 'application/pdf',
  });

  async function load() {
    const token = readToken();
    if (!token || !reference) {
      setError('Session ou reference absente.');
      return;
    }
    try {
      const response = await apiGet('/api/dossiers/' + encodeURIComponent(reference), token);
      setDossier(response);
      setError('');
    } catch (err) {
      setError('Impossible de charger le detail du dossier.');
    }
  }

  useEffect(() => {
    load();
  }, [reference]);

  const firstPayload = useMemo(() => {
    if (!dossier || !dossier.events || dossier.events.length === 0) return null;
    return parsePayload(dossier.events[0].payloadJson);
  }, [dossier]);

  async function moveToNextStep() {
    const token = readToken();
    if (!token || !reference) return;
    try {
      await apiPost('/api/dossiers/' + encodeURIComponent(reference) + '/next-step', { comment: 'Transition depuis l interface detail dossier' }, token);
      setStatus('Transition de workflow effectuee.');
      await load();
    } catch (error) {
      setStatus('Transition impossible.');
    }
  }

  async function addAttachment(event) {
    event.preventDefault();
    const token = readToken();
    if (!token || !reference) return;
    try {
      await apiPost('/api/dossiers/' + encodeURIComponent(reference) + '/attachments', attachment, token);
      setStatus('Piece jointe de demonstration ajoutee.');
      setAttachment({ documentType: 'piece-identite', storageKey: '', originalFilename: '', mimeType: 'application/pdf' });
      await load();
    } catch (error) {
      setStatus('Ajout de piece jointe impossible.');
    }
  }

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Detail dossier</h1>
            <p style={{ color: '#475569', lineHeight: 1.7 }}>
              Cette page lit les donnees persistées du dossier, parse le payload metier et expose des actions de workflow et de pieces jointes.
            </p>
          </div>

          {error ? <p style={{ color: '#b91c1c' }}>{error}</p> : null}
          {status ? <p style={{ color: status.includes('impossible') ? '#b91c1c' : '#166534' }}>{status}</p> : null}

          {dossier ? (
            <>
              <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
                <h2 style={{ marginTop: 0 }}>Informations generales</h2>
                <div style={{ display: 'grid', gap: 8, color: '#334155' }}>
                  <div><strong>Reference :</strong> {dossier.reference}</div>
                  <div><strong>Procedure :</strong> {dossier.procedureTitle || dossier.procedureCode || dossier.procedureId}</div>
                  <div><strong>Statut :</strong> {dossier.status}</div>
                  <div><strong>Etape courante :</strong> {dossier.currentStep}</div>
                  <div><strong>Prochaine etape :</strong> {dossier.nextStep || 'N/A'}</div>
                  <div><strong>Service :</strong> {dossier.service}</div>
                </div>
                <button onClick={moveToNextStep} style={{ marginTop: 16, background: '#1d4ed8', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>
                  Passer a l etape suivante
                </button>
              </section>

              <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
                <h2 style={{ marginTop: 0 }}>Donnees metier persistées</h2>
                {firstPayload ? (
                  <div style={{ display: 'grid', gap: 10 }}>
                    {Object.entries(firstPayload).map(([key, value]) => (
                      <div key={key} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>
                        <strong>{key}</strong>
                        <div style={{ color: '#334155', marginTop: 4 }}>{String(value || '')}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#64748b' }}>Aucune donnee metier parsee.</p>
                )}
              </section>

              <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
                <h2 style={{ marginTop: 0 }}>Pieces jointes</h2>
                <div style={{ display: 'grid', gap: 12 }}>
                  {(dossier.documents || []).map((document, index) => (
                    <article key={document.id || index} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                      <div><strong>{document.originalFilename}</strong></div>
                      <div style={{ color: '#64748b', marginTop: 4 }}>{document.documentType}</div>
                      <div style={{ color: '#64748b', marginTop: 4 }}>{document.mimeType}</div>
                    </article>
                  ))}
                </div>

                <form onSubmit={addAttachment} style={{ display: 'grid', gap: 12, marginTop: 18 }}>
                  <input placeholder='Type de document' value={attachment.documentType} onChange={(e) => setAttachment({ ...attachment, documentType: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                  <input placeholder='Storage key de demonstration' value={attachment.storageKey} onChange={(e) => setAttachment({ ...attachment, storageKey: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                  <input placeholder='Nom original du fichier' value={attachment.originalFilename} onChange={(e) => setAttachment({ ...attachment, originalFilename: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                  <input placeholder='Mime type' value={attachment.mimeType} onChange={(e) => setAttachment({ ...attachment, mimeType: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                  <button type='submit' style={{ background: '#0f766e', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>
                    Ajouter une piece jointe de demonstration
                  </button>
                </form>
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
