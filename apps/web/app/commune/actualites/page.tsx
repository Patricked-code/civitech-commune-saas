import { PublicPageShell } from '../../../components/PublicPageShell';

const news = [
  { title: 'Modernisation du portail communal', tag: 'Numerique', text: 'La plateforme prepare un point d entree unique pour les informations publiques, les demarches et le suivi citoyen.' },
  { title: 'Demarches prioritaires', tag: 'Etat civil', text: 'Les premiers parcours concernent la naissance, la copie d acte, le deces et le mariage civil.' },
  { title: 'Espace citoyen', tag: 'Services', text: 'Les citoyens pourront suivre leurs demandes, retrouver leurs brouillons et consulter leur historique.' },
];

export default function ActualitesPage() {
  return (
    <PublicPageShell
      title="Actualites communales"
      description="Un espace pour publier les annonces, informations pratiques et communications utiles aux habitants."
      primaryCta={{ href: '/commune/agenda', label: 'Voir l agenda' }}
      secondaryCta={{ href: '/commune/contact', label: 'Contacter la commune' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
        {news.map((item) => (
          <article key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22, boxShadow: '0 8px 24px rgba(15,23,42,0.05)' }}>
            <div style={{ color: '#1d4ed8', fontSize: 13, fontWeight: 900, textTransform: 'uppercase' }}>{item.tag}</div>
            <h2 style={{ fontSize: 22 }}>{item.title}</h2>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.text}</p>
          </article>
        ))}
      </div>
    </PublicPageShell>
  );
}
