"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiGet } from '../../../lib/api';
import { readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';
import { RoleProtected } from '../../../components/RoleProtected';
import type { DossierListItem } from '../../../lib/appTypes';

export default function AgentPrioriteDuJourPage() {
  const [rows, setRows] = useState<DossierListItem[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function load() {
      const token = readToken();
      if (!token) {
        setStatus('Session absente.');
        return;
      }
      try {
        const response = await apiGet('/api/agent/queue?status=all&procedureCode=all', token);
        setRows(response.data || []);
        setStatus('');
      } catch (error) {
        setStatus('Chargement de la priorite du jour impossible.');
      }
    }
    load();
  }, []);

  const topRows = useMemo(() => rows.slice(0, 10), [rows]);

  return (
    <ProtectedView>
      <RoleProtected roles={['agent', 'service_manager', 'commune_admin', 'super_admin']}>
        <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 24 }}>
            <div>
              <h1 style={{ fontSize: 38, marginBottom: 8 }}>Priorité du jour</h1>
              <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 900 }}>
                Cette vue isole les dossiers les plus prioritaires selon le moteur de scoring agent et facilite le pilotage quotidien du traitement.
              </p>
            </div>
            {status ? <p style={{ color: status.includes('impossible') ? '#b91c1c' : '#166534' }}>{status}</p> : null}
            <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
              <div style={{ display: 'grid', gap: 12 }}>
                {topRows.map((item) => (
                  <article key={item.reference} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                    <strong>{item.reference}</strong>
                    <div style={{ color: '#334155', marginTop: 4 }}>{item.procedureTitle || item.procedureCode || item.procedureId}</div>
                    <div style={{ color: '#334155', marginTop: 4 }}>Statut : {item.status}</div>
                    <div style={{ color: '#0f172a', marginTop: 4, fontWeight: 700 }}>Priorité : {item.priorityScore ?? 0}</div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 10 }}>
                      <Link href={'/commune/dossiers/' + encodeURIComponent(item.reference)} style={{ color: '#1d4ed8', textDecoration: 'none', fontWeight: 700 }}>Ouvrir le dossier</Link>
                      <Link href={'/commune/agent-dossiers/' + encodeURIComponent(item.reference) + '/internal-comments'} style={{ color: '#0f766e', textDecoration: 'none', fontWeight: 700 }}>Commentaires internes</Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </main>
      </RoleProtected>
    </ProtectedView>
  );
}
