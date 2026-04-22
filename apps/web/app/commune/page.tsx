import Link from 'next/link';
import React from 'react';
import { siteConfig } from '../../lib/site';

const demarches = [
  {
    titre: 'Declaration de naissance',
    statut: 'Disponible',
    href: '/commune/demarches/declaration-naissance',
    resume: 'Depot en ligne, suivi du dossier et workflow mairie.',
  },
  {
    titre: 'Demande de copie d acte',
    statut: 'Disponible',
    href: '/commune/demarches/demande-copie-acte',
    resume: 'Recherche, pieces justificatives et emission.',
  },
  {
    titre: 'Declaration de deces',
    statut: 'Disponible',
    href: '/commune/demarches/declaration-deces',
    resume: 'Saisie initiale, controle et validation administrative.',
  },
  {
    titre: 'Organisation de mariage',
    statut: 'Disponible',
    href: '/commune/demarches/organisation-mariage',
    resume: 'Preparation de dossier, suivi et coordination mairie.',
  },
];

const institutionBlocks = [
  { titre: 'Presentation de la commune', contenu: 'Niakara dispose ici d un portail de reference pour ses services, ses actualites et ses demarches.' },
  { titre: 'Services municipaux', contenu: 'Etat civil, accueil, pilotage administratif, relation citoyenne et future extension multi-services.' },
  { titre: 'Mode SaaS', contenu: 'La meme base applicative pourra etre adaptee a d autres communes avec theming, roles et procedures propres.' },
];

export default function CommunePage() {
  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #0ea5e9 100%)', color: '#fff', padding: '72px 24px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', marginBottom: 18, fontSize: 14, fontWeight: 600 }}>
            {siteConfig.municipality} · Portail communal officiel numerique
          </div>
          <h1 style={{ fontSize: 46, lineHeight: 1.1, margin: 0, maxWidth: 950 }}>
            Services municipaux, demarches citoyennes et cockpit administratif dans une seule application robuste
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 900, marginTop: 22, opacity: 0.95 }}>
            Cette version sert de socle a la plateforme numerique de Niakara : portail public, espace citoyen, demandes d etat civil, suivi des dossiers, pilotage mairie et base SaaS multi-communes.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
            <Link href='/auth/login' style={{ background: '#fff', color: '#0f172a', padding: '14px 22px', borderRadius: 12, textDecoration: 'none', fontWeight: 700 }}>
              Connexion / inscription citoyenne
            </Link>
            <Link href='/commune/admin-console' style={{ background: 'transparent', color: '#fff', padding: '14px 22px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.35)', fontWeight: 700 }}>
              Ouvrir le cockpit mairie
            </Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
          {institutionBlocks.map((item) => (
            <article key={item.titre} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24, boxShadow: '0 8px 24px rgba(15,23,42,0.05)' }}>
              <h2 style={{ marginTop: 0, fontSize: 24 }}>{item.titre}</h2>
              <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.contenu}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 24px 48px' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24, boxShadow: '0 8px 24px rgba(15,23,42,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <h2 style={{ marginTop: 0, fontSize: 28 }}>Demarches prioritaires de Niakara</h2>
              <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>
                Les premieres procedures mises en ligne sont concentrees sur l etat civil et serviront de base au reste du catalogue communal.
              </p>
            </div>
            <Link href='/commune/espace-citoyen' style={{ textDecoration: 'none', color: '#1d4ed8', fontWeight: 700 }}>
              Voir mon espace citoyen
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, marginTop: 18 }}>
            {demarches.map((item) => (
              <article key={item.titre} style={{ background: '#fcfdff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                  <div style={{ fontWeight: 800 }}>{item.titre}</div>
                  <span style={{ color: '#0f766e', fontWeight: 700 }}>{item.statut}</span>
                </div>
                <p style={{ color: '#475569', lineHeight: 1.7 }}>{item.resume}</p>
                <Link href={item.href} style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'none' }}>
                  Demarrer la demarche
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
