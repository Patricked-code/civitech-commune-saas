const { requireAuth } = require('../middleware/auth.middleware');
const { requirePermission } = require('../middleware/permission.middleware');
const { permissions } = require('../security/permissions');
const {
  listUsers,
  createUser,
  listProcedures,
  createProcedure,
  updateProcedureByCode,
  deleteProcedureByCode,
  listDossiers,
  getAdminSnapshot,
} = require('../services/admin.service');

module.exports = (app) => {
  app.get('/api/admin/summary', requireAuth, requirePermission(permissions.admin.dashboard), async (req, res) => {
    return res.json(await getAdminSnapshot());
  });

  app.get('/api/admin/users', requireAuth, requirePermission(permissions.admin.users), async (req, res) => {
    const data = await listUsers();
    return res.json({ data, total: data.length });
  });

  app.post('/api/admin/users', requireAuth, requirePermission(permissions.admin.users), async (req, res) => {
    const { email, firstName, lastName, password, roleCodes, userType } = req.body || {};
    if (!email || !firstName || !lastName) {
      return res.status(400).json({ error: 'email, firstName and lastName are required' });
    }
    const created = await createUser({
      tenantId: req.auth.tenantId,
      email,
      firstName,
      lastName,
      password,
      roleCodes,
      userType,
    });
    return res.status(201).json(created);
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

  app.put('/api/admin/procedures/:code', requireAuth, requirePermission(permissions.procedure.manage), async (req, res) => {
    const updated = await updateProcedureByCode(req.params.code, req.body || {});
    if (!updated) {
      return res.status(404).json({ error: 'Procedure not found' });
    }
    return res.json(updated);
  });

  app.delete('/api/admin/procedures/:code', requireAuth, requirePermission(permissions.procedure.manage), async (req, res) => {
    const deleted = await deleteProcedureByCode(req.params.code);
    if (!deleted) {
      return res.status(404).json({ error: 'Procedure not found' });
    }
    return res.json({ success: true });
  });

  app.get('/api/admin/dossiers', requireAuth, requirePermission(permissions.admin.dashboard), async (req, res) => {
    const data = await listDossiers();
    return res.json({ data, total: data.length });
  });
};
