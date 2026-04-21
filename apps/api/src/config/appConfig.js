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

const appConfig = {
  appName: 'civitech-commune-api',
  apiVersion: 'v1',
  defaultCountry: 'CI',
  defaultCurrency: 'XOF',
  tenantMode: 'single-seed',
  canonicalWebOrigin: normalizeOrigin(process.env.PUBLIC_APP_URL) || 'https://www.niakara.com',
  alternateWebOrigin: normalizeOrigin(process.env.PUBLIC_APP_URL_WWW) || 'https://niakara.com',
  corsAllowedOrigins: Array.from(new Set([
    ...parseOrigins(process.env.CORS_ORIGIN),
    normalizeOrigin(process.env.PUBLIC_APP_URL),
    normalizeOrigin(process.env.PUBLIC_APP_URL_WWW),
  ].filter(Boolean))),
  seedTenant: {
    slug: process.env.SEED_TENANT_SLUG || 'niakaramadougou',
    name: 'Niakaramadougou',
    country: 'Cote d Ivoire',
    timezone: 'Africa/Abidjan',
  },
};

module.exports = { appConfig, normalizeOrigin, parseOrigins };
