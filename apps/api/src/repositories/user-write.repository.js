const { getPrismaClient } = require('../db/prisma');
const { users } = require('../data/authSeed');
const { hashPassword } = require('../security/password');
const { findRolesByCodes } = require('./role.repository');

async function createUser(payload) {
  const passwordHash = await hashPassword(payload.password || 'demo1234');
  const prisma = getPrismaClient();
  const roleCodes = payload.roleCodes && payload.roleCodes.length ? payload.roleCodes : ['citizen'];

  if (!prisma) {
    const user = {
      id: 'user-' + Date.now(),
      tenantId: payload.tenantId,
      email: payload.email,
      password: payload.password || 'demo1234',
      passwordHash,
      firstName: payload.firstName,
      lastName: payload.lastName,
      roleCodes,
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

  const roles = await findRolesByCodes(payload.tenantId, roleCodes);
  for (const role of roles) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: record.id, roleId: role.id } },
      update: {},
      create: { userId: record.id, roleId: role.id },
    });
  }

  return {
    id: record.id,
    tenantId: record.tenantId,
    email: record.email,
    firstName: record.firstName,
    lastName: record.lastName,
    roleCodes,
    userType: record.userType,
  };
}

async function updateUserByEmail(email, payload) {
  const prisma = getPrismaClient();

  if (!prisma) {
    const index = users.findIndex((item) => item.email === email);
    if (index === -1) return null;
    users[index] = {
      ...users[index],
      firstName: payload.firstName || users[index].firstName,
      lastName: payload.lastName || users[index].lastName,
      userType: payload.userType || users[index].userType,
      roleCodes: payload.roleCodes || users[index].roleCodes,
    };
    return users[index];
  }

  const existing = await prisma.user.findFirst({ where: { email } });
  if (!existing) return null;

  const updated = await prisma.user.update({
    where: { id: existing.id },
    data: {
      firstName: payload.firstName ?? existing.firstName,
      lastName: payload.lastName ?? existing.lastName,
      userType: payload.userType ?? existing.userType,
    },
  });

  return {
    id: updated.id,
    tenantId: updated.tenantId,
    email: updated.email,
    firstName: updated.firstName,
    lastName: updated.lastName,
    roleCodes: payload.roleCodes || [],
    userType: updated.userType,
  };
}

async function deleteUserByEmail(email) {
  const prisma = getPrismaClient();

  if (!prisma) {
    const index = users.findIndex((item) => item.email === email);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }

  const existing = await prisma.user.findFirst({ where: { email } });
  if (!existing) return false;
  await prisma.user.delete({ where: { id: existing.id } });
  return true;
}

module.exports = {
  createUser,
  updateUserByEmail,
  deleteUserByEmail,
};
