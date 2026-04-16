const { findTenantBySlug } = require('../repositories/tenant.repository');
const { appConfig } = require('../config/appConfig');

async function getTenantProfile() {
  const tenant = await findTenantBySlug(appConfig.seedTenant.slug);
  if (!tenant) return null;

  return {
    ...tenant,
    spaces: ['public', 'citoyen', 'admin'],
  };
}

module.exports = {
  getTenantProfile,
};
