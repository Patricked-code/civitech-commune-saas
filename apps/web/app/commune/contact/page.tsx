import { PublicPageShell } from '../../../components/PublicPageShell';

const contacts = [
  { label: 'Accueil general', value: 'Mairie de Niakara' },
  { label: 'Demarches', value: 'Etat civil et services municipaux' },
  { label: 'Canal numerique', value: 'Portail citoyen Civitech Commune' },
];

export default function ContactPage() {
  return (
    <PublicPageShell
      title="Contact et orientation"
      description="Un point d entree simple pour orienter les citoyens vers le bon service et preparer une demande complete."
      primaryCta={{ href: '/auth/login', label: 'Acceder a mon espace' }}
      secondaryCta={{ href: '/commune/faq', label: 'Consulter la FAQ' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
        {contacts.map((item) => (
          <article key={item.label} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
            <div style={{ color: '#64748b', fontWeight: 700 }}>{item.label}</div>
            <div style={{ marginTop: 8, fontSize: 20, fontWeight: 800 }}>{item.value}</div>
          </article>
        ))}
      </div>
    </PublicPageShell>
  );
}
