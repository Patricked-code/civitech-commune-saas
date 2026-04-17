export function hasRole(user: any, roles: string[]) {
  const userRoles = user?.roleCodes || [];
  return roles.some((role) => userRoles.includes(role));
}

export function canAdvanceWorkflow(user: any) {
  return hasRole(user, ['agent', 'service_manager', 'commune_admin', 'super_admin']);
}

export function canValidateDocuments(user: any) {
  return hasRole(user, ['service_manager', 'commune_admin', 'super_admin']);
}

export function canResumeDraft(user: any) {
  return hasRole(user, ['citizen', 'commune_admin', 'super_admin']);
}
