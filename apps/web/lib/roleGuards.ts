export type UserRole = 'citizen' | 'agent' | 'service_manager' | 'commune_admin' | 'super_admin';

export interface User {
  id: string;
  email: string;
  roleCodes: UserRole[];
  firstName?: string;
  lastName?: string;
}

export function hasRole(user: User | null | undefined, roles: UserRole[]) {
  if (!user) return false;
  const userRoles = user.roleCodes || [];
  return roles.some((role) => userRoles.includes(role));
}

export function canAdvanceWorkflow(user: User | null | undefined) {
  return hasRole(user, ['agent', 'service_manager', 'commune_admin', 'super_admin']);
}

export function canValidateDocuments(user: User | null | undefined) {
  return hasRole(user, ['service_manager', 'commune_admin', 'super_admin']);
}

export function canResumeDraft(user: User | null | undefined) {
  return hasRole(user, ['citizen', 'commune_admin', 'super_admin']);
}
