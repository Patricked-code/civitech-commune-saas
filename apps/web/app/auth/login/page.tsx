export default function LoginPage() {
  const demoUsers = [
    'citoyen@niakara.ci / demo1234',
    'agent.etatcivil@niakara.ci / demo1234',
    'admin@niakara.ci / demo1234',
  ];

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#f8fafc' }}>
      <div style={{ width: '100%', maxWidth: 560, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 28 }}>
        <h1 style={{ marginTop: 0 }}>Connexion</h1>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>
          Cette page prepare l integration future du vrai parcours d authentification.
          Les endpoints backend sont deja poses pour la fondation de connexion et des roles.
        </p>
        <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: '#eff6ff', color: '#1e3a8a' }}>
          <strong>Comptes de demonstration</strong>
          <ul style={{ paddingLeft: 18, marginBottom: 0 }}>
            {demoUsers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
