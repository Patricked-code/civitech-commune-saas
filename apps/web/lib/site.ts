export const siteConfig = {
  name: 'Civitech Commune SaaS',
  municipality: 'Niakaramadougou',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005',
  sections: [
    { href: '/', label: 'Accueil' },
    { href: '/commune', label: 'Portail' },
    { href: '/commune/espace-citoyen', label: 'Espace citoyen' },
    { href: '/commune/admin', label: 'Admin mock' },
    { href: '/commune/admin-console', label: 'Admin connecte' },
    { href: '/commune/admin-gestion', label: 'Admin gestion' },
    { href: '/commune/admin-crud', label: 'Admin CRUD' },
    { href: '/commune/demarches', label: 'Demarches' },
    { href: '/commune/dossiers-connectes', label: 'Dossiers connectes' },
    { href: '/auth/demo-login', label: 'Demo login' },
  ],
};
