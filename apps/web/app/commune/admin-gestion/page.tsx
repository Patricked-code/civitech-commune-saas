"use client";

import { useEffect, useState } from 'react';
import { apiDelete, apiGet, apiPost, apiPut } from '../../../lib/api';
import { readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';

export default function AdminGestionPage() {
  const [users, setUsers] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const [userForm, setUserForm] = useState({ email: '', firstName: '', lastName: '', password: 'demo1234', userType: 'citizen', roleCodes: ['citizen'] });
  const [procedureForm, setProcedureForm] = useState({ code: '', title: '', category: 'Etat civil', feeAmount: '0', estimatedDelayDays: '3' });
  const [editingUserEmail, setEditingUserEmail] = useState('');
  const [editingProcedureCode, setEditingProcedureCode] = useState('');

  async function loadData() {
    const token = readToken();
    if (!token) {
      setError('Aucun token de session.');
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
      setError('');
    } catch (err) {
      setError('Impossible de charger les donnees admin.');
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function createUser(event) {
    event.preventDefault();
    const token = readToken();
    try {
      await apiPost('/api/admin/users', userForm, token);
      setUserForm({ email: '', firstName: '', lastName: '', password: 'demo1234', userType: 'citizen', roleCodes: ['citizen'] });
      await loadData();
    } catch (err) {
      setError('Creation utilisateur impossible.');
    }
  }

  async function createProcedure(event) {
    event.preventDefault();
    const token = readToken();
    try {
      await apiPost('/api/admin/procedures', {
        code: procedureForm.code,
        title: procedureForm.title,
        category: procedureForm.category,
        feeAmount: Number(procedureForm.feeAmount),
        estimatedDelayDays: Number(procedureForm.estimatedDelayDays),
      }, token);
      setProcedureForm({ code: '', title: '', category: 'Etat civil', feeAmount: '0', estimatedDelayDays: '3' });
      await loadData();
    } catch (err) {
      setError('Creation procedure impossible.');
    }
  }

  async function promoteUser(email) {
    const token = readToken();
    const user = users.find((item) => item.email === email);
    if (!token || !user) return;
    try {
      await apiPut('/api/admin/users/' + encodeURIComponent(email), {
        firstName: user.firstName,
        lastName: user.lastName,
        userType: 'agent',
        roleCodes: ['agent'],
      }, token);
      await loadData();
    } catch (err) {
      setError('Mise a jour utilisateur impossible.');
    }
  }

  async function saveUser(email) {
    const token = readToken();
    const user = users.find((item) => item.email === email);
    if (!token || !user) return;
    try {
      await apiPut('/api/admin/users/' + encodeURIComponent(email), {
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
        roleCodes: user.roleCodes,
      }, token);
      setEditingUserEmail('');
      await loadData();
    } catch (err) {
      setError('Sauvegarde utilisateur impossible.');
    }
  }

  async function deleteUser(email) {
    const token = readToken();
    if (!token) return;
    try {
      await apiDelete('/api/admin/users/' + encodeURIComponent(email), token);
      await loadData();
    } catch (err) {
      setError('Suppression utilisateur impossible.');
    }
  }

  async function saveProcedure(code) {
    const token = readToken();
    const procedure = procedures.find((item) => item.code === code);
    if (!token || !procedure) return;
    try {
      await apiPut('/api/admin/procedures/' + encodeURIComponent(code), {
        title: procedure.title,
        category: procedure.domain,
        feeAmount: Number(procedure.feeAmount || 0),
        estimatedDelayDays: Number(procedure.estimatedDelayDays || 3),
      }, token);
      setEditingProcedureCode('');
      await loadData();
    } catch (err) {
      setError('Sauvegarde procedure impossible.');
    }
  }

  async function deleteProcedure(code) {
    const token = readToken();
    if (!token) return;
    try {
      await apiDelete('/api/admin/procedures/' + encodeURIComponent(code), token);
      await loadData();
    } catch (err) {
      setError('Suppression procedure impossible.');
    }
  }

  return (
    <ProtectedView>
      <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 38, marginBottom: 8 }}>Admin gestion connectee</h1>
            <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 900 }}>
              Cette vue enrichit le cockpit admin avec des formulaires connectes et des actions de mutation, y compris l edition utilisateur et procedure.
            </p>
          </div>

          {error ? <p style={{ color: '#b91c1c' }}>{error}</p> : null}

          <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Roles disponibles</h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {roles.map((role) => (
                <span key={role.code} style={{ padding: '8px 12px', borderRadius: 999, background: '#eff6ff', color: '#1e3a8a' }}>{role.code}</span>
              ))}
            </div>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
              <h2 style={{ marginTop: 0 }}>Creer un utilisateur</h2>
              <form onSubmit={createUser} style={{ display: 'grid', gap: 12 }}>
                <input placeholder='Email' value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                <input placeholder='Prenom' value={userForm.firstName} onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                <input placeholder='Nom' value={userForm.lastName} onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                <input placeholder='Mot de passe' value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                <select value={userForm.userType} onChange={(e) => setUserForm({ ...userForm, userType: e.target.value, roleCodes: [e.target.value === 'admin' ? 'commune_admin' : e.target.value] })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }}>
                  <option value='citizen'>citizen</option>
                  <option value='agent'>agent</option>
                  <option value='admin'>admin</option>
                </select>
                <button type='submit' style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>Creer utilisateur</button>
              </form>
            </section>

            <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
              <h2 style={{ marginTop: 0 }}>Creer une procedure</h2>
              <form onSubmit={createProcedure} style={{ display: 'grid', gap: 12 }}>
                <input placeholder='Code' value={procedureForm.code} onChange={(e) => setProcedureForm({ ...procedureForm, code: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                <input placeholder='Titre' value={procedureForm.title} onChange={(e) => setProcedureForm({ ...procedureForm, title: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                <input placeholder='Categorie' value={procedureForm.category} onChange={(e) => setProcedureForm({ ...procedureForm, category: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                <input placeholder='Frais' value={procedureForm.feeAmount} onChange={(e) => setProcedureForm({ ...procedureForm, feeAmount: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                <input placeholder='Delai en jours' value={procedureForm.estimatedDelayDays} onChange={(e) => setProcedureForm({ ...procedureForm, estimatedDelayDays: e.target.value })} style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
                <button type='submit' style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>Creer procedure</button>
              </form>
            </section>
          </div>

          <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Procedures existantes</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {procedures.map((procedure) => (
                <article key={procedure.code || procedure.id} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                  {editingProcedureCode === procedure.code ? (
                    <div style={{ display: 'grid', gap: 10 }}>
                      <input value={procedure.title} onChange={(e) => setProcedures(procedures.map((item) => item.code === procedure.code ? { ...item, title: e.target.value } : item))} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }} />
                      <input value={procedure.domain} onChange={(e) => setProcedures(procedures.map((item) => item.code === procedure.code ? { ...item, domain: e.target.value } : item))} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }} />
                      <input value={procedure.feeAmount} onChange={(e) => setProcedures(procedures.map((item) => item.code === procedure.code ? { ...item, feeAmount: e.target.value } : item))} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }} />
                      <button onClick={() => saveProcedure(procedure.code)} style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 8 }}>Sauvegarder</button>
                    </div>
                  ) : (
                    <>
                      <strong>{procedure.title}</strong>
                      <div style={{ color: '#334155', marginTop: 4 }}>Code: {procedure.code}</div>
                      <div style={{ color: '#334155', marginTop: 4 }}>Domaine: {procedure.domain}</div>
                      <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
                        <button onClick={() => setEditingProcedureCode(procedure.code)} style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 8 }}>Editer</button>
                        <button onClick={() => deleteProcedure(procedure.code)} style={{ background: '#b91c1c', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 8 }}>Supprimer</button>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Utilisateurs existants</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {users.map((user) => (
                <article key={user.email} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
                  {editingUserEmail === user.email ? (
                    <div style={{ display: 'grid', gap: 10 }}>
                      <input value={user.firstName} onChange={(e) => setUsers(users.map((item) => item.email === user.email ? { ...item, firstName: e.target.value } : item))} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }} />
                      <input value={user.lastName} onChange={(e) => setUsers(users.map((item) => item.email === user.email ? { ...item, lastName: e.target.value } : item))} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }} />
                      <select value={user.userType} onChange={(e) => setUsers(users.map((item) => item.email === user.email ? { ...item, userType: e.target.value, roleCodes: [e.target.value === 'admin' ? 'commune_admin' : e.target.value] } : item))} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }}>
                        <option value='citizen'>citizen</option>
                        <option value='agent'>agent</option>
                        <option value='admin'>admin</option>
                      </select>
                      <button onClick={() => saveUser(user.email)} style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 8 }}>Sauvegarder</button>
                    </div>
                  ) : (
                    <>
                      <strong>{user.firstName} {user.lastName}</strong>
                      <div style={{ color: '#334155', marginTop: 4 }}>{user.email}</div>
                      <div style={{ color: '#334155', marginTop: 4 }}>{(user.roleCodes || []).join(', ')}</div>
                      <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
                        <button onClick={() => setEditingUserEmail(user.email)} style={{ background: '#1d4ed8', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 8 }}>Editer</button>
                        <button onClick={() => promoteUser(user.email)} style={{ background: '#0f766e', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 8 }}>Promouvoir agent</button>
                        <button onClick={() => deleteUser(user.email)} style={{ background: '#b91c1c', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 8 }}>Supprimer</button>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </ProtectedView>
  );
}
