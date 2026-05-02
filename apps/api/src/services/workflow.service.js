const { workflowDefinitions } = require("../config/workflowConfig");


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
