const { getPrismaClient } = require('../db/prisma');
const { users } = require('../data/authSeed');

function mapSeedUser(user) {
  return {
    id: user.id,
    tenantId: user.tenantId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userType: user.userType,
    roleCodes: user.roleCodes,
    password: user.password,
  };
}

async function findUserByEmail(email) {
  const prisma = getPrismaClient();
  if (!prisma) {
    const user = users.find((item) => item.email === email);
    return user ? mapSeedUser(user) : null;
  }

  const record = await prisma.user.findFirst({
    where: { email },
    include: {
      userRoles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!record) return null;

  return {
    id: record.id,
    tenantId: record.tenantId,
    email: record.email,
    firstName: record.firstName,
    lastName: record.lastName,
    userType: record.userType,
    roleCodes: record.userRoles.map((item) => item.role.code),
    password: null,
    passwordHash: record.passwordHash,
  };
}

async function listUsers() {
  const prisma = getPrismaClient();
  if (!prisma) {
    return users.map(mapSeedUser);
  }

  const records = await prisma.user.findMany({
    include: {
      userRoles: {
        include: {
          role: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  return records.map((record) => ({
    id: record.id,
    tenantId: record.tenantId,
    email: record.email,
    firstName: record.firstName,
    lastName: record.lastName,
    userType: record.userType,
    roleCodes: record.userRoles.map((item) => item.role.code),
    password: null,
    passwordHash: record.passwordHash,
  }));
}

module.exports = {
  findUserByEmail,
  listUsers,
};
