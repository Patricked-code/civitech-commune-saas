"use client";

import Link from 'next/link';
import { siteConfig } from '../lib/site';
import { useSessionContext } from './SessionProvider';
import { removeToken } from '../lib/session';

export function MainNav() {
  const { user } = useSessionContext();

  return (
    <nav style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 20px', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <strong>{siteConfig.name}</strong>
          {siteConfig.sections.map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', color: '#334155' }}>
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {user ? <span style={{ color: '#1e3a8a', fontWeight: 700 }}>{user.email}</span> : <span style={{ color: '#64748b' }}>Invite</span>}
          {user ? (
            <button onClick={() => { removeToken(); window.location.href = '/auth/demo-login'; }} style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '8px 12px', borderRadius: 8 }}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
