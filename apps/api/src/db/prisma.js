let prisma = null;

try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (error) {
  prisma = null;
}

function getPrismaClient() {
  return prisma;
}

module.exports = {
  getPrismaClient,
};
