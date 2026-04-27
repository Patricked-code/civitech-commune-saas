"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiGet, getApiErrorMessage } from '../../../lib/api';
import { removeToken, readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';

type AdminSummary = {
  usersCount: number;
  proceduresCount: number;
  dossiersCount: number;
  rolesCount?: number;
};

type AdminUser = {
  email: string;
  firstName: string;
  lastName: string;
  userType?: string;
  roleCodes?: string[];
};

const adminShortcuts = [
  { href: '/commune/agent-dossiers', label: 'File des dossiers', text: 'Suivre les demandes a traiter par les agents.' },
  { href: '/commune/agent-validation-documents', label: 'Validation documents', text: 'Verifier les pieces jointes et statuts documentaires.' },
  { href: '/commune/admin-gestion', label: 'Procedures', text: 'Administrer le catalogue des demarches communales.' },
  { href: '/commune/admin-crud', label: 'Usagers et roles', text: 'Piloter les comptes, roles et acces.' },
  { href: '/commune/dossiers-connectes', label: 'Dossiers connectes', text: 'Verifier les dossiers persistants et leur cycle de vie.' },
];

export default function AdminConsolePage() {
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const token = readToken();
      if (!token) {
        setError('Aucun token de session detecte.');
        return;
      }
      try {
        const [summaryData, usersData] = await Promise.all([
          apiGet('/api/admin/summary', token),
          apiGet('/api/admin/users', token),
        ]);
        setSummary(summaryData);
        setUsers(usersData.data || []);
      } catch (err) {
        setError(getApiErrorMessage(err, 'Impossible de charger le cockpit admin.'));
      }
    }
    load();
  }, []);

  const userTypeStats = useMemo(() => {
    const stats: Record<string, number> = {};
    users.forEach((user) => {
      const key = user.userType || 'non renseigne';
      stats[key] = (stats[key] || 0) + 1;
    });
    return Object.entries(stats);
  }, [users]);

  function logout() {
    removeToken();
    window.location.href = '/auth/login';
  }

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px', color: '#0f172a' }}>
        <div style={{ maxWidth: 1220, margin: '0 auto', display: 'grid', gap: 24 }}>
          <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 60%, #0ea5e9 100%)', color: '#fff', borderRadius: 26, padding: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 18, flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'inline-block', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', fontWeight: 900, marginBottom: 14 }}>
                  Cockpit mairie · Niakara
                </div>
                <h1 style={{ fontSize: 42, lineHeight: 1.08, margin: 0 }}>Tableau de pilotage communal</h1>
                <p style={{ lineHeight: 1.75, opacity: 0.95, maxWidth: 860 }}>
                  Vision consolidee des usagers, procedures, dossiers et priorites pour preparer l exploitation quotidienne par les services municipaux.
                </p>
              </div>
              <button onClick={logout} style={{ background: '#fff', color: '#0f172a', border: 'none', padding: '12px 16px', borderRadius: 12, fontWeight: 900 }}>
                Se deconnecter
              </button>
            </div>
          </section>

          {error ? <p style={{ color: '#b91c1c', background: '#fee2e2', border: '1px solid #fecaca', padding: 14, borderRadius: 14 }}>{error}</p> : null}

          {summary ? (
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
              {[
                { label: 'Utilisateurs', value: summary.usersCount, help: 'Comptes citoyens, agents et administrateurs' },
                { label: 'Procedures', value: summary.proceduresCount, help: 'Demarches configurees dans le catalogue' },
                { label: 'Dossiers', value: summary.dossiersCount, help: 'Demandes enregistrees dans la plateforme' },
                { label: 'Roles', value: summary.rolesCount || 0, help: 'Profils et habilitations disponibles' },
              ].map((item) => (
                <article key={item.label} style={{ background: '#fff', borderRadius: 20, border: '1px solid #e5e7eb', padding: 22, boxShadow: '0 8px 24px rgba(15,23,42,0.05)' }}>
                  <div style={{ color: '#64748b', fontWeight: 800 }}>{item.label}</div>
                  <div style={{ fontSize: 34, fontWeight: 900, marginTop: 8 }}>{item.value}</div>
                  <p style={{ color: '#64748b', lineHeight: 1.55, marginBottom: 0 }}>{item.help}</p>
                </article>
              ))}
            </section>
          ) : null}

          <section style={{ background: '#fff', borderRadius: 22, border: '1px solid #e5e7eb', padding: 24, boxShadow: '0 10px 30px rgba(15,23,42,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 30 }}>Actions rapides mairie</h2>
                <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 780 }}>
                  Ces acces structurent le futur cockpit quotidien : traitement des dossiers, validation documentaire, gestion des procedures et administration des comptes.
                </p>
              </div>
              <span style={{ background: '#eff6ff', color: '#1e3a8a', borderRadius: 999, padding: '8px 12px', fontWeight: 900 }}>Backoffice</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16, marginTop: 12 }}>
              {adminShortcuts.map((item) => (
                <Link key={item.href} href={item.href} style={{ border: '1px solid #e2e8f0', borderRadius: 18, padding: 18, textDecoration: 'none', color: '#0f172a', background: '#fcfdff' }}>
                  <div style={{ fontWeight: 900, fontSize: 18 }}>{item.label}</div>
                  <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: 0 }}>{item.text}</p>
                </Link>
              ))}
            </div>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(280px, 0.65fr)', gap: 20 }}>
            <div style={{ background: '#fff', borderRadius: 22, border: '1px solid #e5e7eb', padding: 24 }}>
              <h2 style={{ marginTop: 0 }}>Utilisateurs recents</h2>
              <div style={{ display: 'grid', gap: 12 }}>
                {users.map((user) => (
                  <article key={user.email} style={{ border: '1px solid #e2e8f0', borderRadius: 14, padding: 14, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div>
                      <strong>{user.firstName} {user.lastName}</strong>
                      <div style={{ color: '#64748b', marginTop: 4 }}>{user.email}</div>
                    </div>
                    <div style={{ display: 'grid', gap: 6, justifyItems: 'end' }}>
                      <span style={{ color: '#1d4ed8', fontWeight: 900 }}>{user.userType || 'user'}</span>
                      <span style={{ color: '#334155' }}>{(user.roleCodes || []).join(', ') || 'role non renseigne'}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside style={{ background: '#fff', borderRadius: 22, border: '1px solid #e5e7eb', padding: 24 }}>
              <h2 style={{ marginTop: 0 }}>Repartition profils</h2>
              <div style={{ display: 'grid', gap: 10 }}>
                {userTypeStats.length === 0 ? <p style={{ color: '#64748b' }}>Aucun utilisateur charge.</p> : null}
                {userTypeStats.map(([label, count]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
                    <span style={{ color: '#334155', fontWeight: 800 }}>{label}</span>
                    <strong>{count}</strong>
                  </div>
                ))}
              </div>
            </aside>
          </section>
        </div>
      </main>
    </ProtectedView>
  );
}
