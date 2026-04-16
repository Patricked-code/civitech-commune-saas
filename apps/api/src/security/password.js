const bcrypt = require('bcryptjs');

async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
}

async function verifyPassword(plainPassword, passwordHash) {
  if (!passwordHash) return false;
  if (passwordHash.startsWith('$2a$') || passwordHash.startsWith('$2b$') || passwordHash.startsWith('$2y$')) {
    return bcrypt.compare(plainPassword, passwordHash);
  }
  return plainPassword === passwordHash;
}

module.exports = {
  hashPassword,
  verifyPassword,
};
