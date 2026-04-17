const { requireAuth } = require('../middleware/auth.middleware');
const { requirePermission } = require('../middleware/permission.middleware');
const { permissions } = require('../security/permissions');
const { prepareUpload } = require('../services/upload.service');

module.exports = (app) => {
  app.post('/api/uploads/prepare', requireAuth, requirePermission(permissions.dossier.create), async (req, res) => {
    const { originalFilename, mimeType } = req.body || {};
    if (!originalFilename) {
      return res.status(400).json({ error: 'originalFilename is required' });
    }
    const prepared = await prepareUpload({
      tenantId: req.auth.tenantId,
      originalFilename,
      mimeType,
    });
    return res.status(201).json(prepared);
  });
};
