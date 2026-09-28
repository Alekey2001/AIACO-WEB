export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN_CONTABLE: 'admin_contable',
  TRABAJADOR: 'trabajador',
  CLIENTE: 'cliente',
}

export const PERMISSIONS = {
  MANAGE_USERS: 'manage_users',
  MANAGE_GLOBAL_CONTENT: 'manage_global_content',
  MANAGE_ACCOUNTING_CONTENT: 'manage_accounting_content',
  VIEW_WORKER_PANEL: 'view_worker_panel',
  VIEW_CLIENT_PANEL: 'view_client_panel',
  VIEW_SYSTEM_ACTIVITY: 'view_system_activity',
}

const rolePermissions = {
  [ROLES.SUPER_ADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_GLOBAL_CONTENT,
    PERMISSIONS.MANAGE_ACCOUNTING_CONTENT,
    PERMISSIONS.VIEW_WORKER_PANEL,
    PERMISSIONS.VIEW_CLIENT_PANEL,
    PERMISSIONS.VIEW_SYSTEM_ACTIVITY,
  ],

  [ROLES.ADMIN_CONTABLE]: [
    PERMISSIONS.MANAGE_ACCOUNTING_CONTENT,
  ],

  [ROLES.TRABAJADOR]: [
    PERMISSIONS.VIEW_WORKER_PANEL,
  ],

  [ROLES.CLIENTE]: [
    PERMISSIONS.VIEW_CLIENT_PANEL,
  ],
}

export function hasPermission(role, permission) {
  const permissions = rolePermissions[role] ?? []

  return permissions.includes(permission)
}

export function hasAnyPermission(role, permissions = []) {
  return permissions.some(permission =>
    hasPermission(role, permission)
  )
}

export function hasRole(role, allowedRoles = []) {
  return allowedRoles.includes(role)
}