# Deployment foundation for IONOS VPS

## Target topology

Recommended first production topology:
- one VPS for app hosting;
- Nginx as reverse proxy;
- PM2 for process management;
- one frontend process on port 3000;
- one API process on port 3005;
- PostgreSQL as target database in a later phase.

## Directories

Suggested layout on the server:
- /var/www/civitech-commune-saas
- /var/www/civitech-commune-saas/apps/web
- /var/www/civitech-commune-saas/apps/api

## Initial deployment steps

### 1. Clone the repository
```bash
cd /var/www
git clone https://github.com/Patricked-code/civitech-commune-saas.git
cd civitech-commune-saas
```

### 2. Install dependencies
```bash
npm install
cd apps/web && npm install && cd ../..
cd apps/api && npm install && cd ../..
```

### 3. Run locally on the server
```bash
npm run dev:web
npm run dev:api
```

### 4. Production start with PM2
```bash
cd /var/www/civitech-commune-saas/apps/api
pm2 start server.js --name civitech-commune-api

cd /var/www/civitech-commune-saas/apps/web
pm2 start "npm run start" --name civitech-commune-web

pm2 save
```

## Nginx reverse proxy

### Frontend block example
```nginx
server {
    listen 80;
    server_name commune.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### API block example
```nginx
server {
    listen 80;
    server_name api.commune.example.com;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Next deployment milestones
- add environment files;
- add build scripts for the frontend;
- add PostgreSQL and migrations;
- add SSL with certbot;
- add CI CD on push to main;
- add backups and logs strategy.
