# Plan d'Amélioration - CiviTech Commune SaaS

Ce document détaille l'analyse de l'état actuel de l'application et définit la feuille de route pour la rendre opérationnelle et prête pour le déploiement final.

## 1. Analyse de l'état actuel

### Backend (Express + Prisma + PostgreSQL)
- **Points forts** : Structure modulaire, gestion des rôles (RBAC) en place, support multi-tenant, sécurité de base avec Helmet et CORS.
- **Lacunes** :
    - Validation des entrées insuffisante (pas de schéma Zod/Joi systématique).
    - Gestion d'erreurs fonctionnelle parfois rudimentaire.
    - Manque de tests automatisés.
    - Documentation API (Swagger/OpenAPI) absente.
    - Pas de support pour le stockage de fichiers réel (actuellement stubbed ou local).

### Frontend (Next.js App Router)
- **Points forts** : Utilisation de Next.js 14, structure claire, composants réutilisables.
- **Lacunes** :
    - **UI/UX** : Design très basique avec des styles inline ou CSS global minimaliste. Pas de bibliothèque de composants moderne (Tailwind CSS, Shadcn/UI).
    - **Authentification** : Gestion de session manuelle dans le localStorage, manque de robustesse.
    - **Expérience Utilisateur** : Feedback utilisateur limité (chargements, erreurs).
    - **Responsive** : Non optimisé pour mobile.

---

## 2. Objectifs d'amélioration

### Phase 3 : Backend (API & Sécurité)
1.  **Validation des données** : Intégrer `express-validator` ou `zod` pour valider toutes les requêtes entrantes.
2.  **Sécurité renforcée** :
    - Rate limiting pour prévenir les abus.
    - Validation stricte des types de fichiers pour les uploads.
3.  **Refactoring métier** :
    - Améliorer le `workflow.service` pour permettre des définitions plus flexibles.
    - Ajouter des logs d'audit plus détaillés.
4.  **Documentation** : Générer une documentation Swagger pour faciliter l'intégration et la maintenance.

### Phase 4 : Frontend (UI/UX & Fonctionnalités)
1.  **Refonte Graphique** :
    - Installer et configurer **Tailwind CSS**.
    - Utiliser des composants **Lucide React** pour l'iconographie.
    - Créer un dashboard moderne pour les citoyens et les agents.
2.  **Gestion d'État & Session** :
    - Sécuriser le stockage des tokens (Cookies HttpOnly si possible, ou abstraction plus propre).
    - Ajouter des "Skeletons" de chargement et des Toasts de notification.
3.  **Responsive Design** : Assurer une compatibilité parfaite sur smartphone (essentiel pour les citoyens).
4.  **Formulaires** : Utiliser `react-hook-form` pour une meilleure gestion des formulaires complexes de dossiers.

### Phase 5 : Déploiement & Ops
1.  **Dockerisation** : Créer des `Dockerfile` optimisés et un `docker-compose.yml` pour la production.
2.  **CI/CD** : Configurer des GitHub Actions pour le linting et les tests.
3.  **Monitoring** : Ajouter un endpoint de santé détaillé.

---

## 3. Calendrier d'exécution

| Phase | Description | Priorité |
| :--- | :--- | :--- |
| **Backend** | Validation, Sécurité, Refactoring Workflow | Haute |
| **Frontend UI** | Intégration Tailwind, Refonte Dashboard | Haute |
| **Frontend UX** | Formulaires, Notifications, Responsive | Moyenne |
| **Déploiement** | Docker, Variables d'env, Documentation finale | Haute |
