import { Navigate, Outlet } from 'react-router-dom'

import useUser from '../hooks/useUser'
import { UserRole } from '../types/user'

const allRoles = [UserRole.USER, UserRole.COURIER, UserRole.MANAGER, UserRole.ADMIN]

const ProtectedRoute = ({ allowedRoles = allRoles }: { allowedRoles?: UserRole[] }) => {
  const user = useUser()

  const isLoggedIn = user?.accessToken
  const isAuthorized = allowedRoles.includes(user?.role)

  if (!isLoggedIn) {
    return <Navigate to='login' />
  }

  if (!isAuthorized) {
    return <Navigate to='/' />
  }

  return <Outlet />
}

export default ProtectedRoute
