"use client";

import Link from 'next/link';
import { ProtectedView } from '../../../components/ProtectedView';
import { useSessionContext } from '../../../components/SessionProvider';

const threads = [
  { title: 'Suivi de dossier', scope: 'Dossier', text: 'Les echanges rattaches a une demarche pourront etre regroupes dans un fil lisible et historise.' },
  { title: 'Question a un service', scope: 'Service', text: 'Le citoyen pourra transmettre une question a la mairie et suivre la reponse depuis son espace.' },
  { title: 'Reponse communale', scope: 'Mairie', text: 'Les agents pourront repondre avec une information utile, datee et rattachee au compte citoyen.' },
];

export default function MessagesPage() {
  const { user } = useSessionContext();

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', padding: '34px 20px 58px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', display: 'grid', gap: 24 }}>
          <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 62%, #0ea5e9 100%)', color: '#fff', borderRadius: 26, padding: 30 }}>
            <div style={{ display: 'inline-block', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', fontWeight: 900, marginBottom: 14 }}>
              Messagerie citoyenne
            </div>
            <h1 style={{ margin: 0, fontSize: 38 }}>Messages</h1>
            <p style={{ lineHeight: 1.75, opacity: 0.95, maxWidth: 820 }}>
              Un centre d echanges pour preparer les conversations entre citoyens et services communaux, avec rattachement futur aux dossiers.
            </p>
            <div style={{ marginTop: 14, color: 'rgba(255,255,255,0.9)' }}>
              Compte connecte : <strong>{user?.email || 'session active'}</strong>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
              <Link href='/commune/espace-citoyen' style={{ background: '#fff', color: '#0f172a', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 900 }}>Tableau de bord</Link>
              <Link href='/commune/notifications' style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.35)', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 900 }}>Notifications</Link>
            </div>
          </section>

          <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 22, padding: 24, boxShadow: '0 10px 30px rgba(15,23,42,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 28 }}>Fils de discussion prepares</h2>
                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>Ces blocs preparent la future messagerie persistante connectee au backend.</p>
              </div>
              <span style={{ background: '#eff6ff', color: '#1e3a8a', borderRadius: 999, padding: '8px 12px', fontWeight: 900 }}>Prototype fonctionnel</span>
            </div>
            <div style={{ display: 'grid', gap: 16, marginTop: 18 }}>
              {threads.map((item) => (
                <article key={item.title} style={{ border: '1px solid #e2e8f0', borderRadius: 18, padding: 20, background: '#fcfdff' }}>
                  <div style={{ color: '#1d4ed8', fontWeight: 900, fontSize: 13, textTransform: 'uppercase' }}>{item.scope}</div>
                  <h3 style={{ margin: '6px 0 8px', fontSize: 22 }}>{item.title}</h3>
                  <p style={{ color: '#475569', lineHeight: 1.7, margin: 0 }}>{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </ProtectedView>
  );
}
