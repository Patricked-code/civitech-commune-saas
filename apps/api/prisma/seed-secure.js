const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../src/security/password');

const prisma = new PrismaClient();

async function main() {
  const demoPasswordHash = await hashPassword('demo1234');

  const tenant = await prisma.tenant.upsert({
    where: { slug: 'niakaramadougou' },
    update: { name: 'Niakaramadougou', timezone: 'Africa/Abidjan' },
    create: { slug: 'niakaramadougou', name: 'Niakaramadougou', countryCode: 'CI', timezone: 'Africa/Abidjan' },
  });

  const roleSeeds = [
    { code: 'citizen', label: 'Citizen' },
    { code: 'agent', label: 'Agent' },
    { code: 'service_manager', label: 'Service manager' },
    { code: 'commune_admin', label: 'Commune admin' },
  ];

  const roles = {};
  for (const role of roleSeeds) {
    roles[role.code] = await prisma.role.upsert({
      where: { tenantId_code: { tenantId: tenant.id, code: role.code } },
      update: { label: role.label },
      create: { tenantId: tenant.id, code: role.code, label: role.label, scope: 'tenant' },
    });
  }

  const userSeeds = [
    { email: 'citoyen@niakara.ci', firstName: 'Awa', lastName: 'Kone', userType: 'citizen', roleCode: 'citizen' },
    { email: 'agent.etatcivil@niakara.ci', firstName: 'Mariam', lastName: 'Traore', userType: 'agent', roleCode: 'agent' },
    { email: 'admin@niakara.ci', firstName: 'Eric', lastName: 'Admin', userType: 'admin', roleCode: 'commune_admin' },
  ];

  for (const userSeed of userSeeds) {
    const user = await prisma.user.upsert({
      where: { tenantId_email: { tenantId: tenant.id, email: userSeed.email } },
      update: {
        firstName: userSeed.firstName,
        lastName: userSeed.lastName,
        userType: userSeed.userType,
        passwordHash: demoPasswordHash,
        status: 'ACTIVE',
      },
      create: {
        tenantId: tenant.id,
        email: userSeed.email,
        firstName: userSeed.firstName,
        lastName: userSeed.lastName,
        userType: userSeed.userType,
        passwordHash: demoPasswordHash,
        status: 'ACTIVE',
      },
    });

    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: user.id, roleId: roles[userSeed.roleCode].id } },
      update: {},
      create: { userId: user.id, roleId: roles[userSeed.roleCode].id },
    });
  }

  const procedureBirth = await prisma.procedure.upsert({
    where: { tenantId_code: { tenantId: tenant.id, code: 'STATE_CIVIL_BIRTH' } },
    update: { title: 'Declaration de naissance', category: 'Etat civil', status: 'ACTIVE', feeAmount: 1500 },
    create: {
      tenantId: tenant.id,
      code: 'STATE_CIVIL_BIRTH',
      title: 'Declaration de naissance',
      category: 'Etat civil',
      status: 'ACTIVE',
      feeAmount: 1500,
      estimatedDelayDays: 3,
    },
  });

  const steps = [
    { code: 'submitted', title: 'Submitted', stepOrder: 1 },
    { code: 'qualified', title: 'Qualified', stepOrder: 2 },
    { code: 'checked', title: 'Checked', stepOrder: 3 },
    { code: 'validated', title: 'Validated', stepOrder: 4 },
    { code: 'issued', title: 'Issued', stepOrder: 5 },
    { code: 'archived', title: 'Archived', stepOrder: 6 },
  ];

  for (const step of steps) {
    await prisma.procedureStep.upsert({
      where: { procedureId_code: { procedureId: procedureBirth.id, code: step.code } },
      update: { title: step.title, stepOrder: step.stepOrder, stepType: 'standard' },
      create: { procedureId: procedureBirth.id, code: step.code, title: step.title, stepOrder: step.stepOrder, stepType: 'standard' },
    });
  }
}

main().then(async () => {
  await prisma.$disconnect();
}).catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
