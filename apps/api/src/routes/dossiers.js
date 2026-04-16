const { requireAuth } = require('../middleware/auth.middleware');
const { listDossiers, getDossierByReference, createDraftDossier } = require('../services/dossier.service');

module.exports = (app) => {
  app.get('/api/dossiers', requireAuth, (req, res) => {
    const data = listDossiers();
    return res.json({ data, total: data.length });
  });

  app.get('/api/dossiers/:reference', requireAuth, (req, res) => {
    const dossier = getDossierByReference(req.params.reference);
    if (!dossier) {
      return res.status(404).json({ error: 'Dossier not found' });
    }
    return res.json(dossier);
  });

  app.post('/api/dossiers', requireAuth, (req, res) => {
    const { procedureId, service } = req.body || {};
    if (!procedureId) {
      return res.status(400).json({ error: 'procedureId is required' });
    }
    const dossier = createDraftDossier({ procedureId, service });
    return res.status(201).json(dossier);
  });
};
