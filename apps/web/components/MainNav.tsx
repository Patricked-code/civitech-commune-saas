"use client";

import Link from 'next/link';
import { siteConfig } from '../lib/site';
import { useSessionContext } from './SessionProvider';
import { removeToken } from '../lib/session';

function logout() {
  removeToken();
  window.location.href = '/auth/login';
}

export function MainNav() {
  const { user } = useSessionContext();

  return (
    <nav style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 30 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px', display: 'grid', gap: 14 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: 18 }}>{siteConfig.municipality}</div>
            <div style={{ color: '#64748b', fontSize: 13 }}>Portail public et cockpit communal SaaS</div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {user ? <span style={{ color: '#1e3a8a', fontWeight: 700 }}>{user.email}</span> : <span style={{ color: '#64748b' }}>Invite</span>}
            {user ? (
              <button onClick={logout} style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '8px 12px', borderRadius: 8 }}>
                Logout
              </button>
            ) : (
              <Link href='/auth/login' style={{ background: '#1d4ed8', color: '#fff', padding: '10px 14px', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>
                Se connecter
              </Link>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {siteConfig.publicSections.map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', color: '#334155', fontWeight: 600 }}>
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {siteConfig.keyServices.map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', color: '#475569' }}>
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {siteConfig.backofficeSections.map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', color: '#475569' }}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
