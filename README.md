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

## Orientation Niakara

Le projet sert maintenant de socle pour le portail public et le cockpit communal de Niakara, avec une reutilisation SaaS possible pour d autres communes.

## Structure

- `apps/web` : frontend Next.js
- `apps/api` : backend Express
- `deploy/nginx` : modele de reverse proxy Nginx
- `deploy/scripts` : scripts de preparation et de deploiement IONOS
- `ecosystem.config.js` : configuration PM2

## Batch d evolution n°1

Ce batch stabilise le socle avant l enrichissement metier :
- configuration CORS a partir des variables d environnement ;
- ajout d un endpoint d inscription citoyenne ;
- persistence du token et d un snapshot utilisateur cote frontend ;
- page `/auth/login` transformee en page connexion + inscription ;
- navigation et pages d accueil orientees Niakara.

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

## Production / IONOS VPS

### 1. Prerequis serveur

```bash
bash deploy/scripts/setup-server.sh
```

### 2. Cloner le projet

```bash
sudo mkdir -p /var/www
cd /var/www
git clone https://github.com/Patricked-code/civitech-commune-saas.git
cd civitech-commune-saas
```

### 3. Variables d environnement

- copier `apps/web/.env.production.example` vers `apps/web/.env.production`
- copier `apps/api/.env.example` vers `apps/api/.env`
- ajuster les domaines, la base PostgreSQL et les secrets JWT

### 4. Installer et builder

```bash
npm install
npm --workspace apps/web install
npm --workspace apps/api install
npm --workspace apps/api run prisma:generate
npx --workspace apps/api prisma migrate deploy
npm --workspace apps/web run build
```

### 5. PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6. Nginx

- partir de `deploy/nginx/civitech-commune.conf.template`
- remplacer les domaines d exemple
- copier la config dans `/etc/nginx/sites-available/civitech-commune.conf`
- activer le site puis recharger Nginx

Exemple :

```bash
sudo ln -s /etc/nginx/sites-available/civitech-commune.conf /etc/nginx/sites-enabled/civitech-commune.conf
sudo nginx -t
sudo systemctl reload nginx
```

### 7. Script de deploiement

```bash
bash deploy/scripts/deploy-ionos.sh
```

## Checklist de recette avant mise en ligne

### Infrastructure
- Node.js installe
- PM2 installe
- Nginx installe
- PostgreSQL accessible
- variables d environnement configurees

### Backend
- `GET /health` repond 200
- `GET /api/system/info` repond 200
- Prisma client genere
- migrations appliquees
- seed execute si necessaire

### Frontend
- la home charge
- l espace citoyen charge
- la vue agent charge
- la vue validation documentaire charge

### Flux critiques
- login demo fonctionne
- creation d un brouillon fonctionne
- reprise d un brouillon fonctionne
- soumission d un dossier fonctionne
- passage a l etape suivante fonctionne
- ajout d un commentaire fonctionne
- ajout d une piece jointe simulee fonctionne
- validation documentaire fonctionne

### Securite / verification
- JWT secret remplace
- base PostgreSQL de production distincte de la base locale
- domaines Nginx remplaces
- HTTPS configure via Certbot
- PM2 redemarre correctement apres reboot

## Routes fonctionnelles majeures

### Frontend
- `/`
- `/commune`
- `/commune/espace-citoyen`
- `/commune/mes-brouillons`
- `/commune/mes-dossiers-soumis`
- `/commune/agent-dossiers`
- `/commune/agent-priorite-du-jour`
- `/commune/agent-validation-documents`
- `/commune/demarches`

### API
- `GET /health`
- `GET /api/commune/health`
- `GET /api/citizen/dashboard`
- `GET /api/agent/queue`
- `GET /api/agent/documents`
- `POST /api/uploads/prepare`
- `GET /api/dossiers`
- `POST /api/dossiers`

## Statut reel du projet

Le projet est maintenant suffisamment avance pour un deploiement de test ou de preproduction sur VPS IONOS.
Il reste recommande de finaliser ensuite :
- le vrai upload binaire vers un stockage cible ;
- les tests automatises ;
- le monitoring et la journalisation de production ;
- la revue finale des permissions et des secrets avant ouverture publique.
