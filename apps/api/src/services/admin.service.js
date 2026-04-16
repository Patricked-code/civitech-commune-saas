const { listUsers } = require('../repositories/user.repository');
const { listProcedures } = require('../repositories/procedure.repository');
const { createProcedure } = require('../repositories/procedure-write.repository');
const { listDossiers } = require('../repositories/dossier.repository');

async function getAdminSnapshot() {
  const [users, procedures, dossiers] = await Promise.all([
    listUsers(),
    listProcedures(),
    listDossiers(),
  ]);

  return {
    usersCount: users.length,
    proceduresCount: procedures.length,
    dossiersCount: dossiers.length,
  };
}

module.exports = {
  listUsers,
  listProcedures,
  createProcedure,
  listDossiers,
  getAdminSnapshot,
};
