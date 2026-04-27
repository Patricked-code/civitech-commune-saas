import { PublicPageShell } from '../../../components/PublicPageShell';

const sections = [
  { title: 'Identite', text: 'Le profil permettra de consulter et completer les informations principales du compte citoyen.' },
  { title: 'Coordonnees', text: 'Une prochaine etape permettra de gerer les contacts utiles pour le suivi des demandes.' },
  { title: 'Preferences', text: 'Le portail pourra ensuite proposer des preferences de notification et de communication.' },
];

export default function ProfilPage() {
  return (
    <PublicPageShell
      title="Profil citoyen"
      description="Un espace personnel pour preparer la gestion des informations du citoyen connecte."
      primaryCta={{ href: '/commune/espace-citoyen', label: 'Tableau de bord' }}
      secondaryCta={{ href: '/commune/messages', label: 'Messages' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
        {sections.map((item) => (
          <article key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
            <h2 style={{ marginTop: 0, fontSize: 21 }}>{item.title}</h2>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.text}</p>
          </article>
        ))}
      </div>
    </PublicPageShell>
  );
}
