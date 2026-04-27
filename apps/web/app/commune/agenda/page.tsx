import { PublicPageShell } from '../../../components/PublicPageShell';

const events = [
  { title: 'Permanence citoyenne', date: 'A programmer', text: 'Publication future des permanences d accueil et d orientation des usagers.' },
  { title: 'Session demarches', date: 'A programmer', text: 'Information future sur les operations liees aux demarches administratives prioritaires.' },
  { title: 'Rencontre publique', date: 'A programmer', text: 'Espace prevu pour annoncer les rencontres, reunions et temps d information.' },
];

export default function AgendaPage() {
  return (
    <PublicPageShell
      title="Agenda communal"
      description="Un espace public pour afficher les dates utiles, permanences, rencontres et rendez vous de la commune."
      primaryCta={{ href: '/commune/contact', label: 'Contacter la commune' }}
      secondaryCta={{ href: '/commune/documents', label: 'Voir les documents' }}
    >
      <div style={{ display: 'grid', gap: 16 }}>
        {events.map((item) => (
          <article key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
            <div style={{ color: '#1d4ed8', fontWeight: 900 }}>{item.date}</div>
            <h2 style={{ fontSize: 22 }}>{item.title}</h2>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.text}</p>
          </article>
        ))}
      </div>
    </PublicPageShell>
  );
}
