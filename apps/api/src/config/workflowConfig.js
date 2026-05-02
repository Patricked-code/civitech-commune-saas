const workflowDefinitions = {
  naissance: ["submitted", "qualified", "checked", "validated", "issued", "archived"],
  deces: ["submitted", "qualified", "checked", "validated", "issued", "archived"],
  "copie-acte": ["submitted", "searched", "printed", "available", "delivered", "archived"],
  mariage: ["submitted", "checked", "scheduled", "validated", "celebrated", "archived"],
  STATE_CIVIL_BIRTH: ["submitted", "qualified", "checked", "validated", "issued", "archived"],
  STATE_CIVIL_DEATH: ["submitted", "qualified", "checked", "validated", "issued", "archived"],
  STATE_CIVIL_COPY: ["submitted", "searched", "printed", "available", "delivered", "archived"],
  STATE_CIVIL_MARRIAGE: ["submitted", "checked", "scheduled", "validated", "celebrated", "archived"],
};

module.exports = { workflowDefinitions };
