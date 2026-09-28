import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import {
  hasAnyPermission,
  hasPermission,
  hasRole,
} from './permissions'

export default function RoleGuard({
  children,
  allowedRoles,
  permission,
  permissions,
  fallback = '/panel',
}) {
  const { user } = useAuth()

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  let allowed = true

  if (allowedRoles?.length) {
    allowed = hasRole(
      user.role,
      allowedRoles
    )
  }

  if (permission) {
    allowed =
      allowed &&
      hasPermission(
        user.role,
        permission
      )
  }

  if (permissions?.length) {
    allowed =
      allowed &&
      hasAnyPermission(
        user.role,
        permissions
      )
  }

  if (!allowed) {
    return (
      <Navigate
        to={fallback}
        replace
      />
    )
  }

  return children
}