export default function DossiersPage() {
  const rows = [
    { reference: 'NIC-2026-00021', procedure: 'Declaration de naissance', status: 'checked', next: 'validated' },
    { reference: 'NIC-2026-00017', procedure: 'Demande de copie d acte', status: 'available', next: 'delivered' },
    { reference: 'NIC-2026-00009', procedure: 'Declaration de deces', status: 'waiting-citizen', next: 'checked' },
  ];

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 38, marginBottom: 8 }}>Fondation dossiers et workflow</h1>
        <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 900 }}>
          Cette vue prepare le futur espace de pilotage des dossiers avec etats, prochaines etapes,
          affectation, pieces, validation et journal d actions.
        </p>
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #e5e7eb', padding: 20, marginTop: 22, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#eff6ff', textAlign: 'left' }}>
                {['Reference', 'Procedure', 'Statut', 'Prochaine etape'].map((head) => (
                  <th key={head} style={{ padding: 14, borderBottom: '1px solid #dbeafe' }}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.reference}>
                  <td style={{ padding: 14, borderBottom: '1px solid #e5e7eb' }}>{row.reference}</td>
                  <td style={{ padding: 14, borderBottom: '1px solid #e5e7eb' }}>{row.procedure}</td>
                  <td style={{ padding: 14, borderBottom: '1px solid #e5e7eb' }}>{row.status}</td>
                  <td style={{ padding: 14, borderBottom: '1px solid #e5e7eb' }}>{row.next}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
