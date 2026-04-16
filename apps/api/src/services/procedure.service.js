const { listProcedures: repoListProcedures, findProcedureById } = require('../repositories/procedure.repository');
const { listDossiers: repoListDossiers } = require('../repositories/dossier.repository');

async function listProcedures() {
  return repoListProcedures();
}

async function getProcedureById(id) {
  return findProcedureById(id);
}

async function getDashboardStats() {
  const dossiers = await repoListDossiers();
  const waiting = dossiers.filter((item) => item.status !== 'available' && item.status !== 'archived').length;
  const toComplete = dossiers.filter((item) => item.status === 'waiting-citizen').length;
  const ready = dossiers.filter((item) => item.status === 'available').length;

  return {
    dossiers_en_attente: waiting,
    demandes_a_completer: toComplete,
    actes_prets_au_retrait: ready,
    paiements_du_jour: 9,
  };
}

module.exports = {
  listProcedures,
  getProcedureById,
  getDashboardStats,
};
