const workflowDefinitions = {
  naissance: ['submitted', 'qualified', 'checked', 'validated', 'issued', 'archived'],
  deces: ['submitted', 'qualified', 'checked', 'validated', 'issued', 'archived'],
  'copie-acte': ['submitted', 'searched', 'printed', 'available', 'delivered', 'archived'],
  mariage: ['submitted', 'checked', 'scheduled', 'validated', 'celebrated', 'archived'],
};

function getWorkflowForProcedure(procedureId) {
  return workflowDefinitions[procedureId] || [];
}

function computeNextStep(procedureId, currentStep) {
  const workflow = getWorkflowForProcedure(procedureId);
  const index = workflow.indexOf(currentStep);
  if (index === -1) return workflow[0] || null;
  return workflow[index + 1] || null;
}

function computeProgress(procedureId, currentStep) {
  const workflow = getWorkflowForProcedure(procedureId);
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
