export const siteConfig = {
  name: 'Civitech Commune SaaS',
  municipality: 'Niakaramadougou',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005',
  sections: [
    { href: '/', label: 'Accueil' },
    { href: '/commune', label: 'Portail' },
    { href: '/commune/espace-citoyen', label: 'Espace citoyen' },
    { href: '/commune/admin', label: 'Admin' },
    { href: '/commune/demarches', label: 'Demarches' },
  ],
};
