const { verifyAccessToken } = require('../security/jwt');
const { findUserByEmail } = require('../repositories/user.repository');
const { getPermissionsForRoles } = require('../services/rbac.service');

function parseBearerToken(authorizationHeader) {
  if (!authorizationHeader) return null;
  const [scheme, token] = authorizationHeader.split(' ');
  if (scheme !== 'Bearer' || !token) return null;
  return token;
}

async function requireAuth(req, res, next) {
  const token = parseBearerToken(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const payload = verifyAccessToken(token);
    const user = await findUserByEmail(payload.email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    req.auth = {
      id: user.id,
      tenantId: user.tenantId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roleCodes: user.roleCodes,
      userType: user.userType,
      permissions: getPermissionsForRoles(user.roleCodes),
    };
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = {
  requireAuth,
  parseBearerToken,
};
