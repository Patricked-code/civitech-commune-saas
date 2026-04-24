const bcrypt = require('bcryptjs');
const { appConfig } = require('../config/appConfig');

async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
}

async function verifyPassword(plainPassword, passwordHash) {
  if (!passwordHash) return false;
  if (passwordHash.startsWith('$2a$') || passwordHash.startsWith('$2b$') || passwordHash.startsWith('$2y$')) {
    return bcrypt.compare(plainPassword, passwordHash);
  }

  if (appConfig.isProduction) {
    return false;
  }

  return plainPassword === passwordHash;
}

module.exports = {
  hashPassword,
  verifyPassword,
};
