const { requireAuth } = require('../middleware/auth.middleware');
const {
  listDossiers,
  getDossierByReference,
  createDraftDossier,
  moveDossierToNextStep,
  submitDraftDossier,
  addCommentToDossier,
  attachDocumentToDossier,
  changeAttachmentStatus,
} = require('../services/dossier.service');

module.exports = (app) => {
  app.get('/api/dossiers', requireAuth, async (req, res) => {
    const data = await listDossiers();
    return res.json({ data, total: data.length });
  });

  app.get('/api/dossiers/:reference', requireAuth, async (req, res) => {
    const dossier = await getDossierByReference(req.params.reference);
    if (!dossier) {
      return res.status(404).json({ error: 'Dossier not found' });
    }
    return res.json(dossier);
  });

  app.post('/api/dossiers', requireAuth, async (req, res) => {
    const { procedureId, procedureCode, service, formData } = req.body || {};
    if (!procedureId && !procedureCode) {
      return res.status(400).json({ error: 'procedureId or procedureCode is required' });
    }
    const dossier = await createDraftDossier({
      procedureId,
      procedureCode,
      service,
      formData,
      tenantId: req.auth.tenantId,
      citizenUserId: req.auth.id,
    });
    return res.status(201).json(dossier);
  });

  app.post('/api/dossiers/:reference/submit', requireAuth, async (req, res) => {
    const dossier = await submitDraftDossier(req.params.reference, {
      actorUserId: req.auth.id,
      comment: (req.body || {}).comment || 'Citizen submitted dossier',
    });
    if (!dossier) return res.status(404).json({ error: 'Dossier not found' });
    return res.json(dossier);
  });

  app.post('/api/dossiers/:reference/comments', requireAuth, async (req, res) => {
    const { comment } = req.body || {};
    if (!comment) return res.status(400).json({ error: 'comment is required' });
    const event = await addCommentToDossier(req.params.reference, { actorUserId: req.auth.id, comment });
    if (!event) return res.status(404).json({ error: 'Dossier not found' });
    return res.status(201).json(event);
  });

  app.post('/api/dossiers/:reference/next-step', requireAuth, async (req, res) => {
    const dossier = await moveDossierToNextStep(req.params.reference, {
      actorUserId: req.auth.id,
      comment: (req.body || {}).comment || '',
    });
    if (!dossier) {
      return res.status(404).json({ error: 'Dossier not found' });
    }
    return res.json(dossier);
  });

  app.post('/api/dossiers/:reference/attachments', requireAuth, async (req, res) => {
    const { documentType, storageKey, originalFilename, mimeType } = req.body || {};
    if (!documentType || !storageKey || !originalFilename || !mimeType) {
      return res.status(400).json({ error: 'documentType, storageKey, originalFilename and mimeType are required' });
    }
    const document = await attachDocumentToDossier(req.params.reference, {
      actorUserId: req.auth.id,
      documentType,
      storageKey,
      originalFilename,
      mimeType,
    });
    if (!document) {
      return res.status(404).json({ error: 'Dossier not found' });
    }
    return res.status(201).json(document);
  });

  app.put('/api/dossiers/:reference/attachments/:documentId/status', requireAuth, async (req, res) => {
    const { validationStatus } = req.body || {};
    if (!validationStatus) return res.status(400).json({ error: 'validationStatus is required' });
    const document = await changeAttachmentStatus(req.params.reference, req.params.documentId, {
      actorUserId: req.auth.id,
      validationStatus,
    });
    if (!document) return res.status(404).json({ error: 'Dossier or document not found' });
    return res.json(document);
  });
};
