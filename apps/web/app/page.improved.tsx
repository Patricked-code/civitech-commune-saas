'use client';

import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowRight, FileText, Clock, CheckCircle } from 'lucide-react';

const siteConfig = {
  municipality: 'Niakara Madougou',
  description: 'Portail numérique municipal',
};

const citizenSteps = [
  'Consulter les démarches',
  'Créer un compte citoyen',
  'Soumettre un dossier',
  'Suivre la progression',
  'Recevoir les documents',
];

const highlights = [
  {
    icon: FileText,
    title: 'Démarches simplifiées',
    text: 'Accédez à toutes les démarches municipales en ligne, sans déplacement.',
  },
  {
    icon: Clock,
    title: 'Suivi en temps réel',
    text: 'Suivez l\'état d\'avancement de votre dossier à chaque étape.',
  },
  {
    icon: CheckCircle,
    title: 'Traitement rapide',
    text: 'Réduction des délais grâce à la numérisation des processus.',
  },
];

const priorityLinks = [
  { label: 'Déclaration de naissance', href: '/commune/demarches/declaration-naissance' },
  { label: 'Déclaration de décès', href: '/commune/demarches/declaration-deces' },
  { label: 'Demande de copie d\'acte', href: '/commune/demarches/demande-copie-acte' },
  { label: 'Organisation de mariage', href: '/commune/demarches/organisation-mariage' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 via-primary-700 to-primary-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <Badge variant="info" className="mb-6">
              {siteConfig.municipality} · Portail public et services municipaux
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Une mairie plus accessible, des démarches plus simples, un suivi plus clair
            </h1>

            <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl">
              Le portail numérique de {siteConfig.municipality} rassemble les informations publiques, les démarches citoyennes, le suivi des dossiers et les outils de pilotage des services municipaux dans une expérience moderne et progressive.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/commune/demarches">
                <Button variant="secondary" size="lg" className="flex items-center gap-2">
                  Démarrer une démarche <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/commune">
                <Button variant="ghost" size="lg" className="text-white hover:bg-primary-800">
                  Découvrir le portail
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" size="lg" className="text-white hover:bg-primary-800">
                  Connexion citoyenne
                </Button>
              </Link>
            </div>
          </div>

          {/* Citizen Steps Sidebar */}
          <aside className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-6">Parcours citoyen</h3>
            <div className="space-y-4">
              {citizenSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-primary-600 font-bold flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <span className="font-medium text-sm">{step}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} interactive className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Priority Procedures Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <Card className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Démarches prioritaires</h2>
              <p className="text-slate-600 text-lg max-w-2xl">
                Les premiers parcours se concentrent sur l'état civil afin de construire une base fiable avant l'extension vers d'autres services municipaux.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {priorityLinks.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className="border-2 border-primary-200 bg-primary-50 rounded-lg p-4 hover:border-primary-400 hover:bg-primary-100 transition-all duration-200 cursor-pointer">
                    <span className="text-primary-900 font-bold text-sm">{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <Link href="/commune/espace-citoyen">
                <Button variant="primary" size="lg">
                  Ouvrir mon espace citoyen <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Prêt à commencer ?</h2>
          <p className="text-slate-600 text-lg mb-8">
            Créez votre compte citoyen et accédez à tous les services municipaux en quelques clics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button variant="primary" size="lg">
                Se connecter
              </Button>
            </Link>
            <Link href="/commune/demarches">
              <Button variant="secondary" size="lg">
                Consulter les démarches
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
