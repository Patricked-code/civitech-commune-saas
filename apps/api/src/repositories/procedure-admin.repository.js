const { getPrismaClient } = require('../db/prisma');
const { procedures } = require('../data/seedData');

async function updateProcedureByCode(code, payload) {
  const prisma = getPrismaClient();

  if (!prisma) {
    const index = procedures.findIndex((item) => item.code === code || item.id === code);
    if (index === -1) return null;
    procedures[index] = {
      ...procedures[index],
      title: payload.title || procedures[index].title,
      domain: payload.category || procedures[index].domain,
      feeAmount: payload.feeAmount ?? procedures[index].feeAmount,
      estimatedDelayDays: payload.estimatedDelayDays ?? procedures[index].estimatedDelayDays,
    };
    return procedures[index];
  }

  const record = await prisma.procedure.findFirst({ where: { code } });
  if (!record) return null;

  const updated = await prisma.procedure.update({
    where: { id: record.id },
    data: {
      title: payload.title ?? record.title,
      category: payload.category ?? record.category,
      feeAmount: payload.feeAmount ?? record.feeAmount,
      estimatedDelayDays: payload.estimatedDelayDays ?? record.estimatedDelayDays,
    },
  });

  return {
    id: updated.id,
    code: updated.code,
    title: updated.title,
    domain: updated.category,
    feeAmount: updated.feeAmount,
    status: updated.status.toLowerCase(),
    estimatedDelayDays: updated.estimatedDelayDays,
  };
}

async function deleteProcedureByCode(code) {
  const prisma = getPrismaClient();

  if (!prisma) {
    const index = procedures.findIndex((item) => item.code === code || item.id === code);
    if (index === -1) return false;
    procedures.splice(index, 1);
    return true;
  }

  const record = await prisma.procedure.findFirst({ where: { code } });
  if (!record) return false;
  await prisma.procedure.delete({ where: { id: record.id } });
  return true;
}

module.exports = {
  updateProcedureByCode,
  deleteProcedureByCode,
};
