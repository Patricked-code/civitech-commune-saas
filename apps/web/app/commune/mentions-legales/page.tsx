import { PublicPageShell } from '../../../components/PublicPageShell';

const items = [
  { title: 'Editeur du portail', text: 'Cette section devra etre completee avec les informations officielles de la commune avant ouverture publique.' },
  { title: 'Responsabilite', text: 'Les contenus institutionnels definitifs devront etre valides par les responsables habilites.' },
  { title: 'Contact', text: 'Les coordonnees officielles seront ajoutees dans la page contact et reprises ici si necessaire.' },
];

export default function MentionsLegalesPage() {
  return (
    <PublicPageShell
      title="Mentions"
      description="Une page de reference pour preparer les informations administratives et editoriales du portail communal."
      primaryCta={{ href: '/commune/contact', label: 'Contact' }}
      secondaryCta={{ href: '/commune/confidentialite', label: 'Confidentialite' }}
    >
      <div style={{ display: 'grid', gap: 16 }}>
        {items.map((item) => (
          <article key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
            <h2 style={{ marginTop: 0, fontSize: 21 }}>{item.title}</h2>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.text}</p>
          </article>
        ))}
      </div>
    </PublicPageShell>
  );
}
