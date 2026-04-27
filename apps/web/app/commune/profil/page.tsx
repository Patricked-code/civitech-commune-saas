"use client";

import Link from 'next/link';
import { ProtectedView } from '../../../components/ProtectedView';
import { useSessionContext } from '../../../components/SessionProvider';

const profileBlocks = [
  { title: 'Identite', key: 'identity', help: 'Informations principales rattachees au compte citoyen.' },
  { title: 'Roles et droits', key: 'roles', help: 'Roles actifs pour determiner les acces dans le portail.' },
  { title: 'Securite du compte', key: 'security', help: 'Base pour la future gestion du mot de passe et des preferences de session.' },
];

export default function ProfilPage() {
  const { user } = useSessionContext();
  const roleCodes = user?.roleCodes || [];

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', padding: '34px 20px 58px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 24 }}>
          <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 60%, #0ea5e9 100%)', color: '#fff', borderRadius: 26, padding: 30 }}>
            <div style={{ display: 'inline-block', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', fontWeight: 800, marginBottom: 14 }}>
              Espace citoyen · Profil
            </div>
            <h1 style={{ fontSize: 38, lineHeight: 1.1, margin: 0 }}>Mon profil citoyen</h1>
            <p style={{ lineHeight: 1.75, opacity: 0.95, maxWidth: 820 }}>
              Retrouvez les informations de votre compte, vos roles actifs et les raccourcis utiles pour suivre vos demarches communales.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
              <Link href='/commune/espace-citoyen' style={{ background: '#fff', color: '#0f172a', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 900 }}>Tableau de bord</Link>
              <Link href='/commune/notifications' style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.35)', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 900 }}>Notifications</Link>
              <Link href='/commune/messages' style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.35)', padding: '12px 18px', borderRadius: 12, textDecoration: 'none', fontWeight: 900 }}>Messages</Link>
            </div>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
            {profileBlocks.map((item) => (
              <article key={item.key} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: 22, boxShadow: '0 8px 24px rgba(15,23,42,0.05)' }}>
                <h2 style={{ marginTop: 0, fontSize: 22 }}>{item.title}</h2>
                <p style={{ color: '#475569', lineHeight: 1.7 }}>{item.help}</p>
                {item.key === 'identity' ? (
                  <div style={{ display: 'grid', gap: 8, color: '#334155' }}>
                    <div><strong>Email :</strong> {user?.email || 'Non disponible'}</div>
                    <div><strong>Prenom :</strong> {user?.firstName || 'Non renseigne'}</div>
                    <div><strong>Nom :</strong> {user?.lastName || 'Non renseigne'}</div>
                    <div><strong>Type :</strong> {user?.userType || 'citizen'}</div>
                  </div>
                ) : null}
                {item.key === 'roles' ? (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {(roleCodes.length ? roleCodes : ['citizen']).map((role) => (
                      <span key={role} style={{ background: '#eff6ff', color: '#1e3a8a', border: '1px solid #bfdbfe', borderRadius: 999, padding: '7px 11px', fontWeight: 800 }}>{role}</span>
                    ))}
                  </div>
                ) : null}
                {item.key === 'security' ? (
                  <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: 0 }}>
                    La modification du mot de passe et les preferences de notification seront raccordees dans un batch dedie, avec verification backend.
                  </p>
                ) : null}
              </article>
            ))}
          </section>
        </div>
      </main>
    </ProtectedView>
  );
}
