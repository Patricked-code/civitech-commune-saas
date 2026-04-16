const {
  listDossiers: repoListDossiers,
  findDossierByReference,
  createDossier,
  transitionDossier,
  addDossierAttachment,
} = require('../repositories/dossier.repository');
const { computeNextStep, computeProgress } = require('./workflow.service');

function resolveWorkflowKey(dossier) {
  return dossier.procedureCode || dossier.procedureId;
}

async function listDossiers() {
  const dossiers = await repoListDossiers();
  return dossiers.map((item) => ({
    ...item,
    computedProgress: computeProgress(resolveWorkflowKey(item), item.currentStep),
    nextStep: computeNextStep(resolveWorkflowKey(item), item.currentStep),
  }));
}

async function getDossierByReference(reference) {
  const dossier = await findDossierByReference(reference);
  if (!dossier) return null;
  return {
    ...dossier,
    computedProgress: computeProgress(resolveWorkflowKey(dossier), dossier.currentStep),
    nextStep: computeNextStep(resolveWorkflowKey(dossier), dossier.currentStep),
  };
}

async function createDraftDossier(payload) {
  return createDossier(payload);
}

async function moveDossierToNextStep(reference, payload) {
  const dossier = await findDossierByReference(reference);
  if (!dossier) return null;
  const targetStep = computeNextStep(resolveWorkflowKey(dossier), dossier.currentStep);
  if (!targetStep) return dossier;
  return transitionDossier(reference, {
    fromStep: dossier.currentStep,
    targetStep,
    comment: payload.comment,
    actorUserId: payload.actorUserId,
  });
}

async function attachDocumentToDossier(reference, payload) {
  return addDossierAttachment(reference, payload);
}

module.exports = {
  listDossiers,
  getDossierByReference,
  createDraftDossier,
  moveDossierToNextStep,
  attachDocumentToDossier,
};
