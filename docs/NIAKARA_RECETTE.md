# Recette Niakara / Civitech Commune SaaS

## 1. Controle frontend

Verifier les pages publiques :

- `/`
- `/commune`
- `/commune/presentation`
- `/commune/services`
- `/commune/actualites`
- `/commune/agenda`
- `/commune/documents`
- `/commune/contact`
- `/commune/faq`
- `/commune/demarches`
- `/commune/signalement`
- `/commune/transparence`
- `/commune/confidentialite`
- `/commune/mentions-legales`

Verifier les pages citoyennes :

- `/auth/login`
- `/commune/espace-citoyen`
- `/commune/profil`
- `/commune/notifications`
- `/commune/messages`

Verifier les pages backoffice :

- `/commune/admin-console`
- `/commune/admin-gestion`
- `/commune/admin-crud`
- `/commune/agent-dossiers`
- `/commune/agent-validation-documents`
- `/commune/dossiers-connectes`

## 2. Controle API

Verifier :

- `GET /health`
- `GET /api/system/info`
- `GET /api/commune/health`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/me`
- `GET /api/citizen/dashboard`
- `GET /api/dossiers`
- `POST /api/dossiers`
- `GET /api/agent/queue`
- `GET /api/agent/documents`

## 3. Parcours citoyen

Tester :

- creation de compte citoyen ;
- connexion ;
- ouverture de l espace citoyen ;
- creation d un brouillon ;
- reprise d un brouillon ;
- soumission d un dossier ;
- consultation du detail ;
- ajout d une piece jointe simulee.

## 4. Parcours mairie

Tester :

- connexion admin ;
- cockpit mairie ;
- liste usagers ;
- liste procedures ;
- file agent ;
- validation documentaire ;
- transition de workflow ;
- commentaire interne.

## 5. Controle securite avant ouverture publique

Verifier :

- secret JWT fort ;
- base de production distincte ;
- CORS limite aux domaines Niakara ;
- comptes de demonstration retires ou encadres ;
- HTTPS actif ;
- redirection canonique controlee ;
- logs PM2 exploitables.

## 6. Commandes de validation

```bash
npm install
npm --workspace apps/api run prisma:generate
npm --workspace apps/web run build
```
