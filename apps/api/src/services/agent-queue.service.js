const { listDossiers, getDossierByReference, changeAttachmentStatus } = require('./dossier.service');
const { addInternalComment } = require('../repositories/dossier-agent.repository');

function statusRank(status) {
  const ranks = {
    submitted: 1,
    in_review: 2,
    validated: 3,
    issued: 4,
    available: 5,
    draft: 6,
  };
  return ranks[status] || 99;
}

function priorityScore(dossier) {
  let score = 0;
  if (dossier.status === 'submitted') score += 100;
  if (dossier.status === 'in_review') score += 80;
  if ((dossier.documentsCount || 0) === 0) score += 10;
  if (dossier.nextStep) score += 5;
  return score;
}

async function listPrioritizedQueue(filters = {}) {
  const dossiers = await listDossiers();
  const filtered = dossiers.filter((item) => {
    const okStatus = !filters.status || filters.status === 'all' || item.status === filters.status;
    const okProcedure = !filters.procedureCode || filters.procedureCode === 'all' || (item.procedureCode || item.procedureId) === filters.procedureCode;
    return okStatus && okProcedure;
  });

  return filtered
    .map((item) => ({ ...item, priorityScore: priorityScore(item) }))
    .sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) return b.priorityScore - a.priorityScore;
      if (statusRank(a.status) !== statusRank(b.status)) return statusRank(a.status) - statusRank(b.status);
      return String(a.reference).localeCompare(String(b.reference));
    });
}

async function listPendingDocuments() {
  const dossiers = await listDossiers();
  const details = await Promise.all(dossiers.map((item) => getDossierByReference(item.reference)));
  const rows = [];
  details.forEach((dossier) => {
    (dossier?.documents || []).forEach((document) => {
      rows.push({
        dossierReference: dossier.reference,
        procedureTitle: dossier.procedureTitle || dossier.procedureCode || dossier.procedureId,
        dossierStatus: dossier.status,
        document,
      });
    });
  });
  return rows.sort((a, b) => {
    const aPending = (a.document.validationStatus || 'PENDING') === 'PENDING' ? 0 : 1;
    const bPending = (b.document.validationStatus || 'PENDING') === 'PENDING' ? 0 : 1;
    if (aPending !== bPending) return aPending - bPending;
    return String(a.dossierReference).localeCompare(String(b.dossierReference));
  });
}

async function addAgentInternalComment(reference, payload) {
  return addInternalComment(reference, payload);
}

async function validateDocument(reference, documentId, payload) {
  return changeAttachmentStatus(reference, documentId, payload);
}

module.exports = {
  listPrioritizedQueue,
  listPendingDocuments,
  addAgentInternalComment,
  validateDocument,
};
