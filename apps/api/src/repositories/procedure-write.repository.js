const { getPrismaClient } = require('../db/prisma');
const { procedures } = require('../data/seedData');

async function createProcedure(payload) {
  const prisma = getPrismaClient();

  if (!prisma) {
    const procedure = {
      id: payload.code.toLowerCase(),
      code: payload.code,
      title: payload.title,
      domain: payload.category,
      feeAmount: payload.feeAmount || 0,
      status: 'active',
      estimatedDelayDays: payload.estimatedDelayDays || 3,
      steps: payload.steps || ['submitted', 'checked', 'validated'],
    };
    procedures.push(procedure);
    return procedure;
  }

  const record = await prisma.procedure.create({
    data: {
      tenantId: payload.tenantId,
      code: payload.code,
      title: payload.title,
      category: payload.category,
      description: payload.description || null,
      status: 'ACTIVE',
      feeAmount: payload.feeAmount || 0,
      estimatedDelayDays: payload.estimatedDelayDays || 3,
    },
  });

  return {
    id: record.id,
    code: record.code,
    title: record.title,
    domain: record.category,
    feeAmount: record.feeAmount,
    status: record.status.toLowerCase(),
    estimatedDelayDays: record.estimatedDelayDays,
    steps: [],
  };
}

module.exports = {
  createProcedure,
};
