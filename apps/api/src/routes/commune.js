const { appConfig } = require('../config/appConfig');
const { getTenantProfile } = require('../services/tenant.service');
const {
  listProcedures,
  getProcedureById,
  getDashboardStats,
} = require('../services/procedure.service');
const { listDossiers } = require('../services/dossier.service');

module.exports = (app) => {
  app.get('/api/commune/health', (req, res) => {
    res.json({
      module: appConfig.appName,
      version: appConfig.apiVersion,
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/commune/portal-config', async (req, res) => {
    const profile = await getTenantProfile();
    res.json(profile);
  });

  app.get('/api/commune/demarches', async (req, res) => {
    const data = await listProcedures();
    res.json({ data, total: data.length });
  });

  app.get('/api/commune/demarches/:id', async (req, res) => {
    const procedure = await getProcedureById(req.params.id);
    if (!procedure) {
      return res.status(404).json({ error: 'Procedure not found' });
    }
    return res.json(procedure);
  });

  app.get('/api/commune/statistiques', async (req, res) => {
    res.json(await getDashboardStats());
  });

  app.get('/api/commune/dossiers-demo', async (req, res) => {
    const data = await listDossiers();
    res.json({ data, total: data.length });
  });
};
