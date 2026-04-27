import './globals.css';
import React from 'react';
import { MainNav } from '../components/MainNav';
import { SessionProvider } from '../components/SessionProvider';
import { CanonicalHostRedirect } from '../components/CanonicalHostRedirect';
import { SiteFooter } from '../components/SiteFooter';
import { siteConfig } from '../lib/site';

export const metadata = {
  metadataBase: new URL(siteConfig.appUrl),
  title: {
    default: 'Commune de Niakara | Portail citoyen et services municipaux',
    template: '%s | Commune de Niakara',
  },
  description: 'Portail numerique de la commune de Niakara pour les informations publiques, les demarches citoyennes et les services municipaux.',
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SessionProvider>
          <CanonicalHostRedirect />
          <MainNav />
          {children}
          <SiteFooter />
        </SessionProvider>
      </body>
    </html>
  );
}
