const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { appConfig } = require('./src/config/appConfig');

const app = express();
const port = process.env.PORT || 3005;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

require('./src/routes/auth')(app);
require('./src/routes/commune')(app);
require('./src/routes/dossiers')(app);
require('./src/routes/citizen')(app);
require('./src/routes/admin')(app);
require('./src/routes/admin-users')(app);
require('./src/routes/admin-procedure-mutations')(app);

app.get('/health', (req, res) => {
  res.json({
    app: appConfig.appName,
    version: appConfig.apiVersion,
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/system/info', (req, res) => {
  res.json({
    app: appConfig.appName,
    version: appConfig.apiVersion,
    tenantMode: appConfig.tenantMode,
    seedTenant: appConfig.seedTenant,
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvee' });
});

app.listen(port, () => {
  console.log(`Civitech Commune API listening on ${port}`);
});
