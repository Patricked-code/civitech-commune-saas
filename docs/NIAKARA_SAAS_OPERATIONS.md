# Niakara / Civitech Commune SaaS — exploitation et socle multi-communes

## Objectif

Ce document prepare l exploitation consolidee du portail communal Niakara et la reutilisation du socle pour d autres communes.

Le mode de travail reste repo-first : les evolutions sont stabilisees dans GitHub, puis une passe unique de mise a jour VPS IONOS sera realisee depuis `main`.

## Branche de reference

- Branche stable : `main`
- Les branches `batch-*` servent uniquement au travail temporaire.
- Le VPS devra suivre `origin/main` lors de la passe de deploiement consolidee.

## Origines publiques cible

- Web canonique : `https://www.niakara.com`
- Web alternatif : `https://niakara.com`
- API publique : `https://api.niakara.com`

La configuration doit conserver une origine canonique stable pour eviter les incoherences de session entre domaine nu et domaine `www`.

## Variables frontend principales

```env
NEXT_PUBLIC_APP_NAME="Civitech Commune SaaS"
NEXT_PUBLIC_MUNICIPALITY_NAME="Commune de Niakara"
NEXT_PUBLIC_MUNICIPALITY_SHORT_NAME="Niakara"
NEXT_PUBLIC_APP_URL="https://www.niakara.com"
NEXT_PUBLIC_ALT_APP_URL="https://niakara.com"
NEXT_PUBLIC_API_BASE_URL="https://api.niakara.com"
```

## Variables backend principales

```env
APP_ENV="production"
NODE_ENV="production"
PORT="3005"
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
JWT_SECRET="A_REPLACER_PAR_UN_SECRET_LONG_ET_UNIQUE"
JWT_EXPIRES_IN="8h"
CANONICAL_WEB_ORIGIN="https://www.niakara.com"
ALTERNATE_WEB_ORIGIN="https://niakara.com"
API_PUBLIC_ORIGIN="https://api.niakara.com"
CORS_ORIGIN="https://www.niakara.com,https://niakara.com"
TENANT_MODE="single-seed"
SEED_TENANT_SLUG="niakaramadougou"
SEED_TENANT_NAME="Niakaramadougou"
SEED_TENANT_COUNTRY="Cote d Ivoire"
SEED_TENANT_TIMEZONE="Africa/Abidjan"
```

## Regles de securite avant production

1. Ne jamais deployer avec `JWT_SECRET=change_me_in_production`.
2. Supprimer ou restreindre les comptes demo avant ouverture publique.
3. Garder les routes citoyennes protegees par session.
4. Garder les routes mairie reservees aux roles agent, commune admin ou super admin.
5. Ne jamais exposer de secret dans le frontend.
6. Controler les URLs autorisees dans CORS.
7. Verifier que `main` compile avant toute mise a jour VPS.

## Validation repo avant deploiement

Depuis la racine du depot :

```bash
npm install
npm run validate
```

Le script `validate` doit generer Prisma puis construire le frontend Next.js.

## Passe VPS consolidee future

La passe VPS ne doit pas etre faite a chaque mini-batch. Elle interviendra quand une version coherente aura ete fusionnee dans `main`.

Sequence cible indicative :

```bash
cd /chemin/du/projet/civitech-commune-saas
git fetch origin
git checkout main
git pull origin main
npm install
npm run validate
npm --workspace apps/api run prisma:generate
# migration/seed uniquement si necessaire et valide
pm2 restart ecosystem.config.js
```

## Extension SaaS multi-communes

Pour une autre commune, les elements a parametrer seront :

- tenant slug ;
- nom de commune ;
- pays ;
- timezone ;
- domaine web canonique ;
- domaine API ;
- branding frontend ;
- services municipaux ;
- procedures ;
- roles et utilisateurs initiaux.

## Prochaines evolutions recommandees

- Persister les notifications et messages en base.
- Remplacer l upload simule par un vrai stockage de fichiers.
- Ajouter audit logs visibles dans le cockpit mairie.
- Ajouter parametrage branding par tenant.
- Ajouter gestion des pages institutionnelles depuis un futur admin CMS.
- Ajouter tests automatises frontend/API.
