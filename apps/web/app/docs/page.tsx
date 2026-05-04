'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code2,
  FileText,
  BookOpen,
  Terminal,
  Package,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

export default function DocsPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('installation');

  const sections = [
    {
      id: 'installation',
      title: '📦 Installation',
      icon: Package,
      content: `
# Installation

## Prérequis
- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

## Étapes

\`\`\`bash
# 1. Cloner le dépôt
git clone https://github.com/Patricked-code/civitech-commune-saas.git
cd civitech-commune-saas

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local

# 4. Initialiser la base de données
npm run prisma:migrate
npm run prisma:seed

# 5. Démarrer l'application
npm run dev:web
npm run dev:api
\`\`\`
      `
    },
    {
      id: 'architecture',
      title: '🏗️ Architecture',
      icon: Code2,
      content: `
# Architecture

## Structure du Projet

\`\`\`
civitech-commune-saas/
├── apps/
│   ├── web/              # Frontend Next.js
│   │   ├── app/         # Pages et routes
│   │   ├── components/  # Composants React
│   │   └── lib/         # Utilitaires
│   └── api/             # Backend Express
│       ├── src/
│       │   ├── routes/  # Routes API
│       │   ├── services/# Logique métier
│       │   └── middleware/
│       └── prisma/      # Schéma DB
└── docs/                # Documentation
\`\`\`

## Stack Technologique

### Frontend
- **Next.js 14** : Framework React moderne
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styles utilitaires
- **Framer Motion** : Animations
- **Recharts** : Visualisations

### Backend
- **Express.js** : Framework web
- **Prisma** : ORM moderne
- **PostgreSQL** : Base de données
- **JWT** : Authentification
- **Winston** : Logging
      `
    },
    {
      id: 'api',
      title: '🔌 API Reference',
      icon: Terminal,
      content: `
# API Reference

## Authentification

### Login
\`\`\`bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

### Register
\`\`\`bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "password123"
}
\`\`\`

## Dossiers

### Créer un dossier
\`\`\`bash
POST /api/dossiers
Authorization: Bearer {token}
Content-Type: application/json

{
  "procedureId": "proc_123",
  "citizenUserId": "user_456"
}
\`\`\`

### Récupérer les dossiers
\`\`\`bash
GET /api/dossiers
Authorization: Bearer {token}
\`\`\`
      `
    },
    {
      id: 'deployment',
      title: '🚀 Déploiement',
      icon: FileText,
      content: `
# Déploiement sur IONOS

## Configuration PM2

Le fichier \`ecosystem.config.js\` est configuré pour :
- Mode cluster avec tous les CPU
- Restart automatique en cas d'erreur
- Logs centralisés

## Étapes de Déploiement

1. **Cloner le dépôt sur le serveur**
\`\`\`bash
git clone https://github.com/Patricked-code/civitech-commune-saas.git
cd civitech-commune-saas
\`\`\`

2. **Installer les dépendances**
\`\`\`bash
npm install
npm run build:web
\`\`\`

3. **Configurer les variables d'environnement**
\`\`\`bash
cp .env.example .env.production
# Éditer .env.production avec vos valeurs
\`\`\`

4. **Démarrer avec PM2**
\`\`\`bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
\`\`\`

5. **Configurer Nginx (reverse proxy)**
\`\`\`nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }

    location /api {
        proxy_pass http://localhost:3005;
    }
}
\`\`\`
      `
    },
    {
      id: 'components',
      title: '🎨 Composants',
      icon: BookOpen,
      content: `
# Composants Réutilisables

## Button

\`\`\`tsx
import Button from '@/components/Button';

// Variantes
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Tailles
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// États
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
\`\`\`

## Card

\`\`\`tsx
import Card from '@/components/Card';

<Card hoverable className="p-6">
  <h3>Titre</h3>
  <p>Contenu</p>
</Card>
\`\`\`

## Badge

\`\`\`tsx
import Badge from '@/components/Badge';

<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
\`\`\`
      `
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
                Documentation Technique
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Guide Complet de Développement
            </motion.h1>

            <motion.p 
              className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Tout ce que vous devez savoir pour installer, configurer et déployer Civitech Commune v2.0.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {sections.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSection === section.id;

              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="overflow-hidden">
                    <button
                      onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                      className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center">
                          <Icon size={24} className="text-brand-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={24} className="text-slate-600" />
                      </motion.div>
                    </button>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-slate-200 bg-slate-50">
                        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap break-words">
                          {section.content}
                        </pre>
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
              Ressources Utiles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'GitHub Repository',
                desc: 'Accédez au code source complet',
                link: 'https://github.com/Patricked-code/civitech-commune-saas',
              },
              {
                title: 'Issues & Support',
                desc: 'Signalez les bugs et demandez du support',
                link: 'https://github.com/Patricked-code/civitech-commune-saas/issues',
              },
              {
                title: 'Page de Présentation',
                desc: 'Découvrez les nouvelles fonctionnalités',
                link: '/release',
              },
            ].map((resource, i) => (
              <a key={i} href={resource.link} target={resource.link.startsWith('http') ? '_blank' : undefined} rel={resource.link.startsWith('http') ? 'noopener noreferrer' : undefined}>
                <Card className="p-8 h-full hover:border-brand-300 transition-all cursor-pointer group">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">{resource.desc}</p>
                  <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm">
                    Accéder <ArrowRight size={16} />
                  </div>
                </Card>
              </a>
            ))}
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
              <Link href="/features" className="hover:text-white transition-colors">Fonctionnalités</Link>
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
