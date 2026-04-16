const { getPrismaClient } = require('../db/prisma');

const seedRoles = [
  { code: 'citizen', label: 'Citizen', scope: 'tenant' },
  { code: 'agent', label: 'Agent', scope: 'tenant' },
  { code: 'service_manager', label: 'Service manager', scope: 'tenant' },
  { code: 'commune_admin', label: 'Commune admin', scope: 'tenant' },
];

async function listRoles(tenantId) {
  const prisma = getPrismaClient();
  if (!prisma) return seedRoles;
  return prisma.role.findMany({ where: tenantId ? { tenantId } : undefined, orderBy: { code: 'asc' } });
}

async function findRolesByCodes(tenantId, codes) {
  const prisma = getPrismaClient();
  if (!prisma) return seedRoles.filter((item) => codes.includes(item.code));
  return prisma.role.findMany({ where: { tenantId, code: { in: codes } } });
}

module.exports = {
  listRoles,
  findRolesByCodes,
};
