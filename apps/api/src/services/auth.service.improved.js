const { findUserByEmail, listUsers } = require('../repositories/user.repository');
const { createUser } = require('../repositories/user-write.repository');
const { findTenantBySlug } = require('../repositories/tenant.repository');
const { getPermissionsForRoles } = require('./rbac.service');
const { verifyPassword } = require('../security/password');
const { signAccessToken } = require('../security/jwt');
const { LoginSchema, RegisterSchema } = require('../security/validation');
const logger = require('../config/logger');

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
  try {
    // Validation des entrées
    const validated = LoginSchema.parse({ email, password });

    const user = await findUserByEmail(validated.email);
    if (!user) {
      logger.warn({ email: validated.email, message: 'Login attempt for non-existent user' });
      return null;
    }

    const isValid = await verifyPassword(validated.password, user.passwordHash || user.password);
    if (!isValid) {
      logger.warn({ email: validated.email, userId: user.id, message: 'Invalid password attempt' });
      return null;
    }

    logger.info({ userId: user.id, email: validated.email, message: 'User login successful' });
    return buildSession(user);
  } catch (error) {
    logger.error({ error: error.message, message: 'Login error' });
    throw error;
  }
}

async function registerCitizen(payload) {
  try {
    // Validation des entrées
    const validated = RegisterSchema.parse(payload);

    const tenant = await findTenantBySlug(validated.tenantSlug || process.env.SEED_TENANT_SLUG || 'niakaramadougou');
    if (!tenant) {
      logger.error({ tenantSlug: validated.tenantSlug, message: 'Tenant not found during registration' });
      throw new Error('TENANT_NOT_FOUND');
    }

    const existing = await findUserByEmail(validated.email);
    if (existing) {
      logger.warn({ email: validated.email, message: 'Registration attempt with existing email' });
      throw new Error('USER_ALREADY_EXISTS');
    }

    const created = await createUser({
      tenantId: tenant.id,
      email: validated.email,
      firstName: validated.firstName,
      lastName: validated.lastName,
      password: validated.password,
      roleCodes: ['citizen'],
      userType: 'citizen',
    });

    logger.info({ userId: created.id, email: validated.email, message: 'New citizen registered' });
    return buildSession(created);
  } catch (error) {
    logger.error({ error: error.message, message: 'Registration error' });
    throw error;
  }
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
