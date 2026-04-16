const jwt = require('jsonwebtoken');

function getJwtSecret() {
  return process.env.JWT_SECRET || 'change_me_in_production';
}

function getJwtExpiresIn() {
  return process.env.JWT_EXPIRES_IN || '8h';
}

function signAccessToken(payload) {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: getJwtExpiresIn(),
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, getJwtSecret());
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
};
