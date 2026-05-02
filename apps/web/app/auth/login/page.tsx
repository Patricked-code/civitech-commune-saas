"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, LogIn, UserPlus } from "lucide-react";
import { apiPost } from "../../../lib/api";
import { writeStoredUser, writeToken } from "../../../lib/session";
import { siteConfig } from "../../../lib/site";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Card, CardBody, CardHeader } from "../../../components/ui/Card";
import { Alert } from "../../../components/ui/Alert";
import { Badge } from "../../../components/ui/Badge";
import { showToast } from "../../../components/Toast";

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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Form */}
          <div className="animate-slide-left">
            <Card elevated>
              <CardHeader className="border-b-0">
                <div className="mb-6">
                  <Link href="/" className="inline-block mb-4">
                    <div className="text-2xl font-display font-bold text-gradient">
                      {siteConfig.municipality}
                    </div>
                  </Link>
                  <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">
                    {mode === "login" ? "Bienvenue" : "Créer un compte"}
                  </h1>
                  <p className="text-slate-600">
                    {mode === "login"
                      ? "Accédez à votre espace personnel"
                      : "Rejoignez notre communauté de citoyens"}
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-slate-200">
                  <button
                    onClick={() => {
                      setMode("login");
                      setErrors({});
                    }}
                    className={`pb-3 px-1 font-semibold text-sm transition-colors flex items-center gap-2 ${
                      mode === "login"
                        ? "text-primary-600 border-b-2 border-primary-600"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <LogIn className="w-4 h-4" />
                    Connexion
                  </button>
                  <button
                    onClick={() => {
                      setMode("register");
                      setErrors({});
                    }}
                    className={`pb-3 px-1 font-semibold text-sm transition-colors flex items-center gap-2 ${
                      mode === "register"
                        ? "text-primary-600 border-b-2 border-primary-600"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <UserPlus className="w-4 h-4" />
                    Inscription
                  </button>
                </div>
              </CardHeader>

              <CardBody className="space-y-6">
                {Object.keys(errors).length > 0 && (
                  <Alert variant="error" title="Erreur de validation" dismissible>
                    {Object.entries(errors)
                      .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
                      .join(" | ")}
                  </Alert>
                )}

                {mode === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                      label="Email"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      placeholder="votre@email.com"
                      icon={<Mail className="w-4 h-4" />}
                      disabled={isLoading}
                    />
                    <Input
                      label="Mot de passe"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder="••••••••"
                      icon={<Lock className="w-4 h-4" />}
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isLoading}
                      icon={<LogIn className="w-4 h-4" />}
                    >
                      Se connecter
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Prénom"
                        type="text"
                        value={registerForm.firstName}
                        onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                        placeholder="Jean"
                        icon={<User className="w-4 h-4" />}
                        disabled={isLoading}
                      />
                      <Input
                        label="Nom"
                        type="text"
                        value={registerForm.lastName}
                        onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                        placeholder="Dupont"
                        disabled={isLoading}
                      />
                    </div>
                    <Input
                      label="Email"
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      placeholder="votre@email.com"
                      icon={<Mail className="w-4 h-4" />}
                      disabled={isLoading}
                    />
                    <Input
                      label="Mot de passe"
                      type="password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      placeholder="••••••••"
                      icon={<Lock className="w-4 h-4" />}
                      disabled={isLoading}
                      hint="Minimum 6 caractères"
                    />
                    <Input
                      label="Confirmer le mot de passe"
                      type="password"
                      value={registerForm.passwordConfirm}
                      onChange={(e) => setRegisterForm({ ...registerForm, passwordConfirm: e.target.value })}
                      placeholder="••••••••"
                      icon={<Lock className="w-4 h-4" />}
                      disabled={isLoading}
                      error={errors.passwordConfirm?.[0]}
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      fullWidth
                      isLoading={isLoading}
                      icon={<UserPlus className="w-4 h-4" />}
                    >
                      Créer mon compte
                    </Button>
                  </form>
                )}

                <div className="text-center pt-4">
                  <Link href="/" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    ← Retour à l'accueil
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Demo Accounts */}
          <div className="hidden lg:block animate-slide-right">
            <Card elevated className="bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
              <CardBody className="space-y-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                    Comptes de démonstration
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Utilisez ces identifiants pour explorer l'application
                  </p>
                </div>

                <div className="space-y-3">
                  {demoUsers.map((user, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg p-4 border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all duration-300 cursor-pointer hover-lift"
                      onClick={() => {
                        setLoginForm({ email: user.email, password: user.password });
                        setMode("login");
                      }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-semibold text-slate-900 text-sm">{user.role}</p>
                        <Badge variant="primary">{user.role}</Badge>
                      </div>
                      <p className="text-xs font-mono text-slate-600 break-all mb-1">{user.email}</p>
                      <p className="text-xs text-slate-500">Mot de passe: {user.password}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Astuce :</strong> Cliquez sur un compte pour le pré-remplir dans le formulaire.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
