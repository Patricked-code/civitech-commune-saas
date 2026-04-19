"use client";

import { useEffect, useState } from 'react';
import { apiDelete, apiGet, apiPut } from '../../../lib/api';
import { readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';
import type { AdminUser, ProcedureItem, RoleItem } from '../../../lib/appTypes';

export default function AdminCrudPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [procedures, setProcedures] = useState<ProcedureItem[]>([]);
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [status, setStatus] = useState('');

  async function loadData() {
    const token = readToken();
    if (!token) {
      setStatus('Session absente.');
      return;
    }
    try {
      const [usersData, proceduresData, rolesData] = await Promise.all([
        apiGet('/api/admin/users', token),
        apiGet('/api/admin/procedures', token),
        apiGet('/api/admin/roles', token),
      ]);
      setUsers(usersData.data || []);
      setProcedures(proceduresData.data || []);
      setRoles(rolesData.data || []);
      setStatus('');
    } catch (error) {
      setStatus('Chargement impossible.');
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function promoteFirstCitizen() {
    const token = readToken();
    const target = users.find((item) => item.userType === 'citizen');
    if (!token || !target) return;
    try {
      await apiPut('/api/admin/users/' + encodeURIComponent(target.email), {
        firstName: target.firstName,
        lastName: target.lastName,
        userType: 'agent',
        roleCodes: ['agent'],
      }, token);
      setStatus('Utilisateur mis a jour.');
      await loadData();
    } catch (error) {
      setStatus('Mise a jour utilisateur impossible.');
    }
  }

  async function deleteLastProcedure() {
    const token = readToken();
    const target = procedures[procedures.length - 1];
    if (!token || !target || !target.code) return;
    try {
      await apiDelete('/api/admin/procedures/' + encodeURIComponent(target.code), token);
      setStatus('Procedure supprimee.');
      await loadData();
    } catch (error) {
      setStatus('Suppression procedure impossible.');
    }
  }

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Admin CRUD connecte</h1>
            <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 900 }}>
              Cette vue teste les routes de mise a jour et suppression ainsi que la lecture des roles.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={promoteFirstCitizen} style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>
              Promouvoir le premier citizen en agent
            </button>
            <button onClick={deleteLastProcedure} style={{ background: '#b91c1c', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>
              Supprimer la derniere procedure
            </button>
          </div>

          {status ? <p style={{ color: status.includes('impossible') ? '#b91c1c' : '#166534' }}>{status}</p> : null}

          <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Roles</h2>
            <div style={{ display: 'grid', gap: 10 }}>
              {roles.map((role) => (
                <article key={role.code} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                  <strong>{role.label}</strong>
                  <div style={{ color: '#64748b', marginTop: 4 }}>{role.code}</div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </ProtectedView>
  );
}
