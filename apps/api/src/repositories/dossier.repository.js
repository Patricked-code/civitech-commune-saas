const { getPrismaClient } = require('../db/prisma');
const { dossiers } = require('../data/seedData');
const { findProcedureByCode } = require('./procedure-lookup.repository');

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
  const formData = payload.formData || {};

  if (!prisma) {
    const reference = 'NIC-' + new Date().getFullYear() + '-' + String(dossiers.length + 1).padStart(5, '0');
    const dossier = {
      reference,
      procedureId: payload.procedureId,
      procedureCode: payload.procedureCode || null,
      status: 'draft',
      progress: 0,
      currentStep: 'submitted',
      service: payload.service || 'Etat civil',
      formData,
      events: [
        {
          eventType: 'DOSSIER_DRAFT_CREATED',
          eventLabel: 'Dossier draft created',
          payloadJson: JSON.stringify(formData),
        },
      ],
    };
    dossiers.push(dossier);
    return dossier;
  }

  let resolvedProcedureId = payload.procedureId;
  if (!resolvedProcedureId && payload.procedureCode) {
    const procedure = await findProcedureByCode(payload.procedureCode);
    resolvedProcedureId = procedure ? procedure.id : null;
  }

  if (!resolvedProcedureId) {
    throw new Error('Procedure resolution failed');
  }

  const reference = 'NIC-' + new Date().getFullYear() + '-' + Date.now();
  const record = await prisma.dossier.create({
    data: {
      tenantId: payload.tenantId,
      procedureId: resolvedProcedureId,
      citizenUserId: payload.citizenUserId,
      reference,
      status: 'DRAFT',
      currentStepCode: 'submitted',
      events: {
        create: {
          eventType: 'DOSSIER_DRAFT_CREATED',
          eventLabel: 'Dossier draft created',
          actorUserId: payload.citizenUserId,
          payloadJson: JSON.stringify(formData),
        },
      },
    },
    include: {
      events: true,
      procedure: true,
    },
  });

  return {
    reference: record.reference,
    procedureId: record.procedureId,
    status: record.status.toLowerCase(),
    currentStep: record.currentStepCode,
    service: record.procedure.category,
    formData,
    events: record.events,
  };
}

module.exports = {
  listDossiers,
  findDossierByReference,
  createDossier,
};
