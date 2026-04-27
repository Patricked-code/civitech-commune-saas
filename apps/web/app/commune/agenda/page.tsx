import { PublicPageShell } from '../../../components/PublicPageShell';

export default function AgendaPage() {
  return (
    <PublicPageShell
      title="Agenda communal"
      description="Un espace public pour afficher les dates utiles et les rendez vous de la commune."
      primaryCta={{ href: '/commune/contact', label: 'Contacter la commune' }}
      secondaryCta={{ href: '/commune/documents', label: 'Voir les documents' }}
    >
      <article style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
        <h2 style={{ marginTop: 0 }}>Calendrier a venir</h2>
        <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>
          Cette page servira a publier les informations datees utiles aux habitants.
        </p>
      </article>
    </PublicPageShell>
  );
}
