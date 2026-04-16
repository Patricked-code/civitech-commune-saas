const { getPrismaClient } = require('../db/prisma');
const { users } = require('../data/authSeed');
const { hashPassword } = require('../security/password');

async function createUser(payload) {
  const passwordHash = await hashPassword(payload.password || 'demo1234');
  const prisma = getPrismaClient();

  if (!prisma) {
    const user = {
      id: 'user-' + Date.now(),
      tenantId: payload.tenantId,
      email: payload.email,
      password: payload.password || 'demo1234',
      passwordHash,
      firstName: payload.firstName,
      lastName: payload.lastName,
      roleCodes: payload.roleCodes || ['citizen'],
      userType: payload.userType || 'citizen',
    };
    users.push(user);
    return user;
  }

  const record = await prisma.user.create({
    data: {
      tenantId: payload.tenantId,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      userType: payload.userType || 'citizen',
      passwordHash,
      status: 'ACTIVE',
    },
  });

  return {
    id: record.id,
    tenantId: record.tenantId,
    email: record.email,
    firstName: record.firstName,
    lastName: record.lastName,
    roleCodes: payload.roleCodes || ['citizen'],
    userType: record.userType,
  };
}

module.exports = {
  createUser,
};
