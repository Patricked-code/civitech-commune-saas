const workflowDefinitions = {
  naissance: ['submitted', 'qualified', 'checked', 'validated', 'issued', 'archived'],
  deces: ['submitted', 'qualified', 'checked', 'validated', 'issued', 'archived'],
  'copie-acte': ['submitted', 'searched', 'printed', 'available', 'delivered', 'archived'],
  mariage: ['submitted', 'checked', 'scheduled', 'validated', 'celebrated', 'archived'],
  STATE_CIVIL_BIRTH: ['submitted', 'qualified', 'checked', 'validated', 'issued', 'archived'],
  STATE_CIVIL_DEATH: ['submitted', 'qualified', 'checked', 'validated', 'issued', 'archived'],
  STATE_CIVIL_COPY: ['submitted', 'searched', 'printed', 'available', 'delivered', 'archived'],
  STATE_CIVIL_MARRIAGE: ['submitted', 'checked', 'scheduled', 'validated', 'celebrated', 'archived'],
};

function getWorkflowForProcedure(procedureKey) {
  return workflowDefinitions[procedureKey] || [];
}

function computeNextStep(procedureKey, currentStep) {
  const workflow = getWorkflowForProcedure(procedureKey);
  const index = workflow.indexOf(currentStep);
  if (index === -1) return workflow[0] || null;
  return workflow[index + 1] || null;
}

function computeProgress(procedureKey, currentStep) {
  const workflow = getWorkflowForProcedure(procedureKey);
  if (workflow.length === 0) return 0;
  const index = workflow.indexOf(currentStep);
  if (index === -1) return 0;
  return Math.round(((index + 1) / workflow.length) * 100);
}

module.exports = {
  getWorkflowForProcedure,
  computeNextStep,
  computeProgress,
};
