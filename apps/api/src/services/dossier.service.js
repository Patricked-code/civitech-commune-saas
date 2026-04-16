const { listDossiers: repoListDossiers, findDossierByReference, createDossier } = require('../repositories/dossier.repository');
const { computeNextStep, computeProgress } = require('./workflow.service');

async function listDossiers() {
  const dossiers = await repoListDossiers();
  return dossiers.map((item) => ({
    ...item,
    computedProgress: computeProgress(item.procedureId, item.currentStep),
  }));
}

async function getDossierByReference(reference) {
  const dossier = await findDossierByReference(reference);
  if (!dossier) return null;
  return {
    ...dossier,
    computedProgress: computeProgress(dossier.procedureId, dossier.currentStep),
    nextStep: computeNextStep(dossier.procedureId, dossier.currentStep),
  };
}

async function createDraftDossier(payload) {
  return createDossier(payload);
}

module.exports = {
  listDossiers,
  getDossierByReference,
  createDraftDossier,
};
