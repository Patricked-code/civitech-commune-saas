const { requireAuth } = require('../middleware/auth.middleware');
const { requirePermission } = require('../middleware/permission.middleware');
const { permissions } = require('../security/permissions');
const {
  listDossiers,
  getDossierByReference,
  createDraftDossier,
  updateDraftDossier,
  moveDossierToNextStep,
  submitDraftDossier,
  addCommentToDossier,
  attachDocumentToDossier,
  changeAttachmentStatus,
} = require('../services/dossier.service');

function notFound(res) {
  return res.status(404).json({ error: 'DOSSIER_NOT_FOUND', message: 'Dossier not found or not accessible.' });
}

module.exports = (app) => {
  const asyncRoute = app.locals.asyncRoute || ((handler) => handler);

  app.get('/api/dossiers', requireAuth, requirePermission(permissions.dossier.read), asyncRoute(async (req, res) => {
    const data = await listDossiers(req.auth);
    return res.json({ data, total: data.length });
  }));

  app.get('/api/dossiers/:reference', requireAuth, requirePermission(permissions.dossier.read), asyncRoute(async (req, res) => {
    const dossier = await getDossierByReference(req.params.reference, req.auth);
    if (!dossier) return notFound(res);
    return res.json(dossier);
  }));

  app.post('/api/dossiers', requireAuth, requirePermission(permissions.dossier.create), asyncRoute(async (req, res) => {
    const { procedureId, procedureCode, service, formData } = req.body || {};
    if (!procedureId && !procedureCode) {
      return res.status(400).json({ error: 'PROCEDURE_REQUIRED', message: 'procedureId or procedureCode is required.' });
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
  }));

  app.put('/api/dossiers/:reference/draft', requireAuth, requirePermission(permissions.dossier.create), asyncRoute(async (req, res) => {
    const { formData } = req.body || {};
    if (!formData || typeof formData !== 'object') {
      return res.status(400).json({ error: 'FORM_DATA_REQUIRED', message: 'formData is required.' });
    }
    const dossier = await updateDraftDossier(req.params.reference, {
      actorUserId: req.auth.id,
      auth: req.auth,
      formData,
    });
    if (!dossier) return notFound(res);
    return res.json(dossier);
  }));

  app.post('/api/dossiers/:reference/submit', requireAuth, requirePermission(permissions.dossier.create), asyncRoute(async (req, res) => {
    const dossier = await submitDraftDossier(req.params.reference, {
      actorUserId: req.auth.id,
      auth: req.auth,
      comment: (req.body || {}).comment || 'Citizen submitted dossier',
    });
    if (!dossier) return notFound(res);
    return res.json(dossier);
  }));

  app.post('/api/dossiers/:reference/comments', requireAuth, requirePermission(permissions.dossier.read), asyncRoute(async (req, res) => {
    const { comment } = req.body || {};
    if (!comment) return res.status(400).json({ error: 'COMMENT_REQUIRED', message: 'comment is required.' });
    const event = await addCommentToDossier(req.params.reference, { actorUserId: req.auth.id, auth: req.auth, comment });
    if (!event) return notFound(res);
    return res.status(201).json(event);
  }));

  app.post('/api/dossiers/:reference/next-step', requireAuth, requirePermission(permissions.dossier.update), asyncRoute(async (req, res) => {
    const dossier = await moveDossierToNextStep(req.params.reference, {
      actorUserId: req.auth.id,
      auth: req.auth,
      comment: (req.body || {}).comment || '',
    });
    if (!dossier) return notFound(res);
    return res.json(dossier);
  }));

  app.post('/api/dossiers/:reference/attachments', requireAuth, requirePermission(permissions.dossier.create), asyncRoute(async (req, res) => {
    const { documentType, storageKey, originalFilename, mimeType } = req.body || {};
    if (!documentType || !storageKey || !originalFilename || !mimeType) {
      return res.status(400).json({ error: 'ATTACHMENT_FIELDS_REQUIRED', message: 'Attachment fields are required.' });
    }
    const document = await attachDocumentToDossier(req.params.reference, {
      actorUserId: req.auth.id,
      auth: req.auth,
      documentType,
      storageKey,
      originalFilename,
      mimeType,
    });
    if (!document) return notFound(res);
    return res.status(201).json(document);
  }));

  app.put('/api/dossiers/:reference/attachments/:documentId/status', requireAuth, requirePermission(permissions.dossier.validate), asyncRoute(async (req, res) => {
    const { validationStatus } = req.body || {};
    if (!validationStatus) return res.status(400).json({ error: 'VALIDATION_STATUS_REQUIRED', message: 'validationStatus is required.' });
    const document = await changeAttachmentStatus(req.params.reference, req.params.documentId, {
      actorUserId: req.auth.id,
      auth: req.auth,
      validationStatus,
    });
    if (!document) return res.status(404).json({ error: 'DOCUMENT_NOT_FOUND', message: 'Dossier or document not found.' });
    return res.json(document);
  }));
};
