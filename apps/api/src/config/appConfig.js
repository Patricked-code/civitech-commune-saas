function normalizeOrigin(value) {
  if (!value) return null;
  return String(value).trim().replace(/\/$/, '');
}

function parseOrigins(rawValue) {
  if (!rawValue) return [];
  return String(rawValue)
    .split(',')
    .map((item) => normalizeOrigin(item))
    .filter(Boolean);
}

function uniqueOrigins(values) {
  return Array.from(new Set(values.map((item) => normalizeOrigin(item)).filter(Boolean)));
}

const isProduction = process.env.NODE_ENV === 'production' || process.env.APP_ENV === 'production';

const canonicalWebOrigin =
  normalizeOrigin(process.env.CANONICAL_WEB_ORIGIN) ||
  normalizeOrigin(process.env.PUBLIC_APP_URL) ||
  'https://www.niakara.com';

const alternateWebOrigin =
  normalizeOrigin(process.env.ALTERNATE_WEB_ORIGIN) ||
  normalizeOrigin(process.env.PUBLIC_APP_URL_WWW) ||
  'https://niakara.com';

const apiPublicOrigin =
  normalizeOrigin(process.env.API_PUBLIC_ORIGIN) ||
  normalizeOrigin(process.env.PUBLIC_API_URL) ||
  'https://api.niakara.com';

const corsAllowedOrigins = uniqueOrigins([
  canonicalWebOrigin,
  alternateWebOrigin,
  ...parseOrigins(process.env.CORS_ORIGIN),
]);

const appConfig = {
  appName: 'civitech-commune-api',
  apiVersion: 'v1',
  env: process.env.APP_ENV || process.env.NODE_ENV || 'development',
  isProduction,
  defaultCountry: 'CI',
  defaultCurrency: 'XOF',
  tenantMode: process.env.TENANT_MODE || 'single-seed',
  canonicalWebOrigin,
  alternateWebOrigin,
  apiPublicOrigin,
  corsAllowedOrigins,
  seedTenant: {
    slug: process.env.SEED_TENANT_SLUG || 'niakaramadougou',
    name: process.env.SEED_TENANT_NAME || 'Niakaramadougou',
    country: process.env.SEED_TENANT_COUNTRY || 'Cote d Ivoire',
    timezone: process.env.SEED_TENANT_TIMEZONE || 'Africa/Abidjan',
  },
};

function assertProductionConfig() {
  if (!appConfig.isProduction) return;

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'change_me_in_production') {
    throw new Error('JWT_SECRET must be configured with a strong production value');
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be configured in production');
  }
}

module.exports = { appConfig, normalizeOrigin, parseOrigins, uniqueOrigins, assertProductionConfig };
