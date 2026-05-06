'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Users,
  FileText,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  ChevronDown,
  Star,
  Zap,
  Shield,
  Heart,
  Building2,
  Landmark,
  BookOpen,
  Briefcase,
  MoreVertical
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function ServiceCard({ icon: Icon, title, description, link }: any) {
  return (
    <motion.div variants={fadeInUp}>
      <Link href={link}>
        <Card className="p-8 h-full hover:shadow-lg hover:border-brand-300 transition-all cursor-pointer group">
          <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
            <Icon size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
          <p className="text-slate-600 leading-relaxed mb-4">{description}</p>
          <div className="flex items-center text-brand-600 font-bold group-hover:translate-x-2 transition-transform">
            Accéder <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

function NewsCard({ title, date, category, image }: any) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
        <div className="h-48 bg-gradient-to-br from-brand-400 to-accent-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-white/90 text-brand-600 text-xs font-bold rounded-full">
              {category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-500 mb-2">{date}</p>
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">{title}</h3>
          <p className="text-slate-600 text-sm mb-4">Découvrez les dernières actualités de votre commune...</p>
          <div className="flex items-center text-brand-600 font-bold text-sm">
            Lire plus <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function NiakaraHomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-accent-500 rounded-xl flex items-center justify-center">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">Commune de</p>
              <p className="text-lg font-black text-slate-900">Niakara</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Services</Link>
            <Link href="#actualites" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Actualités</Link>
            <Link href="#patrimoine" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Patrimoine</Link>
            <Link href="#contact" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline" size="sm">Connexion</Button>
            </Link>
            <Link href="/commune/demarches">
              <Button size="sm">Faire une démarche</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100/50 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight mb-6">
              Bienvenue à <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500">Niakara</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Découvrez votre commune, accédez aux services municipaux et participez à la vie locale. Un portail moderne pour une administration proche de ses citoyens.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/commune/demarches">
                <Button size="lg" className="rounded-full px-10">
                  Accéder aux Démarches <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#services">
                <Button variant="outline" size="lg" className="rounded-full px-10">
                  Découvrir les Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            {[
              { label: 'Habitants', value: '45,230', icon: Users },
              { label: 'Superficie', value: '128 km²', icon: MapPin },
              { label: 'Services', value: '24/7', icon: Zap },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="p-8 text-center">
                  <stat.icon className="w-8 h-8 text-brand-600 mx-auto mb-4" />
                  <p className="text-slate-600 text-sm font-bold uppercase tracking-wide mb-2">{stat.label}</p>
                  <p className="text-4xl font-bold text-slate-900">{stat.value}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4">
              Nos Services Municipaux
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Accédez facilement à tous les services de la commune de Niakara
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <ServiceCard
              icon={FileText}
              title="État Civil"
              description="Demandes d'actes de naissance, mariage, décès et autres documents officiels."
              link="/demarches-guide"
            />
            <ServiceCard
              icon={Building2}
              title="Urbanisme"
              description="Permis de construire, déclarations de travaux et consultations d'urbanisme."
              link="/demarches-guide"
            />
            <ServiceCard
              icon={Heart}
              title="Social"
              description="Aides sociales, allocations et services à la personne."
              link="/demarches-guide"
            />
            <ServiceCard
              icon={BookOpen}
              title="Éducation"
              description="Inscriptions scolaires, cantines et activités périscolaires."
              link="/demarches-guide"
            />
            <ServiceCard
              icon={Briefcase}
              title="Emploi"
              description="Offres d'emploi municipal et informations professionnelles."
              link="/demarches-guide"
            />
            <ServiceCard
              icon={Calendar}
              title="Événements"
              description="Calendrier des événements, fêtes et manifestations locales."
              link="/actualites"
            />
          </motion.div>
        </div>
      </section>

      {/* Actualités Section */}
      <section id="actualites" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4">
              Actualités de Niakara
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Restez informé des dernières nouvelles de votre commune
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <NewsCard
              title="Inauguration du nouveau parc municipal"
              date="15 Mai 2026"
              category="Événement"
            />
            <NewsCard
              title="Amélioration des routes : travaux en cours"
              date="12 Mai 2026"
              category="Infrastructure"
            />
            <NewsCard
              title="Nouvelle aide pour les familles monoparentales"
              date="10 Mai 2026"
              category="Social"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/actualites">
              <Button variant="outline" size="lg">
                Voir toutes les actualités
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Patrimoine Section */}
      <section id="patrimoine" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4">
              Patrimoine & Tourisme
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Découvrez la richesse culturelle et historique de Niakara
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                title: 'Église Historique de Niakara',
                description: 'Édifice datant du XVIIIe siècle, chef-d\'œuvre de l\'architecture coloniale.',
                icon: Landmark
              },
              {
                title: 'Musée Communal',
                description: 'Expositions permanentes et temporaires sur l\'histoire locale.',
                icon: BookOpen
              },
              {
                title: 'Marché Traditionnel',
                description: 'Cœur vibrant de la vie locale avec artisans et producteurs.',
                icon: Briefcase
              },
              {
                title: 'Réserve Naturelle',
                description: 'Espace protégé pour la biodiversité et les randonnées.',
                icon: Heart
              },
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="p-8 hover:shadow-lg transition-all">
                  <item.icon className="w-12 h-12 text-brand-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/patrimoine">
              <Button variant="outline" size="lg">
                Découvrir le patrimoine
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4">
              Nous Contacter
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Besoin d'aide ? Contactez-nous directement
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-8 text-center hover:shadow-lg transition-all">
                <MapPin className="w-12 h-12 text-brand-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Adresse</h3>
                <p className="text-slate-600">
                  Mairie de Niakara<br />
                  Place de la République<br />
                  Niakara, 00000
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8 text-center hover:shadow-lg transition-all">
                <Phone className="w-12 h-12 text-brand-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Téléphone</h3>
                <p className="text-slate-600">
                  +225 XX XX XX XX<br />
                  Lun-Ven : 08h-17h<br />
                  Sam : 09h-12h
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8 text-center hover:shadow-lg transition-all">
                <Mail className="w-12 h-12 text-brand-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Email</h3>
                <p className="text-slate-600">
                  contact@niakara.ci<br />
                  info@niakara.ci<br />
                  urgence@niakara.ci
                </p>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/contact">
              <Button size="lg">
                Nous Contacter
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Commune de Niakara</h3>
              <p className="text-slate-400 text-sm">Portail municipal moderne pour une administration proche de ses citoyens.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/demarches-guide" className="hover:text-white transition-colors">Démarches</Link></li>
                <li><Link href="/actualites" className="hover:text-white transition-colors">Agenda</Link></li>
                <li><Link href="/patrimoine" className="hover:text-white transition-colors">Patrimoine</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Mentions légales</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suivez-nous</h4>
              <p className="text-slate-400 text-sm">Restez connecté aux actualités de Niakara</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2026 Commune de Niakara. Tous droits réservés. Propulsé par Civitech Commune SaaS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
