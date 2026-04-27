# Environnement Niakara

Ce document complete les fichiers `.env.example` lorsque les modifications directes des exemples sont limitees par les controles du connecteur.

## Web

Variables attendues pour le frontend :

```bash
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.niakara.com
NEXT_PUBLIC_APP_NAME=Civitech Commune SaaS
NEXT_PUBLIC_APP_URL=https://www.niakara.com
NEXT_PUBLIC_ALT_APP_URL=https://niakara.com
NEXT_PUBLIC_MUNICIPALITY_NAME=Commune de Niakara
NEXT_PUBLIC_MUNICIPALITY_SHORT_NAME=Niakara
```

## API

Variables attendues pour le backend :

```bash
PORT=3005
APP_ENV=production
NODE_ENV=production
TENANT_MODE=single-seed
SEED_TENANT_SLUG=niakaramadougou
SEED_TENANT_NAME=Niakaramadougou
SEED_TENANT_COUNTRY=Cote d Ivoire
SEED_TENANT_TIMEZONE=Africa/Abidjan
CANONICAL_WEB_ORIGIN=https://www.niakara.com
ALTERNATE_WEB_ORIGIN=https://niakara.com
API_PUBLIC_ORIGIN=https://api.niakara.com
PUBLIC_API_URL=https://api.niakara.com
CORS_ORIGIN=https://www.niakara.com,https://niakara.com
```

## Variables sensibles

A definir uniquement sur le serveur ou dans l environnement de production :

```bash
DATABASE_URL=...
JWT_SECRET=...
JWT_EXPIRES_IN=8h
```

## Regles importantes

- `NEXT_PUBLIC_APP_URL` doit rester l origine canonique du frontend.
- `NEXT_PUBLIC_ALT_APP_URL` sert a documenter l origine alternative.
- `CANONICAL_WEB_ORIGIN` doit correspondre a `NEXT_PUBLIC_APP_URL`.
- `CORS_ORIGIN` doit contenir les origines web autorisees a appeler l API.
- `JWT_SECRET` ne doit jamais garder une valeur de demonstration en production.
