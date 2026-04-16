export default function EspaceCitoyenPage() {
  const demandes = [
    { reference: 'NIC-2026-00021', titre: 'Declaration de naissance', statut: 'En verification', progression: '60%' },
    { reference: 'NIC-2026-00017', titre: 'Copie d acte de naissance', statut: 'Pret au retrait', progression: '100%' },
    { reference: 'NIC-2026-00009', titre: 'Declaration de deces', statut: 'Pieces complementaires attendues', progression: '35%' },
  ];

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontSize: 38, marginBottom: 8 }}>Espace citoyen</h1>
        <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 900 }}>
          Tableau de bord usager pour suivre les demarches, les paiements, les recus et l historique des dossiers.
        </p>
        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24, marginTop: 24 }}>
          <h2 style={{ marginTop: 0 }}>Mes demarches recentes</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {demandes.map((demande) => (
              <article key={demande.reference} style={{ border: '1px solid #e2e8f0', borderRadius: 14, padding: 18, background: '#fcfdff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>{demande.titre}</div>
                    <div style={{ color: '#64748b', marginTop: 4 }}>{demande.reference}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#1d4ed8' }}>{demande.statut}</div>
                </div>
                <div style={{ marginTop: 12, color: '#475569' }}>Progression : {demande.progression}</div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
