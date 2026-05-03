import type { SessionUser } from './appTypes';

export type UserRole = 'citizen' | 'agent' | 'service_manager' | 'commune_admin' | 'super_admin';

export function hasRole(user: SessionUser | null | undefined, roles: UserRole[]) {
  if (!user) return false;
  const userRoles = (user.roleCodes || []) as UserRole[];
  return roles.some((role) => userRoles.includes(role));
}

export function canAdvanceWorkflow(user: SessionUser | null | undefined) {
  return hasRole(user, ['agent', 'service_manager', 'commune_admin', 'super_admin']);
}

export function canValidateDocuments(user: SessionUser | null | undefined) {
  return hasRole(user, ['service_manager', 'commune_admin', 'super_admin']);
}

export function canResumeDraft(user: SessionUser | null | undefined) {
  return hasRole(user, ['citizen', 'commune_admin', 'super_admin']);
}
