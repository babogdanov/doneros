import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './layout/Layout'
import ProtectedRoute from './layout/ProtectedRoute'
import Home from './pages/Home.page'
import Register from './pages/Register.page'
import Login from './pages/Login.page'
import RestaurantList from './pages/RestaurantList.page'
import Restaurant from './pages/Restaurant.page'
import RestaurantMenuEdit from './pages/RestaurantMenuEdit.page'
import RestaurantMenuCreate from './pages/RestaurantMenuCreate.page'
import Profile from './pages/Profile.page'
import { UserRole } from './types/user'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/restaurants' element={<RestaurantList />} />
        <Route path='/restaurants/:id' element={<Restaurant />} />
        <Route path='/edit-menu-item/:id' element={<RestaurantMenuEdit />} />
        <Route path='/create-menu-item/:id' element={<RestaurantMenuCreate />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/test' element={<div>Тука е само за избрани потребители. </div>} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route
          element={<ProtectedRoute allowedRoles={[UserRole.COURIER, UserRole.ADMIN]} />}
        >
          <Route
            path='/home/courier'
            element={<div>Тука е само за избрани куриери. </div>}
          />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route
          element={<ProtectedRoute allowedRoles={[UserRole.MANAGER, UserRole.ADMIN]} />}
        >
          <Route
            path='/home/manager'
            element={<div>Тука е само за избрани меринджеи. </div>}
          />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
          <Route path='/home/admin' element={<div>Тука е само за баш админи. </div>} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  )
}
export default AppRoutes
