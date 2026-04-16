const appConfig = {
  appName: 'civitech-commune-api',
  apiVersion: 'v1',
  defaultCountry: 'CI',
  defaultCurrency: 'XOF',
  tenantMode: 'single-seed',
  seedTenant: {
    slug: 'niakaramadougou',
    name: 'Niakaramadougou',
    country: 'Cote d Ivoire',
    timezone: 'Africa/Abidjan',
  },
};

module.exports = { appConfig };
