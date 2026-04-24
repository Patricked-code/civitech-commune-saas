import { InfoGrid, PublicPageShell } from '../../../components/PublicPageShell';

const items = [
  {
    title: 'Une commune au service des citoyens',
    text: 'Le portail numerique de Niakara a vocation a rapprocher les services municipaux des habitants, simplifier les demarches et rendre l information locale plus accessible.',
  },
  {
    title: 'Un guichet public plus lisible',
    text: 'Les citoyens doivent pouvoir retrouver les demarches, les contacts, les documents utiles et l etat d avancement de leurs demandes depuis un point d entree unique.',
  },
  {
    title: 'Une base pour moderniser l administration',
    text: 'La plateforme structure progressivement les workflows internes, la validation documentaire, le suivi des dossiers et le pilotage quotidien des services.',
  },
];

export default function PresentationPage() {
  return (
    <PublicPageShell
      title="Presentation de la commune de Niakara"
      description="Cette page constitue le socle institutionnel du portail communal : elle presente la mission du service public local, l orientation numerique de la mairie et les usages prioritaires pour les citoyens."
      primaryCta={{ href: '/commune/demarches', label: 'Voir les demarches' }}
      secondaryCta={{ href: '/commune/contact', label: 'Contacter la mairie' }}
    >
      <InfoGrid items={items} />
    </PublicPageShell>
  );
}
