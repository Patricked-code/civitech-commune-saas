const logger = require('../config/logger');

/**
 * Middleware centralisé de gestion des erreurs
 * Normalise toutes les réponses d'erreur de l'API
 */
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erreur interne du serveur';

  // Log l'erreur
  logger.error({
    message: message,
    statusCode: statusCode,
    path: req.path,
    method: req.method,
    userId: req.auth?.id || 'anonymous',
    tenantId: req.auth?.tenantId || 'unknown',
    stack: err.stack,
  });

  // Réponse normalisée
  res.status(statusCode).json({
    error: message,
    errorCode: err.code || 'INTERNAL_ERROR',
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

/**
 * Wrapper pour les routes async pour capturer les erreurs
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Classe personnalisée pour les erreurs API
 */
class ApiError extends Error {
  constructor(statusCode, message, code = 'API_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

module.exports = {
  errorHandler,
  asyncHandler,
  ApiError,
};
