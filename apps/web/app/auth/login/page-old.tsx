"use client";

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiPost } from '../../../lib/api';
import { writeStoredUser, writeToken } from '../../../lib/session';
import { siteConfig } from '../../../lib/site';

const demoUsers = [
  'citoyen@niakara.ci / demo1234',
  'agent.etatcivil@niakara.ci / demo1234',
  'admin@niakara.ci / demo1234',
];

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('admin@niakara.ci');
  const [loginPassword, setLoginPassword] = useState('demo1234');
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [status, setStatus] = useState('');

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Connexion en cours...');
    try {
      const response = await apiPost('/api/auth/login', { email: loginEmail, password: loginPassword });
      writeToken(response.token);
      writeStoredUser(response.user);
      setStatus('Connexion reussie.');
      router.push('/commune/admin-console');
    } catch (error) {
      setStatus('Echec de connexion.');
    }
  }

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Creation du compte citoyen en cours...');
    try {
      const response = await apiPost('/api/auth/register', {
        ...registerForm,
        tenantSlug: 'niakaramadougou',
      });
      writeToken(response.token);
      writeStoredUser(response.user);
      setStatus('Compte citoyen cree avec succes.');
      router.push('/commune/espace-citoyen');
    } catch (error) {
      setStatus('Creation du compte impossible.');
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#f8fafc' }}>
      <div style={{ width: '100%', maxWidth: 720, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 22, padding: 32, boxShadow: '0 12px 32px rgba(15,23,42,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#1d4ed8', fontWeight: 700, marginBottom: 8 }}>{siteConfig.municipality}</div>
            <h1 style={{ margin: 0 }}>Connexion et inscription citoyenne</h1>
          </div>
          <Link href='/' style={{ textDecoration: 'none', color: '#334155', fontWeight: 600 }}>Retour accueil</Link>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 24, marginBottom: 20, flexWrap: 'wrap' }}>
          <button onClick={() => setMode('login')} style={{ background: mode === 'login' ? '#1d4ed8' : '#fff', color: mode === 'login' ? '#fff' : '#334155', border: '1px solid #cbd5e1', padding: '10px 14px', borderRadius: 999, fontWeight: 700 }}>
            Connexion
          </button>
          <button onClick={() => setMode('register')} style={{ background: mode === 'register' ? '#1d4ed8' : '#fff', color: mode === 'register' ? '#fff' : '#334155', border: '1px solid #cbd5e1', padding: '10px 14px', borderRadius: 999, fontWeight: 700 }}>
            Inscription citoyenne
          </button>
        </div>

        {mode === 'login' ? (
          <form onSubmit={handleLogin} style={{ display: 'grid', gap: 12 }}>
            <input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder='Email' style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            <input type='password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder='Mot de passe' style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            <button type='submit' style={{ background: '#1d4ed8', color: '#fff', padding: '14px 18px', borderRadius: 12, border: 'none', fontWeight: 700 }}>
              Se connecter
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input value={registerForm.firstName} onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })} placeholder='Prenom' style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
              <input value={registerForm.lastName} onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })} placeholder='Nom' style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            </div>
            <input value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} placeholder='Email' style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            <input type='password' value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} placeholder='Mot de passe' style={{ padding: 12, borderRadius: 10, border: '1px solid #cbd5e1' }} />
            <button type='submit' style={{ background: '#0f766e', color: '#fff', padding: '14px 18px', borderRadius: 12, border: 'none', fontWeight: 700 }}>
              Creer mon compte citoyen
            </button>
          </form>
        )}

        <p style={{ color: '#475569', marginTop: 14 }}>{status}</p>

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
