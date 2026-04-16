import Link from 'next/link';
import { siteConfig } from '../lib/site';

export function MainNav() {
  return (
    <nav style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 20px', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <strong>{siteConfig.name}</strong>
        {siteConfig.sections.map((item) => (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none', color: '#334155' }}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
