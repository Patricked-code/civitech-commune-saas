const { getPrismaClient } = require('../db/prisma');
const { procedures } = require('../data/seedData');

async function listProcedures() {
  const prisma = getPrismaClient();
  if (!prisma) {
    return procedures;
  }

  const records = await prisma.procedure.findMany({
    include: {
      steps: {
        orderBy: { stepOrder: 'asc' },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  return records.map((record) => ({
    id: record.id,
    code: record.code,
    title: record.title,
    domain: record.category,
    feeAmount: record.feeAmount,
    status: record.status.toLowerCase(),
    estimatedDelayDays: record.estimatedDelayDays,
    steps: record.steps.map((step) => step.code),
  }));
}

async function findProcedureById(id) {
  const prisma = getPrismaClient();
  if (!prisma) {
    return procedures.find((item) => item.id === id) || null;
  }

  const record = await prisma.procedure.findUnique({
    where: { id },
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
  listProcedures,
  findProcedureById,
};
