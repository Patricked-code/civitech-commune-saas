import Link from 'next/link';
import React from 'react';
import { siteConfig } from '../lib/site';

type PublicPageShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  children: React.ReactNode;
};

export function PublicPageShell({ eyebrow, title, description, primaryCta, secondaryCta, children }: PublicPageShellProps) {
  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #0ea5e9 100%)', color: '#fff', padding: '64px 24px 52px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', fontSize: 14, fontWeight: 700, marginBottom: 18 }}>
            {eyebrow || `${siteConfig.municipality} · Portail communal`}
          </div>
          <h1 style={{ fontSize: 44, lineHeight: 1.08, margin: 0, maxWidth: 920 }}>{title}</h1>
          <p style={{ fontSize: 18, lineHeight: 1.75, opacity: 0.94, maxWidth: 880, marginTop: 18 }}>{description}</p>
          {(primaryCta || secondaryCta) ? (
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 26 }}>
              {primaryCta ? (
                <Link href={primaryCta.href} style={{ background: '#fff', color: '#0f172a', padding: '13px 20px', borderRadius: 12, textDecoration: 'none', fontWeight: 800 }}>
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link href={secondaryCta.href} style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.4)', padding: '13px 20px', borderRadius: 12, textDecoration: 'none', fontWeight: 800 }}>
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '34px 24px 58px' }}>
        {children}
      </section>
    </main>
  );
}

export function InfoGrid({ items }: { items: Array<{ title: string; text: string }> }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
      {items.map((item) => (
        <article key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22, boxShadow: '0 8px 24px rgba(15,23,42,0.05)' }}>
          <h2 style={{ marginTop: 0, fontSize: 22 }}>{item.title}</h2>
          <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
