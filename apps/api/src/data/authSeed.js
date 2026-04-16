const users = [
  {
    id: 'user-citizen-1',
    tenantId: 'tenant-niakara',
    email: 'citoyen@niakara.ci',
    password: 'demo1234',
    firstName: 'Awa',
    lastName: 'Kone',
    roleCodes: ['citizen'],
    userType: 'citizen',
  },
  {
    id: 'user-agent-1',
    tenantId: 'tenant-niakara',
    email: 'agent.etatcivil@niakara.ci',
    password: 'demo1234',
    firstName: 'Mariam',
    lastName: 'Traore',
    roleCodes: ['agent'],
    userType: 'agent',
  },
  {
    id: 'user-admin-1',
    tenantId: 'tenant-niakara',
    email: 'admin@niakara.ci',
    password: 'demo1234',
    firstName: 'Eric',
    lastName: 'Admin',
    roleCodes: ['commune_admin'],
    userType: 'admin',
  },
];

module.exports = {
  users,
};
