# Déploiement IONOS VPS — procédure complète

Ce guide vise une mise en ligne sérieuse sur un VPS Ubuntu/Debian avec Nginx, PM2 et PostgreSQL.

## 0. Hypothèses

- dépôt cloné dans `/var/www/civitech-commune-saas`
- frontend Next.js sur port `3000`
- backend Express sur port `3005`
- Nginx en reverse proxy
- PostgreSQL local sur le serveur

## 1. Connexion SSH

```bash
ssh root@IP_DU_SERVEUR
```

## 2. Préparation du serveur

```bash
apt-get update
apt-get install -y nginx certbot python3-certbot-nginx git curl build-essential
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
npm install -g pm2
node -v
npm -v
pm2 -v
nginx -v
```

## 3. Installer PostgreSQL

```bash
apt-get install -y postgresql postgresql-contrib
systemctl enable postgresql
systemctl start postgresql
systemctl status postgresql
```

## 4. Créer la base PostgreSQL

```bash
sudo -u postgres psql
```

Puis dans `psql` :

```sql
CREATE DATABASE civitech_commune;
CREATE USER civitech_user WITH ENCRYPTED PASSWORD 'CHANGE_THIS_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE civitech_commune TO civitech_user;
\q
```

## 5. Cloner le projet

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/Patricked-code/civitech-commune-saas.git
cd civitech-commune-saas
```

## 6. Créer les fichiers d'environnement

### API

```bash
cp apps/api/.env.production.example apps/api/.env
nano apps/api/.env
```

Valeurs à adapter :
- `DATABASE_URL`
- `JWT_SECRET`
- `CORS_ORIGIN`

### Web

```bash
cp apps/web/.env.production.example apps/web/.env.production
nano apps/web/.env.production
```

Valeur à adapter :
- `NEXT_PUBLIC_API_BASE_URL`

## 7. Installer les dépendances

```bash
npm install
npm --workspace apps/web install
npm --workspace apps/api install
```

## 8. Générer Prisma et appliquer les migrations

```bash
npm --workspace apps/api run prisma:generate
npx --workspace apps/api prisma migrate deploy
```

## 9. Seed si nécessaire

```bash
npm --workspace apps/api run prisma:seed
```

## 10. Builder le frontend

```bash
npm --workspace apps/web run build
```

## 11. Démarrer avec PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

Vérifier :

```bash
pm2 list
pm2 logs civitech-api --lines 100
pm2 logs civitech-web --lines 100
```

## 12. Configurer Nginx

```bash
cp deploy/nginx/civitech-commune.conf.template /etc/nginx/sites-available/civitech-commune.conf
nano /etc/nginx/sites-available/civitech-commune.conf
```

Remplacer les domaines exemple :
- `commune.example.ci`
- `api.commune.example.ci`

Activer :

```bash
ln -sf /etc/nginx/sites-available/civitech-commune.conf /etc/nginx/sites-enabled/civitech-commune.conf
nginx -t
systemctl reload nginx
systemctl status nginx
```

## 13. Ouvrir le firewall si actif

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

## 14. HTTPS avec Certbot

```bash
certbot --nginx -d commune.example.ci -d www.commune.example.ci
certbot --nginx -d api.commune.example.ci
systemctl status certbot.timer
```

## 15. Vérifications applicatives

```bash
curl http://127.0.0.1:3005/health
curl http://127.0.0.1:3005/api/system/info
curl -I http://127.0.0.1:3000
curl -I https://commune.example.ci
curl -I https://api.commune.example.ci/health
```

## 16. Mise à jour future

```bash
cd /var/www/civitech-commune-saas
bash deploy/scripts/deploy-ionos.sh
```

## 17. Commandes de diagnostic utiles

```bash
pm2 list
pm2 logs civitech-api --lines 200
pm2 logs civitech-web --lines 200
journalctl -u nginx -n 100 --no-pager
systemctl status postgresql
ss -lntp | grep -E '3000|3005|80|443'
```
