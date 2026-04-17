const { requireAuth } = require('../middleware/auth.middleware');
const { requirePermission } = require('../middleware/permission.middleware');
const { permissions } = require('../security/permissions');
const {
  listPrioritizedQueue,
  listPendingDocuments,
  addAgentInternalComment,
  validateDocument,
} = require('../services/agent-queue.service');

module.exports = (app) => {
  app.get('/api/agent/queue', requireAuth, requirePermission(permissions.dossier.update), async (req, res) => {
    const data = await listPrioritizedQueue({
      status: req.query.status,
      procedureCode: req.query.procedureCode,
    });
    return res.json({ data, total: data.length });
  });

  app.get('/api/agent/documents', requireAuth, requirePermission(permissions.dossier.validate), async (req, res) => {
    const data = await listPendingDocuments();
    return res.json({ data, total: data.length });
  });

  app.post('/api/agent/dossiers/:reference/internal-comments', requireAuth, requirePermission(permissions.dossier.update), async (req, res) => {
    const { comment } = req.body || {};
    if (!comment) return res.status(400).json({ error: 'comment is required' });
    const event = await addAgentInternalComment(req.params.reference, {
      actorUserId: req.auth.id,
      comment,
    });
    if (!event) return res.status(404).json({ error: 'Dossier not found' });
    return res.status(201).json(event);
  });

  app.put('/api/agent/dossiers/:reference/documents/:documentId/status', requireAuth, requirePermission(permissions.dossier.validate), async (req, res) => {
    const { validationStatus } = req.body || {};
    if (!validationStatus) return res.status(400).json({ error: 'validationStatus is required' });
    const document = await validateDocument(req.params.reference, req.params.documentId, {
      actorUserId: req.auth.id,
      validationStatus,
    });
    if (!document) return res.status(404).json({ error: 'Dossier or document not found' });
    return res.json(document);
  });
};
