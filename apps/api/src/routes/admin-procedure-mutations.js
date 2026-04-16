const { requireAuth } = require('../middleware/auth.middleware');
const { requirePermission } = require('../middleware/permission.middleware');
const { permissions } = require('../security/permissions');
const { createProcedure, updateProcedureByCode, deleteProcedureByCode } = require('../services/admin.service');

module.exports = (app) => {
  app.post('/api/admin/procedures', requireAuth, requirePermission(permissions.procedure.manage), async (req, res) => {
    const { code, title, category, feeAmount, estimatedDelayDays } = req.body || {};
    if (!code || !title || !category) return res.status(400).json({ error: 'code, title and category are required' });
    const created = await createProcedure({ tenantId: req.auth.tenantId, code, title, category, feeAmount, estimatedDelayDays });
    return res.status(201).json(created);
  });

  app.put('/api/admin/procedures/:code', requireAuth, requirePermission(permissions.procedure.manage), async (req, res) => {
    const updated = await updateProcedureByCode(req.params.code, req.body || {});
    if (!updated) return res.status(404).json({ error: 'Procedure not found' });
    return res.json(updated);
  });

  app.delete('/api/admin/procedures/:code', requireAuth, requirePermission(permissions.procedure.manage), async (req, res) => {
    const deleted = await deleteProcedureByCode(req.params.code);
    if (!deleted) return res.status(404).json({ error: 'Procedure not found' });
    return res.json({ success: true });
  });
};
