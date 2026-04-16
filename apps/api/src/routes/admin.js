const { requireAuth } = require('../middleware/auth.middleware');
const { requirePermission } = require('../middleware/permission.middleware');
const { permissions } = require('../security/permissions');
const { listUsers, listProcedures, createProcedure, listDossiers, getAdminSnapshot } = require('../services/admin.service');

module.exports = (app) => {
  app.get('/api/admin/summary', requireAuth, requirePermission(permissions.admin.dashboard), async (req, res) => {
    return res.json(await getAdminSnapshot());
  });

  app.get('/api/admin/users', requireAuth, requirePermission(permissions.admin.users), async (req, res) => {
    const data = await listUsers();
    return res.json({ data, total: data.length });
  });

  app.get('/api/admin/procedures', requireAuth, requirePermission(permissions.procedure.manage), async (req, res) => {
    const data = await listProcedures();
    return res.json({ data, total: data.length });
  });

  app.post('/api/admin/procedures', requireAuth, requirePermission(permissions.procedure.manage), async (req, res) => {
    const { code, title, category, feeAmount, estimatedDelayDays } = req.body || {};
    if (!code || !title || !category) {
      return res.status(400).json({ error: 'code, title and category are required' });
    }
    const created = await createProcedure({
      tenantId: req.auth.tenantId,
      code,
      title,
      category,
      feeAmount,
      estimatedDelayDays,
    });
    return res.status(201).json(created);
  });

  app.get('/api/admin/dossiers', requireAuth, requirePermission(permissions.admin.dashboard), async (req, res) => {
    const data = await listDossiers();
    return res.json({ data, total: data.length });
  });
};
