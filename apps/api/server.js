const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { appConfig, assertProductionConfig } = require('./src/config/appConfig');

assertProductionConfig();

const app = express();
const port = process.env.PORT || 3005;

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (appConfig.corsAllowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS origin not allowed'));
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  optionsSuccessStatus: 204,
};

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(appConfig.isProduction ? 'combined' : 'dev'));

function asyncRoute(handler) {
  return function wrappedRoute(req, res, next) {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

app.locals.asyncRoute = asyncRoute;

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
    env: appConfig.env,
    tenantMode: appConfig.tenantMode,
    seedTenant: appConfig.seedTenant,
    canonicalWebOrigin: appConfig.canonicalWebOrigin,
    alternateWebOrigin: appConfig.alternateWebOrigin,
    apiPublicOrigin: appConfig.apiPublicOrigin,
    corsAllowedOrigins: appConfig.corsAllowedOrigins,
  });
});

app.use((error, req, res, next) => {
  if (error && error.message === 'CORS origin not allowed') {
    return res.status(403).json({
      error: 'CORS_ORIGIN_NOT_ALLOWED',
      message: 'Cette origine web n est pas autorisee a appeler l API Civitech Commune.',
    });
  }
  return next(error);
});

app.use((req, res) => {
  res.status(404).json({
    error: 'ROUTE_NOT_FOUND',
    message: 'Route API non trouvee.',
    path: req.path,
  });
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || error.status || 500;
  const safeStatusCode = statusCode >= 400 && statusCode < 600 ? statusCode : 500;
  const isClientError = safeStatusCode < 500;

  if (!isClientError) {
    console.error('[api:error]', {
      path: req.path,
      method: req.method,
      message: error.message,
      stack: error.stack,
    });
  }

  return res.status(safeStatusCode).json({
    error: error.code || (isClientError ? 'REQUEST_ERROR' : 'INTERNAL_SERVER_ERROR'),
    message: isClientError ? error.message : 'Une erreur technique est survenue. Veuillez reessayer ou contacter la mairie.',
  });
});

app.listen(port, () => {
  console.log(`Civitech Commune API listening on ${port}`);
  console.log(`Canonical web origin: ${appConfig.canonicalWebOrigin}`);
});
