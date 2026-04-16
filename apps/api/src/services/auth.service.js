const crypto = require('crypto');
const { findUserByEmail, listUsers } = require('../repositories/user.repository');
const { getPermissionsForRoles } = require('./rbac.service');

const activeSessions = new Map();

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

  const isValid = user.password ? user.password === password : user.passwordHash === password;
  if (!isValid) return null;

  const token = crypto.randomBytes(24).toString('hex');
  const publicUser = sanitizeUser(user);
  activeSessions.set(token, publicUser);
  return { token, user: publicUser };
}

function getSession(token) {
  if (!token) return null;
  return activeSessions.get(token) || null;
}

function logout(token) {
  if (!token) return false;
  return activeSessions.delete(token);
}

async function listDemoUsers() {
  const users = await listUsers();
  return users.map((item) => sanitizeUser(item));
}

module.exports = {
  login,
  getSession,
  logout,
  listDemoUsers,
};
