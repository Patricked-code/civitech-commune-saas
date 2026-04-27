import { PublicPageShell } from '../../../components/PublicPageShell';

const categories = [
  { title: 'Voirie et cadre de vie', text: 'Preparation d un canal pour signaler un probleme localise ou une demande d intervention.' },
  { title: 'Demande d information', text: 'Orientation vers le bon service lorsque le citoyen ne sait pas quelle demarche choisir.' },
  { title: 'Suivi citoyen', text: 'Les signalements pourront ensuite etre rattaches a un historique et a des statuts de traitement.' },
];

export default function SignalementPage() {
  return (
    <PublicPageShell
      title="Signalement citoyen"
      description="Un futur canal pour transmettre une information utile aux services communaux et suivre son traitement."
      primaryCta={{ href: '/auth/login', label: 'Me connecter' }}
      secondaryCta={{ href: '/commune/contact', label: 'Contact' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
        {categories.map((item) => (
          <article key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
            <h2 style={{ marginTop: 0, fontSize: 21 }}>{item.title}</h2>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.text}</p>
          </article>
        ))}
      </div>
    </PublicPageShell>
  );
}
