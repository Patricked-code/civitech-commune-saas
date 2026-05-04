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
import { MainNav as Navbar } from '../../components/MainNav';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

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
              <Badge variant="info" className="mb-6 px-4 py-1.5 text-sm font-semibold tracking-wide uppercase">
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
              <a href="https://github.com/Patricked-code/civitech-commune-saas" target="_blank" rel="noopener noreferrer">
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

      {/* CTA Section */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-400 via-transparent to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-display font-bold mb-6">Prêt à transformer votre commune ?</h2>
          <p className="text-xl text-brand-100 mb-10">Rejoignez la révolution numérique avec Civitech Commune v2.0.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/login">
              <Button size="lg" className="bg-white text-brand-900 hover:bg-brand-50 rounded-full px-10">
                Démarrer maintenant
              </Button>
            </Link>
            <Link href="/commune/contact">
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 rounded-full px-10">
                Contacter un expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
