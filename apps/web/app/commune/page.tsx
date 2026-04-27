import Link from 'next/link';
import React from 'react';
import { siteConfig } from '../../lib/site';

const demarches = [
  {
    titre: 'Declaration de naissance',
    statut: 'Disponible',
    href: '/commune/demarches/declaration-naissance',
    resume: 'Depot en ligne, pieces justificatives, brouillon, soumission et suivi mairie.',
  },
  {
    titre: 'Demande de copie d acte',
    statut: 'Disponible',
    href: '/commune/demarches/demande-copie-acte',
    resume: 'Demande numerique, controle administratif, impression et retrait organise.',
  },
  {
    titre: 'Declaration de deces',
    statut: 'Disponible',
    href: '/commune/demarches/declaration-deces',
    resume: 'Saisie initiale, verification des informations et circuit de validation.',
  },
  {
    titre: 'Organisation de mariage',
    statut: 'Disponible',
    href: '/commune/demarches/organisation-mariage',
    resume: 'Preparation du dossier, coordination des pieces et suivi avec la mairie.',
  },
];

const institutionBlocks = [
  { titre: 'Informer', contenu: 'Actualites, agenda, documents utiles, FAQ, transparence et informations pratiques pour les habitants.' },
  { titre: 'Servir', contenu: 'Demarches en ligne, espace citoyen, suivi des dossiers et assistance aux usagers.' },
  { titre: 'Piloter', contenu: 'Cockpit mairie, priorites du jour, validation documentaire, reporting et workflow administratif.' },
  { titre: 'Reutiliser', contenu: 'Architecture SaaS preparee pour adapter le meme socle a d autres communes.' },
];

const portalLinks = [
  { href: '/commune/presentation', label: 'Presentation de la commune', text: 'Comprendre le role du portail et la trajectoire numerique.' },
  { href: '/commune/services', label: 'Services municipaux', text: 'Identifier les services et les premieres fonctions connectees.' },
  { href: '/commune/actualites', label: 'Actualites', text: 'Consulter les annonces et informations utiles.' },
  { href: '/commune/agenda', label: 'Agenda', text: 'Suivre les temps forts et rendez-vous communaux.' },
  { href: '/commune/documents', label: 'Documents utiles', text: 'Retrouver les pieces et supports publics.' },
  { href: '/commune/contact', label: 'Contact', text: 'Trouver le bon point d entree pour une demande.' },
];

export default function CommunePage() {
  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      <section style={{ background: 'radial-gradient(circle at top right, rgba(14,165,233,0.35), transparent 30%), linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #0ea5e9 100%)', color: '#fff', padding: '76px 24px 58px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div style={{ display: 'inline-block', width: 'fit-content', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', fontSize: 14, fontWeight: 800 }}>
            {siteConfig.municipality} · Portail communal officiel numerique
          </div>
          <h1 style={{ fontSize: 50, lineHeight: 1.06, margin: 0, maxWidth: 980 }}>
            Le guichet numerique de Niakara pour informer, orienter et suivre les demandes citoyennes
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.75, maxWidth: 900, opacity: 0.95 }}>
            Cette plateforme rassemble les informations institutionnelles, les demarches prioritaires, l espace citoyen et les outils de pilotage mairie dans une base robuste, progressive et reutilisable.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href='/commune/demarches' style={{ background: '#fff', color: '#0f172a', padding: '14px 22px', borderRadius: 12, textDecoration: 'none', fontWeight: 800 }}>
              Acceder aux demarches
            </Link>
            <Link href='/auth/login' style={{ background: 'transparent', color: '#fff', padding: '14px 22px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.35)', fontWeight: 800 }}>
              Connexion / inscription citoyenne
            </Link>
            <Link href='/commune/admin-console' style={{ background: 'rgba(15,23,42,0.28)', color: '#fff', padding: '14px 22px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.22)', fontWeight: 800 }}>
              Cockpit mairie
            </Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '34px 24px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 18 }}>
          {institutionBlocks.map((item) => (
            <article key={item.titre} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: 24, boxShadow: '0 8px 24px rgba(15,23,42,0.05)' }}>
              <h2 style={{ marginTop: 0, fontSize: 24 }}>{item.titre}</h2>
              <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>{item.contenu}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px 20px' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 24, padding: 28, boxShadow: '0 10px 30px rgba(15,23,42,0.06)' }}>
          <h2 style={{ marginTop: 0, fontSize: 30 }}>Explorer le portail communal</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(245px, 1fr))', gap: 16 }}>
            {portalLinks.map((item) => (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none', border: '1px solid #e2e8f0', borderRadius: 16, padding: 18, background: '#fcfdff', color: '#0f172a' }}>
                <div style={{ fontWeight: 900, fontSize: 18 }}>{item.label}</div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: 0 }}>{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px 58px' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 24, padding: 28, boxShadow: '0 10px 30px rgba(15,23,42,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ marginTop: 0, fontSize: 30 }}>Demarches prioritaires de Niakara</h2>
              <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 0, maxWidth: 760 }}>
                Les premieres procedures sont concentrees sur l etat civil. Elles servent de base au futur catalogue complet des services communaux.
              </p>
            </div>
            <Link href='/commune/espace-citoyen' style={{ textDecoration: 'none', color: '#1d4ed8', fontWeight: 900 }}>
              Voir mon espace citoyen
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, marginTop: 18 }}>
            {demarches.map((item) => (
              <article key={item.titre} style={{ background: '#fcfdff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                  <div style={{ fontWeight: 900, fontSize: 18 }}>{item.titre}</div>
                  <span style={{ color: '#0f766e', fontWeight: 900, fontSize: 13 }}>{item.statut}</span>
                </div>
                <p style={{ color: '#475569', lineHeight: 1.7 }}>{item.resume}</p>
                <Link href={item.href} style={{ color: '#1d4ed8', fontWeight: 900, textDecoration: 'none' }}>
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
