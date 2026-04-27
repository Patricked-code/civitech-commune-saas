import { PublicPageShell } from '../../../components/PublicPageShell';

const principles = [
  { title: 'Donnees utiles', text: 'Les informations demandees doivent servir au traitement des demarches et au suivi du compte citoyen.' },
  { title: 'Acces encadre', text: 'Les espaces connectes sont prepares pour separer les droits citoyens, agents et administrateurs.' },
  { title: 'Evolution continue', text: 'Cette page devra etre completee avec la politique officielle avant ouverture publique.' },
];

export default function ConfidentialitePage() {
  return (
    <PublicPageShell
      title="Confidentialite"
      description="Une page de confiance pour presenter les principes de protection des informations utilisees par le portail."
      primaryCta={{ href: '/commune/contact', label: 'Contacter la commune' }}
      secondaryCta={{ href: '/commune/mentions-legales', label: 'Mentions' }}
    >
      <div style={{ display: 'grid', gap: 16 }}>
        {principles.map((item) => (
          <article key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
            <h2 style={{ marginTop: 0, fontSize: 21 }}>{item.title}</h2>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.text}</p>
          </article>
        ))}
      </div>
    </PublicPageShell>
  );
}
