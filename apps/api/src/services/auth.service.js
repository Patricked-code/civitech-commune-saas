const { findUserByEmail, listUsers } = require('../repositories/user.repository');
const { createUser } = require('../repositories/user-write.repository');
const { findTenantBySlug } = require('../repositories/tenant.repository');
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

function buildSession(user) {
  const publicUser = sanitizeUser(user);
  const token = signAccessToken({
    sub: user.id,
    email: user.email,
    tenantId: user.tenantId,
    roleCodes: user.roleCodes,
  });

  return { token, user: publicUser };
}

async function login(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await verifyPassword(password, user.passwordHash || user.password);
  if (!isValid) return null;

  return buildSession(user);
}

async function registerCitizen(payload) {
  const tenant = await findTenantBySlug(payload.tenantSlug || process.env.SEED_TENANT_SLUG || 'niakaramadougou');
  if (!tenant) {
    throw new Error('TENANT_NOT_FOUND');
  }

  const existing = await findUserByEmail(payload.email);
  if (existing) {
    throw new Error('USER_ALREADY_EXISTS');
  }

  const created = await createUser({
    tenantId: tenant.id,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    password: payload.password,
    roleCodes: ['citizen'],
    userType: 'citizen',
  });

  return buildSession(created);
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
  registerCitizen,
  logout,
  listDemoUsers,
};
