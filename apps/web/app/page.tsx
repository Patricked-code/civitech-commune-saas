import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div style={{ maxWidth: 900, textAlign: 'center' }}>
        <h1 style={{ fontSize: 42, marginBottom: 12 }}>Civitech Commune SaaS</h1>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: '#475569' }}>
          Depot autonome dedie a la digitalisation communale : portail public, espace citoyen,
          cockpit administrateur, demarches, workflow et socle SaaS multi-communes.
        </p>
        <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/commune" style={{ background: '#1d4ed8', color: '#fff', padding: '14px 22px', borderRadius: 12, textDecoration: 'none', fontWeight: 700 }}>
            Ouvrir le portail communal
          </Link>
        </div>
      </div>
    </main>
  );
}
