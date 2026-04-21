"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { apiGet, apiPost, apiPut } from '../../../../lib/api';
import { readToken } from '../../../../lib/session';
import { ProtectedView } from '../../../../components/ProtectedView';
import { useSessionContext } from '../../../../components/SessionProvider';
import { canAdvanceWorkflow, canResumeDraft, canValidateDocuments } from '../../../../lib/roleGuards';
import type { DossierDetail, DossierDocument, DossierEvent } from '../../../../lib/appTypes';

function parsePayload(payloadJson?: string): Record<string, unknown> | null {
  if (!payloadJson) return null;
  try {
    return JSON.parse(payloadJson) as Record<string, unknown>;
  } catch (error) {
    return null;
  }
}

type AttachmentState = {
  documentType: string;
  storageKey: string;
  originalFilename: string;
  mimeType: string;
};

export default function DossierDetailPage() {
  const params = useParams();
  const { user } = useSessionContext();
  const reference = Array.isArray(params.reference) ? params.reference[0] : params.reference;
  const [dossier, setDossier] = useState<DossierDetail | null>(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [workflowComment, setWorkflowComment] = useState('');
  const [attachment, setAttachment] = useState<AttachmentState>({
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
      setDossier(response as DossierDetail);
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

  const commentEvents = useMemo((): DossierEvent[] => {
    return (dossier?.events || []).filter((item) => item.eventType === 'WORKFLOW_COMMENT');
  }, [dossier]);

  async function submitDraft() {
    const token = readToken();
    if (!token || !reference) return;
    try {
      await apiPost('/api/dossiers/' + encodeURIComponent(reference) + '/submit', { comment: 'Soumission depuis l interface citoyenne' }, token);
      setStatus('Brouillon soumis avec succes.');
      await load();
    } catch (error) {
      setStatus('Soumission impossible.');
    }
  }

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

  async function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = readToken();
    if (!token || !reference || !workflowComment) return;
    try {
      await apiPost('/api/dossiers/' + encodeURIComponent(reference) + '/comments', { comment: workflowComment }, token);
      setWorkflowComment('');
      setStatus('Commentaire workflow ajoute.');
      await load();
    } catch (error) {
      setStatus('Ajout du commentaire impossible.');
    }
  }

  async function handleSimulatedFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const token = readToken();
    if (!token) return;
    try {
      let prepared: { storageKey?: string } | null = null;
      try {
        prepared = await apiPost('/api/uploads/prepare', { originalFilename: file.name, mimeType: file.type || 'application/octet-stream' }, token);
      } catch (prepError) {
        prepared = null;
      }
      setAttachment((prev) => ({
        ...prev,
        originalFilename: file.name,
        mimeType: file.type || 'application/octet-stream',
        storageKey: prepared?.storageKey || 'simulated-uploads/' + Date.now() + '-' + file.name,
      }));
      if (prepared?.storageKey) {
        setStatus('Preparation d upload simulee effectuee.');
      }
    } catch (error) {
      setStatus('Preparation d upload impossible.');
    }
  }

  async function addAttachment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = readToken();
    if (!token || !reference) return;
    try {
      await apiPost('/api/dossiers/' + encodeURIComponent(reference) + '/attachments', attachment, token);
      setStatus('Piece jointe simulee ajoutee.');
      setAttachment({ documentType: 'piece-identite', storageKey: '', originalFilename: '', mimeType: 'application/pdf' });
      await load();
    } catch (error) {
      setStatus('Ajout de piece jointe impossible.');
    }
  }

  async function updateDocumentStatus(documentId: string, validationStatus: string) {
    const token = readToken();
    if (!token || !reference) return;
    try {
      await apiPut('/api/dossiers/' + encodeURIComponent(reference) + '/attachments/' + encodeURIComponent(documentId) + '/status', { validationStatus }, token);
      setStatus('Statut documentaire mis a jour.');
      await load();
    } catch (error) {
      setStatus('Mise a jour du statut documentaire impossible.');
    }
  }

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Detail dossier</h1>
            <p style={{ color: '#475569', lineHeight: 1.7 }}>
              Cette page lit les donnees persistées du dossier, parse le payload metier et expose des actions de soumission, workflow, commentaires et pieces jointes.
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
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
                  <button onClick={submitDraft} style={{ background: '#0f766e', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>
                    Soumettre le brouillon
                  </button>
                  {canAdvanceWorkflow(user) ? (
                    <button onClick={moveToNextStep} style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>
                      Passer a l etape suivante
                    </button>
                  ) : null}
                  {dossier.status === 'draft' && canResumeDraft(user) ? (
                    <Link href={'/commune/dossiers/' + encodeURIComponent(dossier.reference) + '/edit'} style={{ background: '#fff', color: '#0f766e', border: '1px solid #0f766e', padding: '12px 16px', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>
                      Editer le brouillon
                    </Link>
                  ) : null}
                </div>
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
                <h2 style={{ marginTop: 0 }}>Commentaires workflow</h2>
                <form onSubmit={addComment} style={{ display: 'grid', gap: 12 }}>
                  <textarea placeholder='Ajouter un commentaire de traitement ou de suivi' value={workflowComment} onChange={(e) => setWorkflowComment(e.target.value)} style={{ minHeight: 120, padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                  <button type='submit' style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>
                    Ajouter le commentaire
                  </button>
                </form>
                <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
                  {commentEvents.map((eventItem, index) => (
                    <article key={eventItem.id || index} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                      <div style={{ fontWeight: 700 }}>{eventItem.eventLabel}</div>
                      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 10, background: '#f8fafc', padding: 12, borderRadius: 10 }}>{eventItem.payloadJson || ''}</pre>
                    </article>
                  ))}
                </div>
              </section>

              <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
                <h2 style={{ marginTop: 0 }}>Pieces jointes</h2>
                <div style={{ display: 'grid', gap: 12 }}>
                  {(dossier.documents || []).map((document: DossierDocument, index) => (
                    <article key={document.id || index} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                      <div><strong>{document.originalFilename}</strong></div>
                      <div style={{ color: '#64748b', marginTop: 4 }}>{document.documentType}</div>
                      <div style={{ color: '#64748b', marginTop: 4 }}>{document.mimeType}</div>
                      <div style={{ color: '#334155', marginTop: 4 }}>Statut documentaire : {document.validationStatus || 'PENDING'}</div>
                      {canValidateDocuments(user) ? (
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
                          <button onClick={() => updateDocumentStatus(document.id, 'APPROVED')} style={{ background: '#0f766e', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 8 }}>
                            Marquer approuve
                          </button>
                          <button onClick={() => updateDocumentStatus(document.id, 'REJECTED')} style={{ background: '#b91c1c', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 8 }}>
                            Marquer rejete
                          </button>
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>

                <form onSubmit={addAttachment} style={{ display: 'grid', gap: 12, marginTop: 18 }}>
                  <input placeholder='Type de document' value={attachment.documentType} onChange={(e) => setAttachment({ ...attachment, documentType: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                  <input type='file' onChange={handleSimulatedFileChange} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', background: '#fff' }} />
                  <input placeholder='Storage key de demonstration' value={attachment.storageKey} onChange={(e) => setAttachment({ ...attachment, storageKey: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                  <input placeholder='Nom original du fichier' value={attachment.originalFilename} onChange={(e) => setAttachment({ ...attachment, originalFilename: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                  <input placeholder='Mime type' value={attachment.mimeType} onChange={(e) => setAttachment({ ...attachment, mimeType: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                  <button type='submit' style={{ background: '#0f766e', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>
                    Ajouter une piece jointe simulee
                  </button>
                </form>
              </section>

              <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
                <h2 style={{ marginTop: 0 }}>Evenements persistés</h2>
                <div style={{ display: 'grid', gap: 12 }}>
                  {(dossier.events || []).filter((item) => item.eventType !== 'WORKFLOW_COMMENT').map((eventItem, index) => (
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
