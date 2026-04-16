const { requireAuth } = require('../middleware/auth.middleware');
const { requirePermission } = require('../middleware/permission.middleware');
const { permissions } = require('../security/permissions');
const { listUsers, createUser, updateUserByEmail, deleteUserByEmail, listRoles } = require('../services/admin.service');

module.exports = (app) => {
  app.get('/api/admin/users', requireAuth, requirePermission(permissions.admin.users), async (req, res) => {
    const data = await listUsers();
    return res.json({ data, total: data.length });
  });

  app.post('/api/admin/users', requireAuth, requirePermission(permissions.admin.users), async (req, res) => {
    const { email, firstName, lastName, password, roleCodes, userType } = req.body || {};
    if (!email || !firstName || !lastName) {
      return res.status(400).json({ error: 'email, firstName and lastName are required' });
    }
    const created = await createUser({ tenantId: req.auth.tenantId, email, firstName, lastName, password, roleCodes, userType });
    return res.status(201).json(created);
  });

  app.put('/api/admin/users/:email', requireAuth, requirePermission(permissions.admin.users), async (req, res) => {
    const updated = await updateUserByEmail(req.params.email, req.body || {});
    if (!updated) return res.status(404).json({ error: 'User not found' });
    return res.json(updated);
  });

  app.delete('/api/admin/users/:email', requireAuth, requirePermission(permissions.admin.users), async (req, res) => {
    const deleted = await deleteUserByEmail(req.params.email);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    return res.json({ success: true });
  });

  app.get('/api/admin/roles', requireAuth, requirePermission(permissions.admin.roles), async (req, res) => {
    const data = await listRoles(req.auth.tenantId);
    return res.json({ data, total: data.length });
  });
};
