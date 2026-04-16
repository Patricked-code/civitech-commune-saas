const { tenant, modules } = require('../data/seedData');

function getTenantProfile() {
  return {
    ...tenant,
    modules,
    spaces: ['public', 'citoyen', 'admin'],
  };
}

module.exports = {
  getTenantProfile,
};
