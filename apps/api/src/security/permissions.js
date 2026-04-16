const permissions = {
  dossier: {
    read: 'dossier.read',
    create: 'dossier.create',
    update: 'dossier.update',
    validate: 'dossier.validate',
    archive: 'dossier.archive',
  },
  procedure: {
    read: 'procedure.read',
    manage: 'procedure.manage',
  },
  admin: {
    dashboard: 'admin.dashboard',
    users: 'admin.users',
    roles: 'admin.roles',
    tenant: 'admin.tenant',
  },
  cms: {
    publish: 'cms.publish',
  },
};

const rolePermissions = {
  citizen: [permissions.dossier.read, permissions.dossier.create],
  agent: [permissions.dossier.read, permissions.dossier.update, permissions.procedure.read],
  service_manager: [permissions.dossier.read, permissions.dossier.update, permissions.dossier.validate, permissions.procedure.read],
  commune_admin: [
    permissions.dossier.read,
    permissions.dossier.update,
    permissions.dossier.validate,
    permissions.dossier.archive,
    permissions.procedure.read,
    permissions.procedure.manage,
    permissions.admin.dashboard,
    permissions.admin.users,
    permissions.admin.roles,
    permissions.cms.publish,
  ],
  super_admin: ['*'],
};

module.exports = {
  permissions,
  rolePermissions,
};
