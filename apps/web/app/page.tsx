'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  FileCheck, 
  BarChart3, 
  Play
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-100 selection:text-brand-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
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
              <Badge variant="info" className="mb-6 px-4 py-1.5 text-sm font-semibold tracking-wide uppercase bg-brand-50 text-brand-700 border border-brand-100 rounded-full">
                Propulsé par Civitech SaaS v2.0
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight mb-8"
              {...fadeInUp}
            >
              Digitalisez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">Commune</span> avec élégance
            </motion.h1>

            <motion.p 
              className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Une plateforme SaaS tout-en-un pour moderniser les services municipaux, simplifier les démarches citoyennes et piloter votre mairie avec des données en temps réel.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/auth/login">
                <Button size="lg" className="rounded-full px-8 py-4 text-lg shadow-premium hover:scale-105 transition-transform flex items-center gap-2">
                  Démarrer maintenant <ArrowRight size={20} />
                </Button>
              </Link>
              <Button variant="ghost" size="lg" className="rounded-full px-8 py-4 text-lg flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                  <Play size={16} className="text-brand-600 fill-brand-600" />
                </div>
                Voir la démo
              </Button>
            </motion.div>
          </div>

          {/* Hero Image/Dashboard Preview */}
          <motion.div 
            className="mt-20 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-accent-500 rounded-[2.5rem] blur opacity-20" />
              <div className="relative bg-white border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">Une solution complète pour votre mairie</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Tout ce dont vous avez besoin pour transformer votre administration en une organisation moderne et efficace.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: Shield, title: 'Sécurité Maximale', desc: 'Données chiffrées et conformité RGPD pour protéger les informations des citoyens.' },
              { icon: Zap, title: 'Performance Éclair', desc: 'Une interface ultra-rapide pour un traitement fluide des dossiers administratifs.' },
              { icon: Users, title: 'Multi-Tenant', desc: 'Gérez plusieurs communes ou départements sur une seule instance sécurisée.' },
              { icon: FileCheck, title: 'Workflows Intelligents', desc: 'Automatisez les étapes de validation pour réduire les délais de traitement.' },
              { icon: BarChart3, title: 'Analytique Avancée', desc: 'Visualisez les performances de vos services avec des tableaux de bord dynamiques.' },
              { icon: Globe, title: 'Accessibilité Totale', desc: 'Disponible 24/7 sur tous les supports pour vos citoyens.' },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="p-8 h-full hover:border-brand-300 transition-all group">
                  <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Communes Actives', value: '150+' },
              { label: 'Dossiers Traités', value: '1.2M' },
              { label: 'Temps Gagné', value: '45%' },
              { label: 'Satisfaction', value: '98%' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl lg:text-5xl font-display font-extrabold mb-2">{stat.value}</div>
                <div className="text-brand-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6">Prêt à transformer votre commune ?</h2>
              <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">Rejoignez les centaines de mairies qui font confiance à Civitech pour leur transition numérique.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="secondary" size="lg" className="rounded-full px-10 py-4 text-lg font-bold">
                  Demander un essai gratuit
                </Button>
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 rounded-full px-10 py-4 text-lg">
                  Contacter un expert
                </Button>
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
              <span className="font-display font-bold text-white text-lg tracking-tight">Civitech Commune</span>
            </div>
            <div className="flex gap-8 text-sm">
              <Link href="#" className="hover:text-white transition-colors">Confidentialité</Link>
              <Link href="#" className="hover:text-white transition-colors">Mentions Légales</Link>
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
