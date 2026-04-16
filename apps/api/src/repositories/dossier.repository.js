const { getPrismaClient } = require('../db/prisma');
const { dossiers } = require('../data/seedData');

async function listDossiers() {
  const prisma = getPrismaClient();
  if (!prisma) {
    return dossiers;
  }

  const records = await prisma.dossier.findMany({
    include: {
      procedure: true,
      citizenUser: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  return records.map((record) => ({
    reference: record.reference,
    procedureId: record.procedureId,
    status: record.status.toLowerCase(),
    progress: null,
    currentStep: record.currentStepCode,
    service: record.procedure.category,
    citizen: record.citizenUser ? `${record.citizenUser.firstName} ${record.citizenUser.lastName}` : null,
  }));
}

async function findDossierByReference(reference) {
  const prisma = getPrismaClient();
  if (!prisma) {
    return dossiers.find((item) => item.reference === reference) || null;
  }

  const record = await prisma.dossier.findUnique({
    where: { reference },
    include: {
      procedure: true,
      citizenUser: true,
      documents: true,
      events: true,
    },
  });

  if (!record) return null;

  return {
    reference: record.reference,
    procedureId: record.procedureId,
    status: record.status.toLowerCase(),
    currentStep: record.currentStepCode,
    service: record.procedure.category,
    citizen: record.citizenUser ? `${record.citizenUser.firstName} ${record.citizenUser.lastName}` : null,
    documents: record.documents,
    events: record.events,
  };
}

async function createDossier(payload) {
  const prisma = getPrismaClient();
  if (!prisma) {
    const reference = 'NIC-' + new Date().getFullYear() + '-' + String(dossiers.length + 1).padStart(5, '0');
    const dossier = {
      reference,
      procedureId: payload.procedureId,
      status: 'draft',
      progress: 0,
      currentStep: 'submitted',
      service: payload.service || 'Etat civil',
    };
    dossiers.push(dossier);
    return dossier;
  }

  const reference = 'NIC-' + new Date().getFullYear() + '-' + Date.now();
  const record = await prisma.dossier.create({
    data: {
      tenantId: payload.tenantId,
      procedureId: payload.procedureId,
      citizenUserId: payload.citizenUserId,
      reference,
      status: 'DRAFT',
      currentStepCode: 'submitted',
    },
  });

  return {
    reference: record.reference,
    procedureId: record.procedureId,
    status: record.status.toLowerCase(),
    currentStep: record.currentStepCode,
    service: payload.service || 'Etat civil',
  };
}

module.exports = {
  listDossiers,
  findDossierByReference,
  createDossier,
};
