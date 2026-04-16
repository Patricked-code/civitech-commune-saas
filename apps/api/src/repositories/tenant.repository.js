const { getPrismaClient } = require('../db/prisma');
const { tenant, modules } = require('../data/seedData');

async function findSeedTenantBySlug(slug) {
  if (tenant.slug !== slug) return null;
  return {
    id: tenant.id,
    slug: tenant.slug,
    name: tenant.name,
    countryCode: 'CI',
    timezone: tenant.timezone,
    modules,
  };
}

async function findTenantBySlug(slug) {
  const prisma = getPrismaClient();
  if (!prisma) {
    return findSeedTenantBySlug(slug);
  }

  const record = await prisma.tenant.findUnique({
    where: { slug },
  });

  if (!record) return null;

  return {
    ...record,
    modules,
  };
}

module.exports = {
  findTenantBySlug,
};
