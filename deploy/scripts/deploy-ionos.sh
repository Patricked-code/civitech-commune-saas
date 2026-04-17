#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/civitech-commune-saas"
BRANCH="main"

if [ ! -d "$APP_DIR/.git" ]; then
  echo "Repository not found in $APP_DIR"
  exit 1
fi

cd "$APP_DIR"

echo "[1/8] Updating repository"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

echo "[2/8] Installing root dependencies"
npm install

echo "[3/8] Installing web dependencies"
npm --workspace apps/web install

echo "[4/8] Installing api dependencies"
npm --workspace apps/api install

echo "[5/8] Generating Prisma client"
npm --workspace apps/api run prisma:generate

echo "[6/8] Running Prisma migrations"
npx --workspace apps/api prisma migrate deploy

echo "[7/8] Building web"
npm --workspace apps/web run build

echo "[8/8] Restarting PM2"
pm2 startOrReload ecosystem.config.js --update-env
pm2 save

echo "Deployment finished successfully"
