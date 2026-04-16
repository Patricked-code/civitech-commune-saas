export default function AdminPage() {
  const cards = [
    { titre: 'Dossiers en attente', valeur: 18 },
    { titre: 'Demandes de complements', valeur: 7 },
    { titre: 'Actes prets au retrait', valeur: 12 },
    { titre: 'Alertes SLA', valeur: 3 },
  ];

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 38, marginBottom: 8 }}>Cockpit administrateur communal</h1>
        <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 900 }}>
          Supervision des demandes, affectation par service, validation, suivi des delais, archivage et tracabilite.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 24 }}>
          {cards.map((item) => (
            <div key={item.titre} style={{ background: '#fff', borderRadius: 18, border: '1px solid #e5e7eb', padding: 22 }}>
              <div style={{ color: '#64748b', fontSize: 14 }}>{item.titre}</div>
              <div style={{ fontSize: 34, fontWeight: 800, marginTop: 8 }}>{item.valeur}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
