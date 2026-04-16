const { getPrismaClient } = require('../db/prisma');
const { dossiers } = require('../data/seedData');
const { findProcedureByCode } = require('./procedure-lookup.repository');
const { computeNextStep } = require('../services/workflow.service');

async function listDossiers() {
  const prisma = getPrismaClient();
  if (!prisma) {
    return dossiers;
  }

  const records = await prisma.dossier.findMany({
    include: {
      procedure: true,
      citizenUser: true,
      documents: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  return records.map((record) => ({
    reference: record.reference,
    procedureId: record.procedureId,
    procedureCode: record.procedure.code,
    procedureTitle: record.procedure.title,
    status: record.status.toLowerCase(),
    progress: null,
    currentStep: record.currentStepCode,
    service: record.procedure.category,
    citizen: record.citizenUser ? `${record.citizenUser.firstName} ${record.citizenUser.lastName}` : null,
    documentsCount: record.documents.length,
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
      events: { orderBy: { createdAt: 'asc' } },
    },
  });

  if (!record) return null;

  return {
    reference: record.reference,
    procedureId: record.procedureId,
    procedureCode: record.procedure.code,
    procedureTitle: record.procedure.title,
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
      procedureTitle: payload.procedureTitle || null,
      status: 'draft',
      progress: 0,
      currentStep: 'submitted',
      service: payload.service || 'Etat civil',
      formData,
      documents: [],
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
  let resolvedProcedure = null;
  if (!resolvedProcedureId && payload.procedureCode) {
    resolvedProcedure = await findProcedureByCode(payload.procedureCode);
    resolvedProcedureId = resolvedProcedure ? resolvedProcedure.id : null;
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
      documents: true,
    },
  });

  return {
    reference: record.reference,
    procedureId: record.procedureId,
    procedureCode: record.procedure.code,
    procedureTitle: record.procedure.title,
    status: record.status.toLowerCase(),
    currentStep: record.currentStepCode,
    service: record.procedure.category,
    formData,
    documents: record.documents,
    events: record.events,
  };
}

async function transitionDossier(reference, payload) {
  const prisma = getPrismaClient();
  const targetStep = payload.targetStep;

  if (!prisma) {
    const dossier = dossiers.find((item) => item.reference === reference);
    if (!dossier) return null;
    dossier.currentStep = targetStep;
    dossier.status = targetStep;
    dossier.events = dossier.events || [];
    dossier.events.push({
      eventType: 'DOSSIER_STEP_CHANGED',
      eventLabel: 'Dossier step changed',
      payloadJson: JSON.stringify({ from: payload.fromStep, to: targetStep, comment: payload.comment || '' }),
    });
    return dossier;
  }

  const existing = await prisma.dossier.findUnique({
    where: { reference },
    include: { procedure: true, events: true, documents: true },
  });
  if (!existing) return null;

  const updated = await prisma.dossier.update({
    where: { reference },
    data: {
      currentStepCode: targetStep,
      status: 'IN_REVIEW',
      events: {
        create: {
          eventType: 'DOSSIER_STEP_CHANGED',
          eventLabel: 'Dossier step changed',
          actorUserId: payload.actorUserId,
          payloadJson: JSON.stringify({ from: payload.fromStep, to: targetStep, comment: payload.comment || '' }),
        },
      },
    },
    include: {
      procedure: true,
      events: { orderBy: { createdAt: 'asc' } },
      documents: true,
    },
  });

  return {
    reference: updated.reference,
    procedureId: updated.procedureId,
    procedureCode: updated.procedure.code,
    procedureTitle: updated.procedure.title,
    status: updated.status.toLowerCase(),
    currentStep: updated.currentStepCode,
    service: updated.procedure.category,
    documents: updated.documents,
    events: updated.events,
  };
}

async function addDossierAttachment(reference, payload) {
  const prisma = getPrismaClient();

  if (!prisma) {
    const dossier = dossiers.find((item) => item.reference === reference);
    if (!dossier) return null;
    dossier.documents = dossier.documents || [];
    const document = {
      id: 'doc-' + Date.now(),
      documentType: payload.documentType,
      storageKey: payload.storageKey,
      originalFilename: payload.originalFilename,
      mimeType: payload.mimeType,
      validationStatus: 'PENDING',
    };
    dossier.documents.push(document);
    dossier.events = dossier.events || [];
    dossier.events.push({
      eventType: 'DOCUMENT_ATTACHED',
      eventLabel: 'Document attached',
      payloadJson: JSON.stringify(document),
    });
    return document;
  }

  const existing = await prisma.dossier.findUnique({ where: { reference } });
  if (!existing) return null;

  const document = await prisma.dossierDocument.create({
    data: {
      dossierId: existing.id,
      documentType: payload.documentType,
      storageKey: payload.storageKey,
      originalFilename: payload.originalFilename,
      mimeType: payload.mimeType,
      validationStatus: 'PENDING',
    },
  });

  await prisma.dossierEvent.create({
    data: {
      dossierId: existing.id,
      actorUserId: payload.actorUserId,
      eventType: 'DOCUMENT_ATTACHED',
      eventLabel: 'Document attached',
      payloadJson: JSON.stringify(document),
    },
  });

  return document;
}

module.exports = {
  listDossiers,
  findDossierByReference,
  createDossier,
  transitionDossier,
  addDossierAttachment,
};
