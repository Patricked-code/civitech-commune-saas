import Link from 'next/link';
import React from 'react';

const demarches = [
  { titre: 'Declaration de naissance', statut: 'Disponible' },
  { titre: 'Declaration de deces', statut: 'Disponible' },
  { titre: 'Demande de copie d acte', statut: 'Disponible' },
  { titre: 'Organisation de mariage', statut: 'Bientot disponible' },
];

export default function CommunePage() {
  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #0ea5e9 100%)', color: '#fff', padding: '72px 24px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', marginBottom: 18, fontSize: 14, fontWeight: 600 }}>
            Portail communal - MVP SaaS
          </div>
          <h1 style={{ fontSize: 46, lineHeight: 1.1, margin: 0, maxWidth: 950 }}>
            Plateforme de digitalisation communale pour les demarches, la relation citoyenne et le pilotage administratif
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 900, marginTop: 22, opacity: 0.95 }}>
            Cette base couvre le portail public, l espace citoyen, les demarches prioritaires d etat civil,
            le cockpit administrateur, la gestion documentaire et la logique de workflow.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
            <Link href="/commune/espace-citoyen" style={{ background: '#fff', color: '#0f172a', padding: '14px 22px', borderRadius: 12, textDecoration: 'none', fontWeight: 700 }}>
              Espace citoyen
            </Link>
            <Link href="/commune/admin" style={{ background: 'transparent', color: '#fff', padding: '14px 22px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.35)', fontWeight: 700 }}>
              Cockpit admin
            </Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 40px' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24, boxShadow: '0 8px 24px rgba(15,23,42,0.06)' }}>
          <h2 style={{ marginTop: 0, fontSize: 28 }}>Demarches prioritaires</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, marginTop: 18 }}>
            {demarches.map((item) => (
              <article key={item.titre} style={{ background: '#fcfdff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 18 }}>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>{item.titre}</div>
                <div style={{ color: '#475569' }}>{item.statut}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
