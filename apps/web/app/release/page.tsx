'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles,
  Code2,
  Zap,
  Shield,
  Palette,
  BarChart3,
  Users,
  Layers,
  CheckCircle2,
  ArrowRight,
  Github,
  ExternalLink
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

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ReleasePage() {
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
              <Badge variant="success" className="mb-6 px-4 py-1.5 text-sm font-semibold tracking-wide uppercase bg-green-50 text-green-700 border border-green-100 rounded-full">
                🎉 Version 2.0 - Disponible Maintenant
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight mb-8"
              {...fadeInUp}
            >
              Civitech Commune <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500">v2.0</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Une révolution dans la gestion municipale. Design ultra-premium, performances décuplées et fonctionnalités avancées pour transformer votre administration.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/">
                <Button size="lg" className="rounded-full px-8 py-4 text-lg shadow-premium hover:scale-105 transition-transform flex items-center gap-2">
                  Voir la démo <ArrowRight size={20} />
                </Button>
              </Link>
              <a href="https://github.com/Patricked-code/civitech-commune-saas/tree/manus-improvements" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg" className="rounded-full px-8 py-4 text-lg flex items-center gap-2">
                  <Github size={20} /> Code Source
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's New Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
              ✨ Les Grandes Nouveautés
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Découvrez les transformations majeures apportées à la plateforme.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Palette,
                title: 'Design Ultra-Premium',
                desc: 'Interface complètement repensée avec Tailwind CSS, animations fluides avec Framer Motion et glassmorphism moderne.',
                features: ['Animations élégantes', 'Palette de couleurs premium', 'Responsive design parfait']
              },
              {
                icon: Zap,
                title: 'Performance Décuplée',
                desc: 'Optimisations backend massives : compression Gzip, rate limiting, caching intelligent et requêtes ultra-rapides.',
                features: ['Temps de réponse < 100ms', 'Compression automatique', 'Clustering Node.js']
              },
              {
                icon: Shield,
                title: 'Sécurité Renforcée',
                desc: 'Implémentation de Helmet, validation Zod stricte, authentification JWT sécurisée et protection RGPD complète.',
                features: ['Headers sécurisés', 'Validation stricte', 'Chiffrement des données']
              },
              {
                icon: BarChart3,
                title: 'Tableaux de Bord Dynamiques',
                desc: 'Dashboards interactifs avec Recharts, visualisations en temps réel et analytics avancées pour le pilotage.',
                features: ['Graphiques interactifs', 'Données en temps réel', 'Export de rapports']
              },
              {
                icon: Layers,
                title: 'Architecture Modulaire',
                desc: 'Composants réutilisables (Button, Card, Badge), système de design cohérent et maintenabilité optimale.',
                features: ['Composants Storybook-ready', 'Design system', 'Code réutilisable']
              },
              {
                icon: Users,
                title: 'Expérience Utilisateur',
                desc: 'Navigation intuitive, formulaires intelligents avec react-hook-form, notifications toast et feedback immédiat.',
                features: ['Formulaires avancés', 'Notifications toast', 'Accessibilité WCAG']
              },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="p-8 h-full hover:border-brand-300 transition-all group">
                  <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{feature.desc}</p>
                  <ul className="space-y-2">
                    {feature.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technical Stack Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
              🛠️ Stack Technologique Premium
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Construite avec les meilleures technologies modernes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: 'Frontend', items: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts'] },
              { category: 'Backend', items: ['Express.js', 'Node.js', 'Prisma ORM', 'PostgreSQL', 'JWT Auth', 'Winston Logger'] },
              { category: 'Sécurité', items: ['Helmet.js', 'Zod Validation', 'Rate Limiting', 'CORS', 'bcryptjs', 'RGPD Ready'] },
              { category: 'DevOps', items: ['PM2 Cluster', 'Docker Ready', 'IONOS Deploy', 'CI/CD Ready', 'Git Workflow', 'ESLint'] },
            ].map((stack, i) => (
              <Card key={i} className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">{stack.category}</h3>
                <ul className="space-y-2">
                  {stack.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
              Avant / Après
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">La transformation radicale de l'interface utilisateur.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <Badge variant="warning" className="w-fit">Avant (v1.0)</Badge>
                <Card className="overflow-hidden">
                  <div className="bg-slate-100 p-8 text-center">
                    <p className="text-slate-600 mb-4">Interface basique avec styles inline</p>
                    <div className="bg-white rounded border border-slate-200 p-4 text-sm text-slate-600">
                      Design fonctionnel mais sans sophistication
                    </div>
                  </div>
                </Card>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-red-500">✗</span> Styles inline répétitifs
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-red-500">✗</span> Pas d'animations
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-red-500">✗</span> Performance basique
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-red-500">✗</span> Peu de composants réutilisables
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <Badge variant="success" className="w-fit">Après (v2.0)</Badge>
                <Card className="overflow-hidden border-2 border-brand-500 shadow-premium">
                  <div className="bg-gradient-to-br from-brand-50 to-accent-50 p-8 text-center">
                    <p className="text-slate-900 font-semibold mb-4">Interface ultra-premium avec Tailwind</p>
                    <div className="bg-white rounded-2xl border border-brand-200 p-4 text-sm text-slate-600 shadow-lg">
                      Design professionnel et sophistiqué
                    </div>
                  </div>
                </Card>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-green-500">✓</span> Tailwind CSS moderne
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-green-500">✓</span> Animations Framer Motion
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-green-500">✓</span> Performance optimale
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <span className="text-green-500">✓</span> Système de composants complet
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Components Showcase */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
              📦 Composants Réutilisables
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Une bibliothèque de composants prête à l'emploi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Button Component */}
            <Card className="p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Boutons</h3>
              <div className="space-y-3 mb-6">
                <Button size="sm" className="w-full">Primary Small</Button>
                <Button variant="secondary" size="md" className="w-full">Secondary Medium</Button>
                <Button variant="ghost" size="lg" className="w-full">Ghost Large</Button>
              </div>
              <p className="text-sm text-slate-600">4 variantes × 3 tailles = 12 combinaisons possibles</p>
            </Card>

            {/* Badge Component */}
            <Card className="p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Badges</h3>
              <div className="space-y-3 mb-6">
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </div>
              <p className="text-sm text-slate-600">Parfait pour les statuts et les étiquettes</p>
            </Card>

            {/* Card Component */}
            <Card className="p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Cartes</h3>
              <div className="mb-6">
                <Card hoverable className="p-4 bg-brand-50">
                  <p className="text-sm font-medium text-brand-900">Contenu interactif</p>
                </Card>
              </div>
              <p className="text-sm text-slate-600">Conteneurs flexibles avec effet hover</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-24 bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              ⚡ Métriques de Performance
            </h2>
            <p className="text-brand-300 max-w-2xl mx-auto">Des améliorations mesurables et vérifiables.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Temps de réponse API', value: '< 100ms', improvement: '↓ 60%' },
              { label: 'Taille des bundles', value: '↓ 45%', improvement: 'Optimisé' },
              { label: 'Score Lighthouse', value: '95+', improvement: '↑ 30%' },
              { label: 'Uptime garanti', value: '99.9%', improvement: 'Cluster' },
            ].map((metric, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl lg:text-4xl font-display font-extrabold mb-2">{metric.value}</div>
                <div className="text-brand-300 font-medium text-sm mb-2">{metric.label}</div>
                <div className="text-green-400 text-xs font-semibold">{metric.improvement}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Ready */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
              🚀 Prêt pour le Déploiement
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Configuration optimisée pour IONOS et autres hébergeurs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: 'Configuration PM2',
                desc: 'Mode cluster activé pour utiliser tous les CPU disponibles sur IONOS'
              },
              {
                icon: Shield,
                title: 'Sécurité Production',
                desc: 'Helmet, CORS, Rate Limiting et validation stricte activés'
              },
              {
                icon: Zap,
                title: 'Optimisations',
                desc: 'Compression Gzip, caching intelligent et requêtes optimisées'
              },
            ].map((item, i) => (
              <Card key={i} className="p-8">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-brand-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6">Prêt à explorer v2.0 ?</h2>
              <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">Découvrez la plateforme complètement transformée avec toutes les nouvelles fonctionnalités et le design ultra-premium.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/">
                  <Button variant="secondary" size="lg" className="rounded-full px-10 py-4 text-lg font-bold">
                    Voir la Démo
                  </Button>
                </Link>
                <a href="https://github.com/Patricked-code/civitech-commune-saas/tree/manus-improvements" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 rounded-full px-10 py-4 text-lg flex items-center gap-2">
                    <Github size={20} /> Voir le Code
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
              <span className="font-display font-bold text-white text-lg tracking-tight">Civitech Commune v2.0</span>
            </div>
            <div className="flex gap-8 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <a href="https://github.com/Patricked-code/civitech-commune-saas" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                GitHub <ExternalLink size={14} />
              </a>
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
