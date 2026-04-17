#!/usr/bin/env bash
set -euo pipefail

sudo apt-get update
sudo apt-get install -y nginx certbot python3-certbot-nginx git curl build-essential

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

sudo npm install -g pm2

echo "Server prerequisites installed."
echo "Next steps:"
echo "- clone the repository into /var/www/civitech-commune-saas"
echo "- copy env files"
echo "- install PostgreSQL if not already installed"
echo "- configure nginx template and enable the site"
