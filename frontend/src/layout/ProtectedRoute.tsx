import { Navigate, Outlet } from 'react-router-dom'

import useUser from '../hooks/useUser'
import { UserRole } from '../types/user'

const allRoles = [UserRole.USER, UserRole.COURIER, UserRole.MANAGER, UserRole.ADMIN]

type ProtectedRouteProps = {
  allowedRoles?: UserRole[]
  notLoggedInAllowed?: 'true' | 'false' | 'only'
}

const ProtectedRoute = ({
  allowedRoles = allRoles,
  notLoggedInAllowed = 'false',
}: ProtectedRouteProps) => {
  const user = useUser()

  const isLoggedIn = user?.accessToken
  const isAuthorized = allowedRoles.includes(user?.role)

  if (notLoggedInAllowed === 'only') {
    return <Outlet />
  }

  if (!isLoggedIn && notLoggedInAllowed !== 'true') {
    return <Navigate to='login' />
  }

  if (!isAuthorized) {
    return <Navigate to='/' />
  }

  return <Outlet />
}

export default ProtectedRoute
