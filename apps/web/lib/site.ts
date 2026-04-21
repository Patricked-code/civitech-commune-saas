const municipalityName = process.env.NEXT_PUBLIC_MUNICIPALITY_NAME || 'Commune de Niakara';
const municipalityShortName = process.env.NEXT_PUBLIC_MUNICIPALITY_SHORT_NAME || 'Niakara';

export const siteConfig = {
  name: 'Civitech Commune SaaS',
  municipality: municipalityName,
  municipalityShortName,
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://www.niakara.com',
  alternateAppUrl: process.env.NEXT_PUBLIC_ALT_APP_URL || 'https://niakara.com',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005',
  publicSections: [
    { href: '/', label: 'Accueil' },
    { href: '/commune', label: 'Portail communal' },
    { href: '/commune/espace-citoyen', label: 'Espace citoyen' },
    { href: '/commune/demarches', label: 'Demarches' },
    { href: '/auth/login', label: 'Connexion / Inscription' },
  ],
  backofficeSections: [
    { href: '/commune/admin-console', label: 'Cockpit mairie' },
    { href: '/commune/admin-gestion', label: 'Gestion procedures' },
    { href: '/commune/admin-crud', label: 'Usagers et CRUD' },
    { href: '/commune/agent-dossiers', label: 'Vue agent' },
    { href: '/commune/agent-validation-documents', label: 'Validation docs' },
    { href: '/commune/dossiers-connectes', label: 'Dossiers connectes' },
  ],
  keyServices: [
    { href: '/commune/demarches/declaration-naissance', label: 'Naissance' },
    { href: '/commune/demarches/demande-copie-acte', label: 'Copie acte' },
    { href: '/commune/demarches/declaration-deces', label: 'Deces' },
    { href: '/commune/demarches/organisation-mariage', label: 'Mariage' },
  ],
};
