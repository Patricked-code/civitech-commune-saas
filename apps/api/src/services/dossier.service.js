const {
  listDossiers: repoListDossiers,
  listDossiersByCitizenUserId: repoListDossiersByCitizenUserId,
  findDossierByReference,
  createDossier,
  transitionDossier,
  submitDossier,
  addWorkflowComment,
  addDossierAttachment,
  updateAttachmentStatus,
} = require('../repositories/dossier.repository');
const { updateDossierDraftPayload } = require('../repositories/dossier-draft.repository');
const { computeNextStep, computeProgress } = require('./workflow.service');

function resolveWorkflowKey(dossier) {
  return dossier.procedureCode || dossier.procedureId;
}

function isBackofficeUser(auth) {
  const roles = auth?.roleCodes || [];
  return roles.some((role) => ['agent', 'service_manager', 'commune_admin', 'super_admin'].includes(role));
}

function canAccessDossier(auth, dossier) {
  if (!auth || !dossier) return false;
  if (auth.roleCodes?.includes('super_admin')) return true;
  if (dossier.tenantId && auth.tenantId && dossier.tenantId !== auth.tenantId) return false;
  if (isBackofficeUser(auth)) return true;
  return Boolean(dossier.citizenUserId && dossier.citizenUserId === auth.id);
}

function enrichDossier(item) {
  return {
    ...item,
    computedProgress: computeProgress(resolveWorkflowKey(item), item.currentStep),
    nextStep: computeNextStep(resolveWorkflowKey(item), item.currentStep),
  };
}

async function listDossiers(auth) {
  const dossiers = await repoListDossiers(auth?.tenantId);
  const scoped = auth && !isBackofficeUser(auth) && !auth.roleCodes?.includes('super_admin')
    ? dossiers.filter((item) => item.citizenUserId === auth.id)
    : dossiers;
  return scoped.map(enrichDossier);
}

async function listCitizenDossiers(citizenUserId) {
  const dossiers = await repoListDossiersByCitizenUserId(citizenUserId);
  return dossiers.map(enrichDossier);
}

async function getDossierByReference(reference, auth) {
  const dossier = await findDossierByReference(reference, auth?.tenantId);
  if (!dossier) return null;
  if (auth && !canAccessDossier(auth, dossier)) return null;
  return enrichDossier(dossier);
}

async function createDraftDossier(payload) {
  return createDossier(payload);
}

async function updateDraftDossier(reference, payload) {
  const current = await getDossierByReference(reference, payload.auth);
  if (!current) return null;
  if (current.status !== 'draft') {
    const error = new Error('Seul un brouillon peut etre modifie.');
    error.statusCode = 409;
    error.code = 'DOSSIER_NOT_DRAFT';
    throw error;
  }
  const updated = await updateDossierDraftPayload(reference, payload);
  if (!updated) return null;
  const dossier = await findDossierByReference(reference, payload.auth?.tenantId);
  return dossier ? enrichDossier(dossier) : null;
}

async function moveDossierToNextStep(reference, payload) {
  const dossier = await getDossierByReference(reference, payload.auth);
  if (!dossier) return null;
  const targetStep = computeNextStep(resolveWorkflowKey(dossier), dossier.currentStep);
  if (!targetStep) return enrichDossier(dossier);
  const updated = await transitionDossier(reference, {
    fromStep: dossier.currentStep,
    targetStep,
    comment: payload.comment,
    actorUserId: payload.actorUserId,
    tenantId: payload.auth?.tenantId,
  });
  return updated ? enrichDossier(updated) : null;
}

async function submitDraftDossier(reference, payload) {
  const dossier = await getDossierByReference(reference, payload.auth);
  if (!dossier) return null;
  if (dossier.status !== 'draft') {
    const error = new Error('Ce dossier a deja ete soumis ou traite.');
    error.statusCode = 409;
    error.code = 'DOSSIER_ALREADY_SUBMITTED';
    throw error;
  }
  const updated = await submitDossier(reference, payload);
  return updated ? enrichDossier(updated) : null;
}

async function addCommentToDossier(reference, payload) {
  const dossier = await getDossierByReference(reference, payload.auth);
  if (!dossier) return null;
  return addWorkflowComment(reference, payload);
}

async function attachDocumentToDossier(reference, payload) {
  const dossier = await getDossierByReference(reference, payload.auth);
  if (!dossier) return null;
  return addDossierAttachment(reference, payload);
}

async function changeAttachmentStatus(reference, documentId, payload) {
  const dossier = await getDossierByReference(reference, payload.auth);
  if (!dossier) return null;
  return updateAttachmentStatus(reference, documentId, payload);
}

module.exports = {
  listDossiers,
  listCitizenDossiers,
  getDossierByReference,
  createDraftDossier,
  updateDraftDossier,
  moveDossierToNextStep,
  submitDraftDossier,
  addCommentToDossier,
  attachDocumentToDossier,
  changeAttachmentStatus,
  canAccessDossier,
};
