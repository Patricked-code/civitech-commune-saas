const { procedures, dossiers } = require('../data/seedData');

function listProcedures() {
  return procedures;
}

function getProcedureById(id) {
  return procedures.find((item) => item.id === id) || null;
}

function listDossiers() {
  return dossiers;
}

function getDashboardStats() {
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
  listDossiers,
  getDashboardStats,
};
