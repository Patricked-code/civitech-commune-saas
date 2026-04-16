const { appConfig } = require('../config/appConfig');
const { getTenantProfile } = require('../services/tenant.service');
const {
  listProcedures,
  getProcedureById,
  listDossiers,
  getDashboardStats,
} = require('../services/procedure.service');

module.exports = (app) => {
  app.get('/api/commune/health', (req, res) => {
    res.json({
      module: appConfig.appName,
      version: appConfig.apiVersion,
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/commune/portal-config', (req, res) => {
    res.json(getTenantProfile());
  });

  app.get('/api/commune/demarches', (req, res) => {
    const data = listProcedures();
    res.json({ data, total: data.length });
  });

  app.get('/api/commune/demarches/:id', (req, res) => {
    const procedure = getProcedureById(req.params.id);
    if (!procedure) {
      return res.status(404).json({ error: 'Procedure not found' });
    }
    return res.json(procedure);
  });

  app.get('/api/commune/statistiques', (req, res) => {
    res.json(getDashboardStats());
  });

  app.get('/api/commune/dossiers-demo', (req, res) => {
    const data = listDossiers();
    res.json({ data, total: data.length });
  });
};
