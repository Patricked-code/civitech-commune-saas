"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiPost } from "../../../lib/api";
import { writeStoredUser, writeToken } from "../../../lib/session";
import { siteConfig } from "../../../lib/site";
import { FormError } from "../../../components/FormError";
import { showToast } from "../../../components/Toast";
import { LogIn, UserPlus } from "lucide-react";

const demoUsers = [
  { email: "citoyen@niakara.ci", password: "demo1234", role: "Citoyen" },
  { email: "agent.etatcivil@niakara.ci", password: "demo1234", role: "Agent" },
  { email: "admin@niakara.ci", password: "demo1234", role: "Admin" },
];

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [loginForm, setLoginForm] = useState({
    email: "admin@niakara.ci",
    password: "demo1234",
  });

  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const response = await apiPost("/api/auth/login", {
        email: loginForm.email,
        password: loginForm.password,
      });
      writeToken(response.token);
      writeStoredUser(response.user);
      showToast("Connexion réussie", "success");
      router.push("/commune/admin-console");
    } catch (error: any) {
      if (error.status === 400 && error.data?.errors) {
        const errorMap: Record<string, string[]> = {};
        error.data.errors.forEach((err: any) => {
          const field = err.path || "general";
          if (!errorMap[field]) errorMap[field] = [];
          errorMap[field].push(err.msg);
        });
        setErrors(errorMap);
      } else {
        showToast("Identifiants invalides", "error");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    // Validation côté client
    const newErrors: Record<string, string[]> = {};
    if (registerForm.password !== registerForm.passwordConfirm) {
      newErrors.passwordConfirm = ["Les mots de passe ne correspondent pas"];
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiPost("/api/auth/register", {
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        email: registerForm.email,
        password: registerForm.password,
        tenantSlug: "niakaramadougou",
      });
      writeToken(response.token);
      writeStoredUser(response.user);
      showToast("Compte citoyen créé avec succès", "success");
      router.push("/commune/espace-citoyen");
    } catch (error: any) {
      if (error.status === 400 && error.data?.errors) {
        const errorMap: Record<string, string[]> = {};
        error.data.errors.forEach((err: any) => {
          const field = err.path || "general";
          if (!errorMap[field]) errorMap[field] = [];
          errorMap[field].push(err.msg);
        });
        setErrors(errorMap);
      } else if (error.status === 409) {
        setErrors({ email: ["Cet email est déjà utilisé"] });
      } else {
        showToast("Erreur lors de la création du compte", "error");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Colonne gauche: Formulaire */}
          <div className="card shadow-lg">
            <div className="mb-6">
              <div className="text-primary font-bold text-lg mb-2">{siteConfig.municipality}</div>
              <h1 className="text-2xl font-bold text-slate-900">
                {mode === "login" ? "Connexion" : "Inscription Citoyenne"}
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                {mode === "login"
                  ? "Accédez à votre espace personnel"
                  : "Créez votre compte pour accéder aux services"}
              </p>
            </div>

            {/* Onglets */}
            <div className="flex gap-2 mb-6 border-b border-slate-200">
              <button
                onClick={() => {
                  setMode("login");
                  setErrors({});
                }}
                className={`pb-3 px-1 font-semibold text-sm transition-colors ${
                  mode === "login"
                    ? "text-primary border-b-2 border-primary"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <LogIn className="inline w-4 h-4 mr-2" />
                Connexion
              </button>
              <button
                onClick={() => {
                  setMode("register");
                  setErrors({});
                }}
                className={`pb-3 px-1 font-semibold text-sm transition-colors ${
                  mode === "register"
                    ? "text-primary border-b-2 border-primary"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <UserPlus className="inline w-4 h-4 mr-2" />
                Inscription
              </button>
            </div>

            <FormError errors={errors} />

            {mode === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="••••••••"
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Prénom</label>
                    <input
                      type="text"
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                      placeholder="Jean"
                      className="input-field"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={registerForm.lastName}
                      onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                      placeholder="Dupont"
                      className="input-field"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe</label>
                  <input
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    placeholder="••••••••"
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    value={registerForm.passwordConfirm}
                    onChange={(e) => setRegisterForm({ ...registerForm, passwordConfirm: e.target.value })}
                    placeholder="••••••••"
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Création en cours..." : "Créer mon compte"}
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-primary hover:underline font-medium">
                ← Retour à l'accueil
              </Link>
            </div>
          </div>

          {/* Colonne droite: Comptes de démonstration */}
          <div className="hidden md:flex flex-col justify-center">
            <div className="card bg-blue-50 border-blue-200">
              <h3 className="font-bold text-lg text-blue-900 mb-4">Comptes de Démonstration</h3>
              <div className="space-y-3">
                {demoUsers.map((user, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 border border-blue-100">
                    <p className="text-xs text-slate-600 font-medium mb-1">
                      <span className="badge badge-primary">{user.role}</span>
                    </p>
                    <p className="text-sm font-mono text-slate-900 break-all">{user.email}</p>
                    <p className="text-xs text-slate-500 mt-1">Mot de passe: {user.password}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-blue-800 mt-4 p-3 bg-blue-100 rounded-lg">
                ℹ️ Ces comptes sont fournis à titre de démonstration. Utilisez-les pour explorer l'application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
