const { dossiers } = require('../data/seedData');
const { computeNextStep, computeProgress } = require('./workflow.service');

function listDossiers() {
  return dossiers.map((item) => ({
    ...item,
    computedProgress: computeProgress(item.procedureId, item.currentStep),
  }));
}

function getDossierByReference(reference) {
  const dossier = dossiers.find((item) => item.reference === reference);
  if (!dossier) return null;
  return {
    ...dossier,
    computedProgress: computeProgress(dossier.procedureId, dossier.currentStep),
    nextStep: computeNextStep(dossier.procedureId, dossier.currentStep),
  };
}

function createDraftDossier(payload) {
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

module.exports = {
  listDossiers,
  getDossierByReference,
  createDraftDossier,
};
