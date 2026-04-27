import { PublicPageShell } from '../../../components/PublicPageShell';

const threads = [
  { title: 'Message de suivi', text: 'Les echanges lies a un dossier pourront etre regroupes dans un fil lisible.' },
  { title: 'Question a un service', text: 'Le citoyen pourra preparer une question et la rattacher a son espace personnel.' },
  { title: 'Reponse communale', text: 'Les services pourront repondre avec des informations utiles et tracees.' },
];

export default function MessagesPage() {
  return (
    <PublicPageShell
      title="Messages"
      description="Un espace prepare pour les echanges entre citoyens et services communaux autour des demandes."
      primaryCta={{ href: '/commune/espace-citoyen', label: 'Tableau de bord' }}
      secondaryCta={{ href: '/commune/notifications', label: 'Notifications' }}
    >
      <div style={{ display: 'grid', gap: 16 }}>
        {threads.map((item) => (
          <article key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
            <h2 style={{ marginTop: 0, fontSize: 21 }}>{item.title}</h2>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.text}</p>
          </article>
        ))}
      </div>
    </PublicPageShell>
  );
}
