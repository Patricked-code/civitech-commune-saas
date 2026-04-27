import { PublicPageShell } from '../../../components/PublicPageShell';

const contacts = [
  { label: 'Accueil general', value: 'Mairie de Niakara', help: 'Orientation vers le bon service communal.' },
  { label: 'Demarches', value: 'Etat civil et services municipaux', help: 'Questions sur les pieces, le depot et le suivi des demandes.' },
  { label: 'Canal numerique', value: 'Portail citoyen Civitech Commune', help: 'Connexion, inscription, brouillons et suivi des dossiers.' },
];

const steps = [
  'Identifier la demarche concernee',
  'Preparer les informations et documents utiles',
  'Se connecter ou creer un compte citoyen',
  'Suivre le dossier depuis l espace citoyen',
];

export default function ContactPage() {
  return (
    <PublicPageShell
      title="Contact et orientation"
      description="Un point d entree simple pour orienter les citoyens vers le bon service et preparer une demande complete."
      primaryCta={{ href: '/auth/login', label: 'Acceder a mon espace' }}
      secondaryCta={{ href: '/commune/faq', label: 'Consulter la FAQ' }}
    >
      <div style={{ display: 'grid', gap: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
          {contacts.map((item) => (
            <article key={item.label} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
              <div style={{ color: '#64748b', fontWeight: 800, fontSize: 13, textTransform: 'uppercase' }}>{item.label}</div>
              <div style={{ marginTop: 8, fontSize: 20, fontWeight: 900 }}>{item.value}</div>
              <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.help}</p>
            </article>
          ))}
        </div>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
          <h2 style={{ marginTop: 0 }}>Avant de contacter la commune</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {steps.map((step, index) => (
              <div key={step} style={{ border: '1px solid #e2e8f0', borderRadius: 14, padding: 16, background: '#fcfdff' }}>
                <div style={{ color: '#1d4ed8', fontWeight: 900 }}>Etape {index + 1}</div>
                <div style={{ marginTop: 6, color: '#334155', fontWeight: 700 }}>{step}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 18, padding: 24 }}>
          <h2 style={{ marginTop: 0, color: '#1e3a8a' }}>Coordonnees officielles a completer</h2>
          <p style={{ color: '#334155', lineHeight: 1.7, marginBottom: 0 }}>
            Les horaires, numeros, emails et adresse officielle devront etre ajoutes apres validation par la commune, afin d eviter toute information approximative.
          </p>
        </section>
      </div>
    </PublicPageShell>
  );
}
