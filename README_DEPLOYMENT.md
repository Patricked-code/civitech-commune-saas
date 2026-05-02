# CiviTech Commune SaaS - Guide de Déploiement

## 📋 Vue d'ensemble

CiviTech Commune SaaS est une plateforme numérique complète pour les services municipaux, permettant aux citoyens de soumettre des démarches en ligne et aux agents de traiter les dossiers efficacement.

**Version**: 2.0.0 (Frontend Redesign)  
**Statut**: Prêt pour le déploiement en production

---

## 🎯 Améliorations Apportées (v2.0.0)

### Frontend - Design System Professionnel
- ✅ **Composants réutilisables** : Button, Card, Input, Modal, Alert, Badge, Dropdown, PageHeader, StatCard
- ✅ **Animations sophistiquées** : Fade-in, Slide-up/down/left/right, Bounce, Pulse, Shimmer
- ✅ **Polices Google** : Inter (texte) + Poppins (titres)
- ✅ **Palette de couleurs** : Primary (bleu), Secondary (teal), Accent (ambre)
- ✅ **Responsive design** : Mobile-first, adapté à tous les écrans

### Pages Refondues
- ✅ **Accueil** : Hero section avec features, parcours citoyen, CTA
- ✅ **Login/Inscription** : Design moderne avec comptes de démo interactifs
- ✅ **Dashboard Citoyen** : Tableau de bord avec statistiques et liste de dossiers
- ✅ **Profil** : Gestion des informations personnelles et sécurité
- ✅ **Notifications** : Système d'alertes avec filtrage et actions
- ✅ **Messages** : Interface de messagerie avec conversations
- ✅ **Documents** : Bibliothèque de documents avec recherche et filtres
- ✅ **Démarches** : Catalogue des procédures avec filtrage
- ✅ **404 & Loading** : Pages d'erreur et chargement professionnelles

### Backend - Sécurité & Documentation
- ✅ **Validation des entrées** : express-validator sur toutes les routes
- ✅ **Rate limiting** : Protection contre les abus avec express-rate-limit
- ✅ **Swagger UI** : Documentation interactive de l'API (`/api-docs`)
- ✅ **Configuration externalisée** : Workflows configurables

### Déploiement
- ✅ **Docker** : Dockerfiles pour API et frontend
- ✅ **Docker Compose** : Orchestration locale avec PostgreSQL
- ✅ **Variables d'environnement** : Fichier `.env` pour configuration
- ✅ **CI/CD** : Workflow GitHub Actions prêt

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+ (ou utiliser Docker)
- Git

### Installation Locale

```bash
# Cloner le dépôt
git clone https://github.com/Patricked-code/civitech-commune-saas.git
cd civitech-commune-saas

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# Lancer avec Docker Compose
docker-compose up -d

# Initialiser la base de données
npm run db:push

# Démarrer le développement
npm run dev
```

### URLs Locales
- **Frontend** : http://localhost:3000
- **API** : http://localhost:3001
- **Swagger** : http://localhost:3001/api-docs
- **PostgreSQL** : localhost:5432

---

## 📦 Déploiement en Production

### Option 1 : Docker (Recommandé)

```bash
# Build les images
docker-compose -f docker-compose.yml build

# Déployer
docker-compose -f docker-compose.yml up -d

# Vérifier les logs
docker-compose logs -f
```

### Option 2 : Heroku

```bash
# Installer Heroku CLI
npm install -g heroku

# Créer les apps
heroku create civitech-api
heroku create civitech-web

# Configurer les variables d'environnement
heroku config:set DATABASE_URL=... -a civitech-api
heroku config:set API_URL=https://civitech-api.herokuapp.com -a civitech-web

# Déployer
git push heroku main
```

### Option 3 : VPS (DigitalOcean, Linode, etc.)

```bash
# SSH sur le serveur
ssh root@your-server-ip

# Installer Node.js et PostgreSQL
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs postgresql postgresql-contrib

# Cloner le dépôt
git clone https://github.com/Patricked-code/civitech-commune-saas.git
cd civitech-commune-saas

# Installer les dépendances
npm install --production

# Configurer les variables d'environnement
nano .env

# Démarrer avec PM2
npm install -g pm2
pm2 start npm --name "civitech" -- run start
pm2 save
pm2 startup
```

---

## 🔧 Configuration

### Variables d'Environnement Essentielles

```env
# Base de données
DATABASE_URL=postgresql://user:password@localhost:5432/civitech

# API
API_PORT=3001
API_URL=http://localhost:3001
NODE_ENV=production

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=CiviTech Commune

# Authentification
JWT_SECRET=your-secret-key-here

# Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 📊 Architecture

```
civitech-commune-saas/
├── apps/
│   ├── api/                 # Backend Node.js/Express
│   │   ├── src/
│   │   │   ├── routes/      # Endpoints API
│   │   │   ├── services/    # Logique métier
│   │   │   ├── middleware/  # Validation, auth
│   │   │   └── config/      # Configuration
│   │   ├── prisma/          # ORM & migrations
│   │   └── server.js        # Point d'entrée
│   │
│   └── web/                 # Frontend Next.js
│       ├── app/             # Pages & layouts
│       ├── components/      # Composants réutilisables
│       │   └── ui/          # Design system
│       ├── lib/             # Utilitaires
│       └── public/          # Assets statiques
│
├── docker-compose.yml       # Orchestration locale
├── .env                     # Variables d'environnement
└── README.md                # Documentation
```

---

## 🧪 Tests

```bash
# Tests unitaires (API)
npm run test:api

# Tests d'intégration
npm run test:integration

# Tests e2e (Frontend)
npm run test:e2e

# Coverage
npm run test:coverage
```

---

## 🔐 Sécurité

### Checklist de Sécurité

- ✅ **HTTPS** : Utiliser HTTPS en production
- ✅ **CORS** : Configurer correctement les origines autorisées
- ✅ **JWT** : Utiliser des secrets forts et des durées d'expiration courtes
- ✅ **Rate Limiting** : Activer le rate limiting sur les endpoints sensibles
- ✅ **Validation** : Valider toutes les entrées utilisateur
- ✅ **SQL Injection** : Utiliser Prisma ORM (protection native)
- ✅ **XSS** : Next.js échappe automatiquement le contenu
- ✅ **CSRF** : Implémenter les tokens CSRF si nécessaire
- ✅ **Secrets** : Ne jamais commiter les fichiers `.env`

---

## 📈 Performance

### Optimisations Appliquées

- **Frontend** :
  - Code splitting automatique avec Next.js
  - Images optimisées avec `next/image`
  - CSS-in-JS minifié avec Tailwind
  - Animations GPU-accélérées

- **Backend** :
  - Caching des requêtes fréquentes
  - Pagination des listes
  - Indexes de base de données optimisés
  - Compression gzip activée

### Monitoring

```bash
# Logs en temps réel
docker-compose logs -f api
docker-compose logs -f web

# Métriques (avec New Relic, DataDog, etc.)
# À configurer selon votre provider
```

---

## 🐛 Dépannage

### Le frontend ne charge pas

```bash
# Vérifier que l'API est accessible
curl http://localhost:3001/api/health

# Vérifier les logs
docker-compose logs web
```

### Erreurs de base de données

```bash
# Réinitialiser la base de données
npm run db:reset

# Appliquer les migrations
npm run db:push
```

### Problèmes d'authentification

```bash
# Vérifier le JWT_SECRET dans .env
# Vérifier que le token est envoyé dans les headers
# Vérifier les logs de l'API
```

---

## 📚 Documentation Supplémentaire

- **API Swagger** : http://localhost:3001/api-docs
- **Next.js Docs** : https://nextjs.org/docs
- **Tailwind CSS** : https://tailwindcss.com/docs
- **Prisma ORM** : https://www.prisma.io/docs

---

## 🤝 Support

Pour toute question ou problème :
1. Consultez la documentation
2. Vérifiez les logs
3. Ouvrez une issue sur GitHub
4. Contactez l'équipe support

---

## 📝 Changelog

### v2.0.0 - Frontend Redesign
- Refonte complète du design system
- Animations sophistiquées
- Pages secondaires complètes
- Amélioration de la sécurité du backend
- Documentation de déploiement

### v1.0.0 - Initial Release
- Fonctionnalités de base
- Authentification
- Gestion des dossiers

---

## 📄 Licence

Propriétaire - Tous droits réservés

---

**Dernière mise à jour** : Mai 2024  
**Prêt pour la production** : ✅ OUI
