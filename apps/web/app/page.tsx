import Link from 'next/link';
import { siteConfig } from '../lib/site';

const highlights = [
  'Etat civil et demarches en ligne',
  'Espace citoyen avec suivi des demandes',
  'Cockpit mairie pour les agents et responsables',
  'Socle SaaS reutilisable par d autres communes',
];

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <section style={{ padding: '72px 24px 48px', background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 58%, #38bdf8 100%)', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div style={{ display: 'inline-block', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', fontSize: 14, fontWeight: 700 }}>
            {siteConfig.municipality} · Portail public et plateforme communale SaaS
          </div>
          <div style={{ maxWidth: 960 }}>
            <h1 style={{ fontSize: 50, lineHeight: 1.05, margin: 0 }}>La plateforme numerique de la commune de Niakara</h1>
            <p style={{ fontSize: 18, lineHeight: 1.75, opacity: 0.95, marginTop: 18 }}>
              Un socle moderne pour informer les citoyens, digitaliser les demarches, piloter les services municipaux et preparer une reutilisation multi-communes simple a deployer.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href='/commune' style={{ background: '#fff', color: '#0f172a', padding: '14px 22px', borderRadius: 12, textDecoration: 'none', fontWeight: 700 }}>
              Ouvrir le portail communal
            </Link>
            <Link href='/auth/login' style={{ background: 'transparent', color: '#fff', padding: '14px 22px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.35)', fontWeight: 700 }}>
              Creer un compte citoyen
            </Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 24px 54px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
          {highlights.map((item) => (
            <article key={item} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
              <strong style={{ color: '#0f172a' }}>{item}</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
