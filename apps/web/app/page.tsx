import Link from 'next/link';
import { siteConfig } from '../lib/site';

const highlights = [
  { title: 'Demarches en ligne', text: 'Deposer une demande, reprendre un brouillon et suivre l avancement depuis un espace citoyen.' },
  { title: 'Services municipaux', text: 'Structurer l accueil, l etat civil, les documents utiles et les circuits de traitement.' },
  { title: 'Cockpit mairie', text: 'Donner aux agents une vision claire des dossiers, priorites, documents et actions a mener.' },
  { title: 'Socle SaaS', text: 'Preparer une base reutilisable pour d autres communes avec branding et parametrage.' },
];

const citizenSteps = [
  'Creer un compte citoyen',
  'Choisir une demarche',
  'Enregistrer ou soumettre le dossier',
  'Suivre le traitement en ligne',
];

const priorityLinks = [
  { href: '/commune/demarches/declaration-naissance', label: 'Declaration de naissance' },
  { href: '/commune/demarches/demande-copie-acte', label: 'Demande de copie d acte' },
  { href: '/commune/demarches/declaration-deces', label: 'Declaration de deces' },
  { href: '/commune/demarches/organisation-mariage', label: 'Organisation de mariage' },
];

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      <section style={{ padding: '76px 24px 58px', background: 'radial-gradient(circle at top left, rgba(56,189,248,0.35), transparent 32%), linear-gradient(135deg, #0f172a 0%, #1d4ed8 58%, #38bdf8 100%)', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(280px, 0.65fr)', gap: 28, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', fontSize: 14, fontWeight: 800, marginBottom: 18 }}>
              {siteConfig.municipality} · Portail public et services municipaux
            </div>
            <h1 style={{ fontSize: 54, lineHeight: 1.04, margin: 0, maxWidth: 920 }}>Une mairie plus accessible, des demarches plus simples, un suivi plus clair</h1>
            <p style={{ fontSize: 18, lineHeight: 1.75, opacity: 0.95, marginTop: 20, maxWidth: 820 }}>
              Le portail numerique de Niakara rassemble les informations publiques, les demarches citoyennes, le suivi des dossiers et les outils de pilotage des services municipaux dans une experience moderne et progressive.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
              <Link href='/commune/demarches' style={{ background: '#fff', color: '#0f172a', padding: '14px 22px', borderRadius: 12, textDecoration: 'none', fontWeight: 800 }}>
                Demarrer une demarche
              </Link>
              <Link href='/commune' style={{ background: 'transparent', color: '#fff', padding: '14px 22px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.35)', fontWeight: 800 }}>
                Decouvrir le portail
              </Link>
              <Link href='/auth/login' style={{ background: 'rgba(15,23,42,0.28)', color: '#fff', padding: '14px 22px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.22)', fontWeight: 800 }}>
                Connexion citoyenne
              </Link>
            </div>
          </div>

          <aside style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 24, padding: 24, backdropFilter: 'blur(10px)' }}>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Parcours citoyen</div>
            <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
              {citizenSteps.map((step, index) => (
                <div key={step} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: 12, alignItems: 'center' }}>
                  <span style={{ width: 34, height: 34, borderRadius: 999, background: '#fff', color: '#1d4ed8', display: 'grid', placeItems: 'center', fontWeight: 900 }}>{index + 1}</span>
                  <span style={{ fontWeight: 700 }}>{step}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '38px 24px 18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 18 }}>
          {highlights.map((item) => (
            <article key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: 22, boxShadow: '0 8px 24px rgba(15,23,42,0.05)' }}>
              <h2 style={{ marginTop: 0, fontSize: 22 }}>{item.title}</h2>
              <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '18px 24px 58px' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 24, padding: 28, boxShadow: '0 10px 30px rgba(15,23,42,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 30 }}>Demarches prioritaires</h2>
              <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 760 }}>
                Les premiers parcours se concentrent sur l etat civil afin de construire une base fiable avant l extension vers d autres services municipaux.
              </p>
            </div>
            <Link href='/commune/espace-citoyen' style={{ color: '#1d4ed8', fontWeight: 900, textDecoration: 'none' }}>Ouvrir mon espace citoyen</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginTop: 10 }}>
            {priorityLinks.map((item) => (
              <Link key={item.href} href={item.href} style={{ border: '1px solid #dbeafe', background: '#eff6ff', borderRadius: 16, padding: 18, color: '#1e3a8a', textDecoration: 'none', fontWeight: 900 }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
