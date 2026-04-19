#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="${1:-/tmp/civitech-diagnostics-$(date +%Y%m%d-%H%M%S)}"
APP_DIR="/var/www/civitech-commune-saas"
mkdir -p "$OUT_DIR"

echo "Collecting diagnostics into $OUT_DIR"

{
  echo "===== DATE ====="
  date
  echo
  echo "===== HOSTNAME ====="
  hostname
  echo
  echo "===== UPTIME ====="
  uptime
  echo
  echo "===== DISK ====="
  df -h
  echo
  echo "===== MEMORY ====="
  free -h
  echo
  echo "===== LISTENING PORTS ====="
  ss -lntp || true
} > "$OUT_DIR/system.txt"

{
  echo "===== PM2 LIST ====="
  pm2 list || true
  echo
  echo "===== PM2 API LOGS ====="
  pm2 logs civitech-api --lines 200 --nostream || true
  echo
  echo "===== PM2 WEB LOGS ====="
  pm2 logs civitech-web --lines 200 --nostream || true
} > "$OUT_DIR/pm2.txt"

{
  echo "===== NGINX STATUS ====="
  systemctl status nginx --no-pager || true
  echo
  echo "===== NGINX TEST ====="
  nginx -t || true
  echo
  echo "===== NGINX ERROR LOG ====="
  tail -n 200 /var/log/nginx/error.log || true
  echo
  echo "===== NGINX ACCESS LOG ====="
  tail -n 200 /var/log/nginx/access.log || true
} > "$OUT_DIR/nginx.txt"

{
  echo "===== POSTGRES STATUS ====="
  systemctl status postgresql --no-pager || true
  echo
  echo "===== API ENV KEYS ====="
  if [ -f "$APP_DIR/apps/api/.env" ]; then
    sed 's/=.*$/=***MASKED***/' "$APP_DIR/apps/api/.env"
  else
    echo "apps/api/.env not found"
  fi
  echo
  echo "===== WEB ENV KEYS ====="
  if [ -f "$APP_DIR/apps/web/.env.production" ]; then
    sed 's/=.*$/=***MASKED***/' "$APP_DIR/apps/web/.env.production"
  else
    echo "apps/web/.env.production not found"
  fi
} > "$OUT_DIR/env-masked.txt"

{
  echo "===== API PACKAGE ====="
  cat "$APP_DIR/apps/api/package.json" || true
  echo
  echo "===== WEB PACKAGE ====="
  cat "$APP_DIR/apps/web/package.json" || true
} > "$OUT_DIR/packages.txt"

{
  echo "===== PRISMA GENERATE ====="
  cd "$APP_DIR"
  npm --workspace apps/api run prisma:generate || true
  echo
  echo "===== PRISMA MIGRATE STATUS ====="
  npx --workspace apps/api prisma migrate status || true
} > "$OUT_DIR/prisma.txt"

{
  echo "===== CURL HEALTH ====="
  curl -i http://127.0.0.1:3005/health || true
  echo
  echo "===== CURL SYSTEM INFO ====="
  curl -i http://127.0.0.1:3005/api/system/info || true
  echo
  echo "===== CURL WEB LOCAL ====="
  curl -I http://127.0.0.1:3000 || true
} > "$OUT_DIR/http-checks.txt"

cat <<EOF > "$OUT_DIR/README.txt"
Share these files back for debugging:
- system.txt
- pm2.txt
- nginx.txt
- prisma.txt
- http-checks.txt
- env-masked.txt

Secrets are masked in env-masked.txt, but review before sharing.
EOF

echo "Done. Diagnostics available in $OUT_DIR"
