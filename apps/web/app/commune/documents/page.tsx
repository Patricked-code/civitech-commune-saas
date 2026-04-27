import { PublicPageShell } from '../../../components/PublicPageShell';

const documents = [
  { title: 'Declaration de naissance', description: 'Informations et pieces a preparer avant le depot d une declaration de naissance.' },
  { title: 'Copie d acte', description: 'Informations utiles pour demander une copie d acte et suivre la demande.' },
  { title: 'Declaration de deces', description: 'Informations utiles pour preparer une declaration de deces.' },
  { title: 'Mariage civil', description: 'Informations pratiques pour preparer un dossier de mariage civil.' },
];

export default function DocumentsPage() {
  return (
    <PublicPageShell
      title="Documents utiles"
      description="Un espace public pour aider les citoyens a preparer leurs demarches administratives."
      primaryCta={{ href: '/commune/demarches', label: 'Voir les demarches' }}
      secondaryCta={{ href: '/commune/faq', label: 'Lire la FAQ' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 18 }}>
        {documents.map((item) => (
          <article key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
            <h2 style={{ fontSize: 21, marginTop: 0 }}>{item.title}</h2>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.description}</p>
          </article>
        ))}
      </div>
    </PublicPageShell>
  );
}
