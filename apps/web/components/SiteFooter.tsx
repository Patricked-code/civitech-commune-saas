import Link from 'next/link';
import { siteConfig } from '../lib/site';

function FooterColumn({ title, items }: { title: string; items: Array<{ href: string; label: string }> }) {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <h2 style={{ color: '#fff', fontSize: 15, margin: 0 }}>{title}</h2>
      <div style={{ display: 'grid', gap: 8 }}>
        {items.map((item) => (
          <Link key={item.href} href={item.href} style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: 14 }}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer style={{ background: '#0f172a', color: '#cbd5e1', padding: '38px 24px 28px', marginTop: 0 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gap: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 24 }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ color: '#fff', fontWeight: 900, fontSize: 20 }}>{siteConfig.municipality}</div>
            <p style={{ lineHeight: 1.7, margin: 0 }}>
              Portail numerique communal pour informer les citoyens, simplifier les demarches et preparer un socle SaaS reutilisable par d autres communes.
            </p>
          </div>
          <FooterColumn title='Portail' items={siteConfig.publicSections.slice(0, 7)} />
          <FooterColumn title='Espace citoyen' items={siteConfig.citizenSections} />
          <FooterColumn title='Confiance' items={siteConfig.trustSections} />
        </div>
        <div style={{ borderTop: '1px solid rgba(148,163,184,0.25)', paddingTop: 18, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 13 }}>
          <span>{siteConfig.name} · {siteConfig.municipalityShortName}</span>
          <span>Socle public, citoyen et backoffice communal</span>
        </div>
      </div>
    </footer>
  );
}
