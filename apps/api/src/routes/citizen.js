const { requireAuth } = require('../middleware/auth.middleware');
const { listCitizenDossiers } = require('../services/dossier.service');

module.exports = (app) => {
  // Citizen Dashboard
  app.get('/api/citizen/dashboard', requireAuth, app.locals.asyncRoute(async (req, res) => {
    try {
      const dossiers = await listCitizenDossiers(req.auth.id);
      
      const summary = {
        total: dossiers.length,
        drafts: dossiers.filter((item) => item.status === 'draft').length,
        submitted: dossiers.filter((item) => item.status === 'submitted').length,
        inProgress: dossiers.filter((item) => item.status === 'in_review').length,
      };

      return res.json({
        success: true,
        summary,
        dossiers: dossiers.map(d => ({
          id: d.id,
          reference: d.reference,
          status: d.status,
          type: d.procedureTitle || d.procedureCode,
          citizen: req.auth.email,
          date: d.createdAt,
          daysRemaining: Math.max(0, Math.ceil((new Date(d.deadline) - new Date()) / (1000 * 60 * 60 * 24)))
        }))
      });
    } catch (error) {
      console.error('Citizen dashboard error:', error);
      res.status(500).json({
        success: false,
        error: 'Impossible de charger le tableau de bord citoyen',
        message: error.message
      });
    }
  }));

  // Get citizen notifications
  app.get('/api/citizen/notifications', requireAuth, app.locals.asyncRoute(async (req, res) => {
    try {
      res.json({
        success: true,
        notifications: []
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des notifications'
      });
    }
  }));

  // Get citizen messages
  app.get('/api/citizen/messages', requireAuth, app.locals.asyncRoute(async (req, res) => {
    try {
      res.json({
        success: true,
        messages: []
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des messages'
      });
    }
  }));
};
