function requirePermission(permission) {
  return function permissionMiddleware(req, res, next) {
    if (!req.auth) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    const permissions = req.auth.permissions || [];
    if (permissions.includes('*') || permissions.includes(permission)) {
      return next();
    }
    return res.status(403).json({ error: 'Forbidden' });
  };
}

module.exports = {
  requirePermission,
};
