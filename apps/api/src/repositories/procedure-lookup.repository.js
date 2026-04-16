const { getPrismaClient } = require('../db/prisma');
const { procedures } = require('../data/seedData');

async function findProcedureByCode(code) {
  const prisma = getPrismaClient();
  if (!prisma) {
    return procedures.find((item) => item.code === code || item.id === code) || null;
  }

  const record = await prisma.procedure.findFirst({
    where: { code },
    include: {
      steps: {
        orderBy: { stepOrder: 'asc' },
      },
    },
  });

  if (!record) return null;

  return {
    id: record.id,
    code: record.code,
    title: record.title,
    domain: record.category,
    feeAmount: record.feeAmount,
    status: record.status.toLowerCase(),
    estimatedDelayDays: record.estimatedDelayDays,
    steps: record.steps.map((step) => step.code),
  };
}

module.exports = {
  findProcedureByCode,
};
