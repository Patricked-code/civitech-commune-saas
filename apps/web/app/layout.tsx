import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Civitech Commune SaaS',
  description: 'Portail communal SaaS pour la digitalisation des services municipaux.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
