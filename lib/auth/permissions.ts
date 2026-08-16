import type { RoleName } from '@prisma/client';

export type Permission =
  | 'admin:view'
  | 'automation:run'
  | 'nomination:review'
  | 'recipient:manage'
  | 'event:manage'
  | 'finance:manage'
  | 'content:manage'
  | 'audit:view'
  | 'user:manage';

const rolePermissions: Record<RoleName, Permission[]> = {
  SUPER_ADMIN: [
    'admin:view',
    'automation:run',
    'nomination:review',
    'recipient:manage',
    'event:manage',
    'finance:manage',
    'content:manage',
    'audit:view',
    'user:manage',
  ],
  EXECUTIVE_DIRECTOR: [
    'admin:view',
    'automation:run',
    'nomination:review',
    'recipient:manage',
    'event:manage',
    'finance:manage',
    'content:manage',
    'audit:view',
  ],
  CASE_MANAGER: ['admin:view', 'nomination:review', 'recipient:manage', 'event:manage'],
  EVENT_COORDINATOR: ['admin:view', 'event:manage'],
  FINANCE: ['admin:view', 'finance:manage', 'audit:view'],
  VOLUNTEER: ['admin:view'],
  CONTENT_EDITOR: ['admin:view', 'content:manage'],
  AUDITOR: ['admin:view', 'audit:view'],
  HOTLINE_AGENT: ['admin:view', 'nomination:review', 'recipient:manage'],
};

export function hasPermission(role: RoleName | undefined, permission: Permission): boolean {
  if (!role) {
    return false;
  }

  return rolePermissions[role].includes(permission);
}

export function assertPermission(role: RoleName | undefined, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    throw new Error('You are not authorized to perform this action.');
  }
}
