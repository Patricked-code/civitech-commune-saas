const { getSession } = require('../services/auth.service');

function parseBearerToken(authorizationHeader) {
  if (!authorizationHeader) return null;
  const [scheme, token] = authorizationHeader.split(' ');
  if (scheme !== 'Bearer' || !token) return null;
  return token;
}

function requireAuth(req, res, next) {
  const token = parseBearerToken(req.headers.authorization);
  const session = getSession(token);
  if (!session) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  req.auth = session;
  req.token = token;
  next();
}

module.exports = {
  requireAuth,
  parseBearerToken,
};
