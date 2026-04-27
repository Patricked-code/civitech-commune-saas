"use client";

import Link from 'next/link';
import { siteConfig } from '../lib/site';
import { useSessionContext } from './SessionProvider';
import { removeToken } from '../lib/session';

type NavItem = {
  href: string;
  label: string;
};

function logout() {
  removeToken();
  window.location.href = '/auth/login';
}

function NavGroup({ title, items, muted = false }: { title: string; items: NavItem[]; muted?: boolean }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6, color: '#64748b', fontWeight: 800 }}>{title}</div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              textDecoration: 'none',
              color: muted ? '#475569' : '#1e293b',
              fontWeight: muted ? 600 : 700,
              fontSize: 14,
              background: muted ? '#f8fafc' : '#eff6ff',
              border: muted ? '1px solid #e5e7eb' : '1px solid #bfdbfe',
              padding: '8px 11px',
              borderRadius: 999,
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MainNav() {
  const { user } = useSessionContext();

  return (
    <nav style={{ background: 'rgba(255,255,255,0.96)', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 30, backdropFilter: 'blur(12px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px', display: 'grid', gap: 16 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Link href='/' style={{ textDecoration: 'none' }}>
            <div style={{ fontWeight: 900, color: '#0f172a', fontSize: 19 }}>{siteConfig.municipality}</div>
            <div style={{ color: '#64748b', fontSize: 13 }}>Portail public · Espace citoyen · Cockpit communal</div>
          </Link>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {user ? (
              <span style={{ color: '#1e3a8a', fontWeight: 800, background: '#eff6ff', border: '1px solid #bfdbfe', padding: '8px 12px', borderRadius: 999 }}>{user.email}</span>
            ) : (
              <span style={{ color: '#64748b', fontWeight: 700 }}>Invite</span>
            )}
            {user ? (
              <button onClick={logout} style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '9px 13px', borderRadius: 10, fontWeight: 700 }}>
                Deconnexion
              </button>
            ) : (
              <Link href='/auth/login' style={{ background: '#1d4ed8', color: '#fff', padding: '11px 15px', borderRadius: 12, textDecoration: 'none', fontWeight: 800 }}>
                Connexion / Inscription
              </Link>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          <NavGroup title='Portail public' items={siteConfig.publicSections} />
          <NavGroup title='Demarches prioritaires' items={siteConfig.keyServices} muted />
          <NavGroup title='Espace citoyen' items={siteConfig.citizenSections} muted />
          <NavGroup title='Confiance' items={siteConfig.trustSections} muted />
          <NavGroup title='Backoffice mairie' items={siteConfig.backofficeSections} muted />
        </div>
      </div>
    </nav>
  );
}
