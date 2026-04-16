const { rolePermissions } = require('../security/permissions');

function getPermissionsForRoles(roleCodes) {
  if (!roleCodes || roleCodes.length === 0) return [];
  if (roleCodes.includes('super_admin')) return ['*'];
  const set = new Set();
  roleCodes.forEach((roleCode) => {
    const values = rolePermissions[roleCode] || [];
    values.forEach((permission) => set.add(permission));
  });
  return Array.from(set);
}

function hasPermission(roleCodes, permission) {
  const permissions = getPermissionsForRoles(roleCodes);
  return permissions.includes('*') || permissions.includes(permission);
}

module.exports = {
  getPermissionsForRoles,
  hasPermission,
};
