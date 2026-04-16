# Civitech Commune SaaS

Plateforme SaaS de digitalisation communale orientee services publics locaux.

## Vision

Ce depot est dedie a un projet autonome, distinct des autres applications existantes.
Le socle couvre :
- portail public communal ;
- espace citoyen ;
- cockpit administrateur ;
- catalogue des demarches ;
- API backend dediee ;
- base de travail pour un futur modele multi-communes.

## Structure

- `apps/web` : frontend Next.js
- `apps/api` : backend Express

## Demarrage local

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

### Backend

```bash
cd apps/api
npm install
npm run dev
```

## Routes initiales

### Frontend
- `/`
- `/commune`
- `/commune/espace-citoyen`
- `/commune/admin`
- `/commune/demarches`

### API
- `GET /health`
- `GET /api/commune/health`
- `GET /api/commune/portal-config`
- `GET /api/commune/demarches`
- `GET /api/commune/statistiques`
- `GET /api/commune/dossiers-demo`

## Prochaines etapes

- authentification citoyen / agent / admin ;
- base de donnees multi-tenant ;
- gestion des demandes ;
- pieces jointes ;
- workflow configurable ;
- GED ;
- paiements ;
- deploiement VPS IONOS.
