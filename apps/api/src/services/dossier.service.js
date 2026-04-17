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

function enrichDossier(item) {
  return {
    ...item,
    computedProgress: computeProgress(resolveWorkflowKey(item), item.currentStep),
    nextStep: computeNextStep(resolveWorkflowKey(item), item.currentStep),
  };
}

async function listDossiers() {
  const dossiers = await repoListDossiers();
  return dossiers.map(enrichDossier);
}

async function listCitizenDossiers(citizenUserId) {
  const dossiers = await repoListDossiersByCitizenUserId(citizenUserId);
  return dossiers.map(enrichDossier);
}

async function getDossierByReference(reference) {
  const dossier = await findDossierByReference(reference);
  if (!dossier) return null;
  return enrichDossier(dossier);
}

async function createDraftDossier(payload) {
  return createDossier(payload);
}

async function updateDraftDossier(reference, payload) {
  const updated = await updateDossierDraftPayload(reference, payload);
  if (!updated) return null;
  if (updated.reference) {
    const dossier = await findDossierByReference(reference);
    return dossier ? enrichDossier(dossier) : enrichDossier(updated);
  }
  return null;
}

async function moveDossierToNextStep(reference, payload) {
  const dossier = await findDossierByReference(reference);
  if (!dossier) return null;
  const targetStep = computeNextStep(resolveWorkflowKey(dossier), dossier.currentStep);
  if (!targetStep) return enrichDossier(dossier);
  const updated = await transitionDossier(reference, {
    fromStep: dossier.currentStep,
    targetStep,
    comment: payload.comment,
    actorUserId: payload.actorUserId,
  });
  return updated ? enrichDossier(updated) : null;
}

async function submitDraftDossier(reference, payload) {
  const updated = await submitDossier(reference, payload);
  return updated ? enrichDossier(updated) : null;
}

async function addCommentToDossier(reference, payload) {
  return addWorkflowComment(reference, payload);
}

async function attachDocumentToDossier(reference, payload) {
  return addDossierAttachment(reference, payload);
}

async function changeAttachmentStatus(reference, documentId, payload) {
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
};
