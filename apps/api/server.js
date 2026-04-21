const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { appConfig } = require('./src/config/appConfig');

const app = express();
const port = process.env.PORT || 3005;

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (!appConfig.corsAllowedOrigins.length || appConfig.corsAllowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS origin not allowed'));
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  optionsSuccessStatus: 204,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

require('./src/routes/auth')(app);
require('./src/routes/commune')(app);
require('./src/routes/dossiers')(app);
require('./src/routes/citizen')(app);
require('./src/routes/agent-secure')(app);
require('./src/routes/uploads')(app);
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
    canonicalWebOrigin: appConfig.canonicalWebOrigin,
    alternateWebOrigin: appConfig.alternateWebOrigin,
    corsAllowedOrigins: appConfig.corsAllowedOrigins,
  });
});

app.use((error, req, res, next) => {
  if (error && error.message === 'CORS origin not allowed') {
    return res.status(403).json({ error: 'CORS origin not allowed' });
  }
  return next(error);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvee' });
});

app.listen(port, () => {
  console.log(`Civitech Commune API listening on ${port}`);
});
