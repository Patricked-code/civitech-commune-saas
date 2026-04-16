const { listUsers } = require('../repositories/user.repository');
const { createUser, updateUserByEmail, deleteUserByEmail } = require('../repositories/user-write.repository');
const { listRoles } = require('../repositories/role.repository');
const { listProcedures } = require('../repositories/procedure.repository');
const { createProcedure } = require('../repositories/procedure-write.repository');
const { updateProcedureByCode, deleteProcedureByCode } = require('../repositories/procedure-admin.repository');
const { listDossiers } = require('../repositories/dossier.repository');

async function getAdminSnapshot() {
  const [users, procedures, dossiers, roles] = await Promise.all([
    listUsers(),
    listProcedures(),
    listDossiers(),
    listRoles(),
  ]);

  return {
    usersCount: users.length,
    proceduresCount: procedures.length,
    dossiersCount: dossiers.length,
    rolesCount: roles.length,
  };
}

module.exports = {
  listUsers,
  createUser,
  updateUserByEmail,
  deleteUserByEmail,
  listRoles,
  listProcedures,
  createProcedure,
  updateProcedureByCode,
  deleteProcedureByCode,
  listDossiers,
  getAdminSnapshot,
};
