export default function DemarchesPage() {
  const rows = [
    ['Declaration de naissance', 'Etat civil', 'Oui', 'Oui', 'Workflow prioritaire'],
    ['Declaration de deces', 'Etat civil', 'Oui', 'Oui', 'Workflow prioritaire'],
    ['Copie d acte', 'Etat civil', 'Oui', 'Oui', 'Recherche et retrait'],
    ['Organisation de mariage', 'Etat civil', 'Oui', 'Oui', 'Programmation et validation'],
    ['Prise en charge sociale', 'Social', 'Oui', 'Non', 'Phase suivante'],
    ['Consultation publique', 'Participation', 'Non', 'Non', 'Module futur'],
  ];

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 38, marginBottom: 8 }}>Catalogue des demarches</h1>
        <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 900 }}>
          Chaque demarche est pensee comme une procedure avec pieces, frais, statuts, validations et archivage.
        </p>
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #e5e7eb', padding: 20, marginTop: 22, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#eff6ff', textAlign: 'left' }}>
                {['Demarche', 'Domaine', 'Pieces', 'Paiement', 'Commentaire'].map((head) => (
                  <th key={head} style={{ padding: 14, borderBottom: '1px solid #dbeafe' }}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell} style={{ padding: 14, borderBottom: '1px solid #e5e7eb', color: '#334155' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
