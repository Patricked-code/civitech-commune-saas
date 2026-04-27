import { PublicPageShell } from '../../../components/PublicPageShell';

const documents = [
  {
    title: 'Declaration de naissance',
    description: 'Informations et pieces a preparer avant le depot d une declaration de naissance.',
    examples: ['Informations sur l enfant', 'Informations sur les parents', 'Justificatifs a confirmer par la commune'],
  },
  {
    title: 'Copie d acte',
    description: 'Informations utiles pour demander une copie d acte et suivre la demande.',
    examples: ['Type d acte demande', 'Identite du demandeur', 'Reference ou informations de recherche'],
  },
  {
    title: 'Declaration de deces',
    description: 'Informations utiles pour preparer une declaration de deces.',
    examples: ['Identite de la personne concernee', 'Informations du declarant', 'Pieces a confirmer par le service'],
  },
  {
    title: 'Mariage civil',
    description: 'Informations pratiques pour preparer un dossier de mariage civil.',
    examples: ['Identite des futurs epoux', 'Date souhaitee', 'Documents a valider par la commune'],
  },
];

export default function DocumentsPage() {
  return (
    <PublicPageShell
      title="Documents utiles"
      description="Un espace public pour aider les citoyens a preparer leurs demarches administratives avant le depot."
      primaryCta={{ href: '/commune/demarches', label: 'Voir les demarches' }}
      secondaryCta={{ href: '/commune/faq', label: 'Lire la FAQ' }}
    >
      <div style={{ display: 'grid', gap: 22 }}>
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
          {documents.map((item) => (
            <article key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
              <h2 style={{ fontSize: 21, marginTop: 0 }}>{item.title}</h2>
              <p style={{ color: '#475569', lineHeight: 1.7 }}>{item.description}</p>
              <ul style={{ color: '#334155', lineHeight: 1.8, paddingLeft: 18, marginBottom: 0 }}>
                {item.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 18, padding: 24 }}>
          <h2 style={{ marginTop: 0, color: '#9a3412' }}>Important</h2>
          <p style={{ color: '#334155', lineHeight: 1.7, marginBottom: 0 }}>
            Les listes publiees ici sont une base d orientation. Les pieces definitives devront etre confirmees par les services communaux avant ouverture publique complete.
          </p>
        </section>
      </div>
    </PublicPageShell>
  );
}
