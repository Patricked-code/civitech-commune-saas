import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Zap, BarChart3 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { Badge } from "../components/ui/Badge";
import { siteConfig } from "../lib/site";

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Démarches en ligne",
    description: "Déposez une demande, reprenez un brouillon et suivez l'avancement depuis votre espace citoyen.",
    color: "primary",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Services municipaux",
    description: "Structurez l'accueil, l'état civil, les documents utiles et les circuits de traitement.",
    color: "secondary",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Cockpit mairie",
    description: "Donnez aux agents une vision claire des dossiers, priorités, documents et actions à mener.",
    color: "accent",
  },
];

const steps = [
  "Créer un compte citoyen",
  "Choisir une démarche",
  "Enregistrer ou soumettre le dossier",
  "Suivre le traitement en ligne",
];

const procedures = [
  { href: "/commune/demarches/declaration-naissance", label: "Déclaration de naissance" },
  { href: "/commune/demarches/demande-copie-acte", label: "Demande de copie d'acte" },
  { href: "/commune/demarches/declaration-deces", label: "Déclaration de décès" },
  { href: "/commune/demarches/organisation-mariage", label: "Organisation de mariage" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
      {/* Hero Section */}
      <PageHeader
        badge="Bienvenue sur le portail"
        title="Une mairie plus accessible"
        subtitle="Des démarches plus simples, un suivi plus clair"
        description="Le portail numérique de Niakara rassemble les informations publiques, les démarches citoyennes, le suivi des dossiers et les outils de pilotage des services municipaux dans une expérience moderne et progressive."
        backgroundGradient="from-primary-600 via-primary-700 to-secondary-600"
        actions={
          <>
            <Button variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-slate-100">
              Démarrer une démarche
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Découvrir le portail
            </Button>
          </>
        }
      />

      {/* Features Section */}
      <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
            Nos services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Découvrez comment notre plateforme simplifie vos interactions avec la mairie
          </p>
        </div>

        <div className="grid-auto">
          {features.map((feature, index) => (
            <Card key={index} className="hover-lift" elevated>
              <CardBody>
                <div className={`inline-flex p-3 rounded-lg mb-4 bg-${feature.color}-50 text-${feature.color}-600`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Citizen Journey Section */}
      <section className="section bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-6">
                Parcours citoyen simplifié
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Suivez ces étapes simples pour accéder à tous les services municipaux en ligne.
              </p>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4 items-start animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl blur-3xl" />
              <Card elevated className="relative">
                <CardBody className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">Démarche {i}</p>
                        <p className="text-sm text-slate-500">En cours de traitement</p>
                      </div>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Procedures Section */}
      <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
            Démarches prioritaires
          </h2>
          <p className="text-slate-600">
            Accédez rapidement aux démarches les plus demandées
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {procedures.map((proc, index) => (
            <Link key={index} href={proc.href}>
              <Card interactive className="h-full hover-lift">
                <CardBody className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{proc.label}</span>
                  <ArrowRight className="w-5 h-5 text-primary-600" />
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Créez votre compte citoyen ou connectez-vous pour accéder à tous les services municipaux.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-slate-100">
              Créer un compte
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Se connecter
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
