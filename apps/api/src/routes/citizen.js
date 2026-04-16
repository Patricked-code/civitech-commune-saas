const { requireAuth } = require('../middleware/auth.middleware');
const { listCitizenDossiers } = require('../services/dossier.service');

module.exports = (app) => {
  app.get('/api/citizen/dashboard', requireAuth, async (req, res) => {
    const dossiers = await listCitizenDossiers(req.auth.id);
    const total = dossiers.length;
    const drafts = dossiers.filter((item) => item.status === 'draft').length;
    const submitted = dossiers.filter((item) => item.status === 'submitted').length;
    const inProgress = dossiers.filter((item) => item.status === 'in_review').length;

    return res.json({
      summary: {
        total,
        drafts,
        submitted,
        inProgress,
      },
      dossiers,
    });
  });
};
