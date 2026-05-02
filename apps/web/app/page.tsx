'use client';

import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle, Lock, Building2, Users, BarChart3 } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: 'Démarches en ligne',
      description: 'Effectuez toutes vos démarches administratives en ligne, 24h/24 et 7j/7, depuis chez vous.',
      color: 'text-blue-600',
    },
    {
      icon: CheckCircle,
      title: 'Suivi en temps réel',
      description: 'Suivez l\'avancement de vos demandes en temps réel et recevez des notifications à chaque étape.',
      color: 'text-teal-600',
    },
    {
      icon: Lock,
      title: 'Sécurisé et confidentiel',
      description: 'Vos données sont protégées et traitées en toute confidentialité conformément aux normes en vigueur.',
      color: 'text-amber-600',
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
      description: 'Suivez l\'avancement de votre dossier en temps réel.',
    },
  ];

  const procedures = [
    { title: 'Déclaration de naissance', href: '/commune/demarches/declaration-naissance' },
    { title: 'Demande de copie d\'acte', href: '/commune/demarches/demande-copie-acte' },
    { title: 'Déclaration de décès', href: '/commune/demarches/declaration-deces' },
    { title: 'Organisation de mariage', href: '/commune/demarches/organisation-mariage' },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CiviTech Commune</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Accueil</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Fonctionnalités</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Pour les citoyens</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Pour les communes</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Tarifs</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
            </div>
            <Link href="/auth/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Connexion
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
                CiviTech Commune
              </h1>
              <p className="text-2xl font-semibold mb-4 text-blue-100">
                Simplifiez vos démarches administratives
              </p>
              <p className="text-lg text-blue-50 mb-8 max-w-2xl leading-relaxed">
                LA plateforme tout-en-un pour effectuer vos démarches en ligne simplement, suivre vos demandes en temps réel et échanger avec votre commune en toute sécurité.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/commune/demarches" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition">
                  Commencer <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/commune" className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition">
                  En savoir plus <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right Sidebar - Citizen Preview */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl p-6 text-gray-900 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-sm">Bienvenue sur CiviTech</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-bold text-lg">3</p>
                    <p className="text-gray-600">Mes démarches en cours</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-lg">1</p>
                    <p className="text-gray-600">En attente</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-lg">2</p>
                    <p className="text-gray-600">Terminées</p>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <p className="text-xs text-gray-600">Demandes récentes</p>
                  <div className="text-xs space-y-2">
                    <p className="text-blue-600">• Demande de certificat de résidence</p>
                    <p className="text-amber-600">• Inscription scolaire</p>
                    <p className="text-teal-600">• Demande d\'acte de naissance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                  <div className={`w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 ${feature.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Votre parcours citoyen en 4 étapes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-1 bg-gradient-to-r from-blue-300 to-transparent"></div>
                  )}
                  
                  <div className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-4">
                      {step.number}
                    </div>
                    <Icon className="w-6 h-6 text-blue-600 mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Procedures Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Démarches prioritaires</h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            Les premiers parcours se concentrent sur l\'état civil afin de construire une base fiable avant l\'extension vers d\'autres services municipaux.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {procedures.map((proc) => (
              <Link key={proc.href} href={proc.href}>
                <div className="bg-white border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer">
                  <p className="font-bold text-gray-900">{proc.title}</p>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/commune/espace-citoyen" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Ouvrir mon espace citoyen <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Créez votre compte citoyen et accédez à tous les services municipaux en quelques clics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition">
              Se connecter
            </Link>
            <Link href="/commune/demarches" className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition">
              Consulter les démarches
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-white">CiviTech Commune</span>
              </div>
              <p className="text-sm text-gray-400">
                La plateforme numérique au service des citoyens et des communes.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Plateforme</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Tarifs</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Sécurité</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Accessibilité</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Pour les citoyens</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Démarches en ligne</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Questions fréquentes</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Aide et support</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Actualités</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Pour les communes</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Solutions</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Accompagnement</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Ressources</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Devenir partenaire</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">À propos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Qui sommes-nous ?</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Nos engagements</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Carrières</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>© 2024 CiviTech Commune – Tous droits réservés</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-blue-400 transition">Mentions légales</a>
                <a href="#" className="hover:text-blue-400 transition">Politique de confidentialité</a>
                <a href="#" className="hover:text-blue-400 transition">CGU</a>
                <a href="#" className="hover:text-blue-400 transition">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
