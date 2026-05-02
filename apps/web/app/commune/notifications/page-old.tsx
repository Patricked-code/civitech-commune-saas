"use client";

import Link from 'next/link';
import { ProtectedView } from '../../../components/ProtectedView';

const notifications = [
  { title: 'Dossier soumis', level: 'Information', text: 'Votre dossier a ete enregistre et transmis au service communal concerne.', status: 'prepare' },
  { title: 'Piece a verifier', level: 'Document', text: 'Une piece jointe pourra necessiter une verification ou une correction par le citoyen.', status: 'a venir' },
  { title: 'Etape de traitement', level: 'Workflow', text: 'Les changements d etape seront affiches ici pour faciliter le suivi de vos demandes.', status: 'a venir' },
];

export default function NotificationsPage() {
  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', padding: '34px 20px 58px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', display: 'grid', gap: 24 }}>
          <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 24, padding: 28, boxShadow: '0 10px 30px rgba(15,23,42,0.06)' }}>
            <div style={{ color: '#1d4ed8', fontWeight: 900, marginBottom: 8 }}>Espace citoyen</div>
            <h1 style={{ margin: 0, fontSize: 38 }}>Notifications</h1>
            <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 820 }}>
              Cet espace prepare les alertes liees aux dossiers, aux pieces justificatives, aux messages mairie et aux changements de statut.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
              <Link href='/commune/espace-citoyen' style={{ background: '#1d4ed8', color: '#fff', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 900 }}>Tableau de bord</Link>
              <Link href='/commune/messages' style={{ color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 900 }}>Messages</Link>
            </div>
          </section>

          <section style={{ display: 'grid', gap: 16 }}>
            {notifications.map((item) => (
              <article key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22, display: 'grid', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#64748b', fontSize: 13, fontWeight: 900, textTransform: 'uppercase' }}>{item.level}</div>
                    <h2 style={{ margin: '4px 0 0', fontSize: 22 }}>{item.title}</h2>
                  </div>
                  <span style={{ background: item.status === 'prepare' ? '#dcfce7' : '#eff6ff', color: item.status === 'prepare' ? '#166534' : '#1e3a8a', borderRadius: 999, padding: '8px 12px', fontWeight: 900 }}>{item.status}</span>
                </div>
                <p style={{ color: '#475569', lineHeight: 1.7, margin: 0 }}>{item.text}</p>
              </article>
            ))}
          </section>
        </div>
      </main>
    </ProtectedView>
  );
}
