'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Users,
  BarChart3,
  FileText,
  Clock,
  Lock,
  Smartphone,
  Globe,
  Gauge,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function FeaturesPage() {
  const features = [
    {
      category: '🎨 Interface & Design',
      items: [
        { name: 'Design Ultra-Premium', desc: 'Interface moderne et élégante avec animations fluides', icon: Zap },
        { name: 'Responsive Design', desc: 'Fonctionne parfaitement sur tous les appareils', icon: Smartphone },
        { name: 'Mode Sombre', desc: 'Support du mode sombre pour réduire la fatigue oculaire', icon: Lock },
        { name: 'Accessibilité WCAG', desc: 'Conforme aux normes d\'accessibilité web', icon: Users },
      ]
    },
    {
      category: '⚡ Performance',
      items: [
        { name: 'API Ultra-Rapide', desc: 'Temps de réponse < 100ms en moyenne', icon: Gauge },
        { name: 'Compression Gzip', desc: 'Réduction de 45% de la taille des fichiers', icon: Zap },
        { name: 'Caching Intelligent', desc: 'Mise en cache des données fréquemment accédées', icon: Clock },
        { name: 'Clustering Node.js', desc: 'Utilisation optimale des ressources serveur', icon: BarChart3 },
      ]
    },
    {
      category: '🛡️ Sécurité',
      items: [
        { name: 'Authentification JWT', desc: 'Tokens sécurisés avec expiration configurable', icon: Shield },
        { name: 'Validation Zod', desc: 'Validation stricte de toutes les entrées utilisateur', icon: CheckCircle2 },
        { name: 'Protection RGPD', desc: 'Conformité complète avec la réglementation RGPD', icon: Lock },
        { name: 'Rate Limiting', desc: 'Protection contre les attaques brute-force et DoS', icon: Shield },
      ]
    },
    {
      category: '📊 Analytics & Reporting',
      items: [
        { name: 'Tableaux de Bord', desc: 'Dashboards interactifs avec Recharts', icon: BarChart3 },
        { name: 'Rapports Détaillés', desc: 'Génération de rapports PDF et Excel', icon: FileText },
        { name: 'Statistiques Temps Réel', desc: 'Données actualisées en continu', icon: Gauge },
        { name: 'Export de Données', desc: 'Export facile en plusieurs formats', icon: Globe },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-100/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent-100/40 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="info" className="mb-6 px-4 py-1.5 text-sm font-semibold tracking-wide uppercase">
                Fonctionnalités Complètes
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight mb-8"
              {...fadeInUp}
            >
              Tout ce dont vous avez <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500">besoin</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Une suite complète de fonctionnalités pour gérer votre commune de manière efficace et moderne.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {features.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-24">
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-12">{section.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {section.items.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <Card className="p-8 h-full hover:border-brand-300 transition-all group">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                            <Icon size={24} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.name}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
              Comparaison v1.0 vs v2.0
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Voir les améliorations majeures apportées.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-6 font-bold text-slate-900">Fonctionnalité</th>
                  <th className="text-center py-4 px-6 font-bold text-slate-900">v1.0</th>
                  <th className="text-center py-4 px-6 font-bold text-slate-900">v2.0</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Design Moderne', v1: false, v2: true },
                  { feature: 'Animations Fluides', v1: false, v2: true },
                  { feature: 'Performance Optimale', v1: false, v2: true },
                  { feature: 'Sécurité Renforcée', v1: false, v2: true },
                  { feature: 'Validation Stricte', v1: false, v2: true },
                  { feature: 'Logging Structuré', v1: false, v2: true },
                  { feature: 'Tableaux de Bord', v1: false, v2: true },
                  { feature: 'Composants Réutilisables', v1: false, v2: true },
                  { feature: 'Responsive Design', v1: true, v2: true },
                  { feature: 'Multi-Tenant', v1: true, v2: true },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-white transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {row.v1 ? (
                        <CheckCircle2 size={20} className="text-green-600 mx-auto" />
                      ) : (
                        <div className="w-5 h-5 rounded border-2 border-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <CheckCircle2 size={20} className="text-green-600 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
              🔗 Intégrations & Extensions
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Extensible et compatible avec vos outils existants.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'PostgreSQL', desc: 'Base de données robuste et scalable' },
              { name: 'Prisma ORM', desc: 'Gestion simplifiée de la base de données' },
              { name: 'JWT Authentication', desc: 'Authentification sécurisée et stateless' },
              { name: 'Recharts', desc: 'Visualisations de données interactives' },
              { name: 'Framer Motion', desc: 'Animations et transitions fluides' },
              { name: 'React Hook Form', desc: 'Gestion avancée des formulaires' },
            ].map((integration, i) => (
              <Card key={i} className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{integration.name}</h3>
                <p className="text-slate-600 text-sm">{integration.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6">Prêt à démarrer ?</h2>
          <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">Explorez toutes les fonctionnalités de Civitech Commune v2.0 dès maintenant.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button variant="secondary" size="lg" className="rounded-full px-10 py-4 text-lg font-bold">
                Voir la Démo
              </Button>
            </Link>
            <Link href="/release">
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 rounded-full px-10 py-4 text-lg flex items-center gap-2">
                Retour aux Nouveautés <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
              <span className="font-display font-bold text-white text-lg tracking-tight">Civitech Commune</span>
            </div>
            <div className="flex gap-8 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <Link href="/release" className="hover:text-white transition-colors">Nouveautés</Link>
              <Link href="#" className="hover:text-white transition-colors">Support</Link>
            </div>
            <div className="text-sm">
              © 2026 Civitech SaaS. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
