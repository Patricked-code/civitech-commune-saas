const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'niakaramadougou' },
    update: {
      name: 'Niakaramadougou',
      timezone: 'Africa/Abidjan',
    },
    create: {
      slug: 'niakaramadougou',
      name: 'Niakaramadougou',
      countryCode: 'CI',
      timezone: 'Africa/Abidjan',
    },
  });

  const roleCitizen = await prisma.role.upsert({
    where: { tenantId_code: { tenantId: tenant.id, code: 'citizen' } },
    update: { label: 'Citizen' },
    create: { tenantId: tenant.id, code: 'citizen', label: 'Citizen', scope: 'tenant' },
  });

  const roleAgent = await prisma.role.upsert({
    where: { tenantId_code: { tenantId: tenant.id, code: 'agent' } },
    update: { label: 'Agent' },
    create: { tenantId: tenant.id, code: 'agent', label: 'Agent', scope: 'tenant' },
  });

  const roleAdmin = await prisma.role.upsert({
    where: { tenantId_code: { tenantId: tenant.id, code: 'commune_admin' } },
    update: { label: 'Commune admin' },
    create: { tenantId: tenant.id, code: 'commune_admin', label: 'Commune admin', scope: 'tenant' },
  });

  const citizen = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: 'citoyen@niakara.ci' } },
    update: { firstName: 'Awa', lastName: 'Kone', userType: 'citizen' },
    create: {
      tenantId: tenant.id,
      email: 'citoyen@niakara.ci',
      firstName: 'Awa',
      lastName: 'Kone',
      userType: 'citizen',
      passwordHash: 'demo1234',
      status: 'ACTIVE',
    },
  });

  const agent = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: 'agent.etatcivil@niakara.ci' } },
    update: { firstName: 'Mariam', lastName: 'Traore', userType: 'agent' },
    create: {
      tenantId: tenant.id,
      email: 'agent.etatcivil@niakara.ci',
      firstName: 'Mariam',
      lastName: 'Traore',
      userType: 'agent',
      passwordHash: 'demo1234',
      status: 'ACTIVE',
    },
  });

  const admin = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: 'admin@niakara.ci' } },
    update: { firstName: 'Eric', lastName: 'Admin', userType: 'admin' },
    create: {
      tenantId: tenant.id,
      email: 'admin@niakara.ci',
      firstName: 'Eric',
      lastName: 'Admin',
      userType: 'admin',
      passwordHash: 'demo1234',
      status: 'ACTIVE',
    },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: citizen.id, roleId: roleCitizen.id } },
    update: {},
    create: { userId: citizen.id, roleId: roleCitizen.id },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: agent.id, roleId: roleAgent.id } },
    update: {},
    create: { userId: agent.id, roleId: roleAgent.id },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: admin.id, roleId: roleAdmin.id } },
    update: {},
    create: { userId: admin.id, roleId: roleAdmin.id },
  });

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
      create: {
        procedureId: procedureBirth.id,
        code: step.code,
        title: step.title,
        stepOrder: step.stepOrder,
        stepType: 'standard',
      },
    });
  }

  await prisma.dossier.upsert({
    where: { reference: 'NIC-2026-00021' },
    update: { status: 'IN_REVIEW', currentStepCode: 'checked' },
    create: {
      tenantId: tenant.id,
      procedureId: procedureBirth.id,
      citizenUserId: citizen.id,
      reference: 'NIC-2026-00021',
      status: 'IN_REVIEW',
      currentStepCode: 'checked',
      submittedAt: new Date(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
