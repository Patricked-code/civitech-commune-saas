import { PublicPageShell } from '../../../components/PublicPageShell';

const notifications = [
  { title: 'Suivi de dossier', text: 'Les notifications aideront le citoyen a suivre les changements de statut de ses demandes.' },
  { title: 'Pieces attendues', text: 'Le portail pourra rappeler les documents a fournir ou a completer.' },
  { title: 'Informations de service', text: 'Cet espace preparera les alertes utiles envoyees par les services communaux.' },
];

export default function NotificationsPage() {
  return (
    <PublicPageShell
      title="Notifications"
      description="Un espace de suivi pour preparer les alertes liees aux dossiers, documents et informations de service."
      primaryCta={{ href: '/commune/espace-citoyen', label: 'Tableau de bord' }}
      secondaryCta={{ href: '/commune/messages', label: 'Messages' }}
    >
      <div style={{ display: 'grid', gap: 16 }}>
        {notifications.map((item) => (
          <article key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
            <h2 style={{ marginTop: 0, fontSize: 21 }}>{item.title}</h2>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.text}</p>
          </article>
        ))}
      </div>
    </PublicPageShell>
  );
}
