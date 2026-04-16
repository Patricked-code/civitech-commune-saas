const { findUserByEmail, listUsers } = require('../repositories/user.repository');
const { getPermissionsForRoles } = require('./rbac.service');
const { verifyPassword } = require('../security/password');
const { signAccessToken } = require('../security/jwt');

function sanitizeUser(user) {
  return {
    id: user.id,
    tenantId: user.tenantId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roleCodes: user.roleCodes,
    userType: user.userType,
    permissions: getPermissionsForRoles(user.roleCodes),
  };
}

async function login(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await verifyPassword(password, user.passwordHash || user.password);
  if (!isValid) return null;

  const publicUser = sanitizeUser(user);
  const token = signAccessToken({
    sub: user.id,
    email: user.email,
    tenantId: user.tenantId,
    roleCodes: user.roleCodes,
  });

  return { token, user: publicUser };
}

function logout() {
  return true;
}

async function listDemoUsers() {
  const users = await listUsers();
  return users.map((item) => sanitizeUser(item));
}

module.exports = {
  login,
  logout,
  listDemoUsers,
};
