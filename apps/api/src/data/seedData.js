const tenant = {
  id: 'tenant-niakara',
  slug: 'niakaramadougou',
  name: 'Niakaramadougou',
  country: 'Cote d Ivoire',
  timezone: 'Africa/Abidjan',
};

const modules = [
  'public-portal',
  'citizen-space',
  'admin-cockpit',
  'procedure-catalogue',
  'workflow-engine',
  'document-foundation',
  'payments-foundation',
];

const procedures = [
  {
    id: 'naissance',
    code: 'STATE_CIVIL_BIRTH',
    title: 'Declaration de naissance',
    domain: 'Etat civil',
    feeAmount: 1500,
    status: 'active',
    estimatedDelayDays: 3,
    steps: ['submitted', 'qualified', 'checked', 'validated', 'issued', 'archived'],
  },
  {
    id: 'deces',
    code: 'STATE_CIVIL_DEATH',
    title: 'Declaration de deces',
    domain: 'Etat civil',
    feeAmount: 1500,
    status: 'active',
    estimatedDelayDays: 3,
    steps: ['submitted', 'qualified', 'checked', 'validated', 'issued', 'archived'],
  },
  {
    id: 'copie-acte',
    code: 'STATE_CIVIL_COPY',
    title: 'Demande de copie d acte',
    domain: 'Etat civil',
    feeAmount: 1000,
    status: 'active',
    estimatedDelayDays: 2,
    steps: ['submitted', 'searched', 'printed', 'available', 'delivered', 'archived'],
  },
  {
    id: 'mariage',
    code: 'STATE_CIVIL_MARRIAGE',
    title: 'Organisation de mariage',
    domain: 'Etat civil',
    feeAmount: 5000,
    status: 'preview',
    estimatedDelayDays: 10,
    steps: ['submitted', 'checked', 'scheduled', 'validated', 'celebrated', 'archived'],
  },
];

const dossiers = [
  {
    reference: 'NIC-2026-00021',
    procedureId: 'naissance',
    status: 'checked',
    progress: 60,
    currentStep: 'checked',
    service: 'Etat civil',
  },
  {
    reference: 'NIC-2026-00017',
    procedureId: 'copie-acte',
    status: 'available',
    progress: 100,
    currentStep: 'available',
    service: 'Etat civil',
  },
  {
    reference: 'NIC-2026-00009',
    procedureId: 'deces',
    status: 'waiting-citizen',
    progress: 35,
    currentStep: 'qualified',
    service: 'Etat civil',
  },
];

module.exports = {
  tenant,
  modules,
  procedures,
  dossiers,
};
