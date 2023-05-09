import { Navigate, Outlet } from 'react-router-dom'

import useUser from '../hooks/useUser'

const ProtectedRoutes = () => {
  const user = useUser()

  return user?.accessToken ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes
