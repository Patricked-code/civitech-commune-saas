'use client';

import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle, Lock, Building2, Users, BarChart3, Zap, Shield, Smartphone } from 'lucide-react';
import { FuturisticNav } from './components/FuturisticNav';

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: 'Démarches en ligne',
      description: 'Effectuez toutes vos démarches administratives en ligne, 24h/24 et 7j/7.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: CheckCircle,
      title: 'Suivi en temps réel',
      description: 'Suivez l\'avancement de vos demandes en temps réel avec notifications.',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Lock,
      title: 'Sécurisé & Confidentiel',
      description: 'Vos données protégées et traitées en toute confidentialité.',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const steps = [
    {
      number: 1,
      icon: Users,
      title: 'Créer un compte',
      description: 'Inscrivez-vous en quelques minutes avec votre email.',
    },
    {
      number: 2,
      icon: FileText,
      title: 'Remplir le formulaire',
      description: 'Complétez votre demande en ligne en toute simplicité.',
    },
    {
      number: 3,
      icon: ArrowRight,
      title: 'Soumettre',
      description: 'Envoyez votre demande en toute sécurité.',
    },
    {
      number: 4,
      icon: BarChart3,
      title: 'Suivre votre dossier',
      description: 'Suivez l\'avancement en temps réel.',
    },
  ];

  const procedures = [
    { title: 'Déclaration de naissance', href: '/commune/demarches/declaration-naissance', icon: '👶' },
    { title: 'Demande de copie d\'acte', href: '/commune/demarches/demande-copie-acte', icon: '📄' },
    { title: 'Déclaration de décès', href: '/commune/demarches/declaration-deces', icon: '📋' },
    { title: 'Organisation de mariage', href: '/commune/demarches/organisation-mariage', icon: '💍' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <FuturisticNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <div className="inline-block mb-4 px-4 py-2 rounded-full bg-white/10 border border-cyan-400/30 backdrop-blur-sm">
                  <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    🚀 Plateforme Numérique Nouvelle Génération
                  </span>
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                    CiviTech Commune
                  </span>
                </h1>
                <p className="text-2xl font-semibold text-gray-300 mb-4">
                  Simplifiez vos démarches administratives
                </p>
              </div>

              <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                LA plateforme tout-en-un pour effectuer vos démarches en ligne simplement, suivre vos demandes en temps réel et échanger avec votre commune en toute sécurité.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/commune/demarches" className="group relative px-8 py-3 font-semibold overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600 group-hover:scale-110 transition duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    Commencer <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </span>
                </Link>
                <Link href="/commune" className="group relative px-8 py-3 font-semibold border-2 border-violet-400/50 rounded-lg hover:border-violet-400 transition duration-300">
                  En savoir plus
                </Link>
              </div>
            </div>

            {/* Right - Glassmorphism Card */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-glass">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-cyan-400" />
                    <span className="font-semibold">Bienvenue sur CiviTech</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 opacity-50"></div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-gray-400">Mes démarches en cours</p>
                    <p className="text-3xl font-bold text-cyan-400">3</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-xs text-gray-400">En attente</p>
                      <p className="text-2xl font-bold text-violet-400">1</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-xs text-gray-400">Terminées</p>
                      <p className="text-2xl font-bold text-pink-400">2</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400 mb-3">Demandes récentes</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      <span>Certificat de résidence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                      <span>Inscription scolaire</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                      <span>Acte de naissance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Pourquoi CiviTech ?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Une plateforme conçue pour simplifier la vie des citoyens et optimiser les services municipaux
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/30 transition duration-300 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition duration-300`}></div>
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition duration-300`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Votre parcours citoyen en 4 étapes</h2>
            <p className="text-gray-400">Simple, rapide et sécurisé</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative group">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-[calc(100%+24px)] h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-transparent opacity-30 -z-10"></div>
                  )}

                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 transition duration-300 group-hover:bg-white/10">
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="pt-6">
                      <Icon className="w-8 h-8 text-cyan-400 mb-4" />
                      <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Procedures Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Démarches prioritaires</h2>
          <p className="text-gray-400 mb-12 max-w-2xl">
            Les premiers parcours se concentrent sur l\'état civil pour construire une base fiable
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {procedures.map((proc) => (
              <Link key={proc.href} href={proc.href}>
                <div className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-white/10 transition duration-300 cursor-pointer h-full">
                  <div className="text-3xl mb-3">{proc.icon}</div>
                  <p className="font-bold group-hover:text-cyan-400 transition duration-300">{proc.title}</p>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/commune/espace-citoyen" className="group relative inline-flex items-center gap-2 px-8 py-3 font-semibold bg-gradient-to-r from-cyan-500 to-violet-600 rounded-lg hover:shadow-neon-cyan transition duration-300">
            Ouvrir mon espace citoyen <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative backdrop-blur-xl bg-gradient-to-r from-cyan-500/10 to-violet-600/10 border border-white/10 rounded-2xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600 opacity-0 hover:opacity-5 transition duration-300"></div>
            <div className="relative">
              <h2 className="text-4xl font-bold mb-4">Prêt à commencer ?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Créez votre compte citoyen et accédez à tous les services municipaux en quelques clics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/login" className="group relative px-8 py-3 font-semibold bg-white text-slate-900 rounded-lg hover:shadow-lg transition duration-300">
                  Se connecter
                </Link>
                <Link href="/commune/demarches" className="group relative px-8 py-3 font-semibold border-2 border-white rounded-lg hover:bg-white/10 transition duration-300">
                  Consulter les démarches
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-6 h-6 text-cyan-400" />
                <span className="font-bold text-lg">CiviTech</span>
              </div>
              <p className="text-sm text-gray-400">
                La plateforme numérique au service des citoyens et des communes.
              </p>
            </div>

            {[
              {
                title: 'Plateforme',
                links: ['Fonctionnalités', 'Tarifs', 'Sécurité'],
              },
              {
                title: 'Citoyens',
                links: ['Démarches', 'FAQ', 'Support'],
              },
              {
                title: 'Communes',
                links: ['Solutions', 'Ressources', 'Contact'],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2024 CiviTech Commune – Tous droits réservés</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-cyan-400 transition">Mentions légales</a>
              <a href="#" className="hover:text-cyan-400 transition">Confidentialité</a>
              <a href="#" className="hover:text-cyan-400 transition">CGU</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
