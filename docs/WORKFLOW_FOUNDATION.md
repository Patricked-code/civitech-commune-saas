# Workflow foundation

## Objective

The platform must be structured around dossiers and procedure workflows rather than static content pages only.

## Current workflow families
- state civil birth declaration
- state civil death declaration
- state civil copy request
- state civil marriage process

## Current steps seed
### naissance and deces
submitted -> qualified -> checked -> validated -> issued -> archived

### copie acte
submitted -> searched -> printed -> available -> delivered -> archived

### mariage
submitted -> checked -> scheduled -> validated -> celebrated -> archived

## Current implementation in code
- workflow definition service
- progress computation
- next step computation
- dossier list service
- dossier detail service
- draft dossier creation endpoint

## Next workflow milestones
- transition guards;
- actor based allowed actions;
- dossier comments;
- dossier events persistence;
- document validation states;
- SLA timers;
- notification triggers;
- configurable workflow builder.
