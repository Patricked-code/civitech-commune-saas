import { PublicPageShell } from '../../../components/PublicPageShell';

const blocks = [
  { title: 'Informations publiques', text: 'Cette page regroupera progressivement les informations utiles aux habitants.' },
  { title: 'Services numeriques', text: 'Le portail aide a rendre les demarches plus lisibles et plus faciles a suivre.' },
  { title: 'Amelioration continue', text: 'Les contenus seront enrichis avec les elements valides par la commune.' },
];

export default function TransparencePage() {
  return (
    <PublicPageShell
      title="Transparence"
      description="Un espace pour rendre les informations communales plus accessibles et plus faciles a comprendre."
      primaryCta={{ href: '/commune/documents', label: 'Documents' }}
      secondaryCta={{ href: '/commune/contact', label: 'Contact' }}
    >
      <div style={{ display: 'grid', gap: 16 }}>
        {blocks.map((item) => (
          <article key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
            <h2 style={{ marginTop: 0, fontSize: 21 }}>{item.title}</h2>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.text}</p>
          </article>
        ))}
      </div>
    </PublicPageShell>
  );
}
