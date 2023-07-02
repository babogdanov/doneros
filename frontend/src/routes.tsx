import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './layout/Layout'
import ProtectedRoute from './layout/ProtectedRoute'
import { UserRole } from './types/user'

// Common pages
import Home from './pages/common/Home.page'
import Register from './pages/common/Register.page'
import Login from './pages/common/Login.page'
import UserRestaurantList from './pages/common/UserRestaurantList.page'
import Profile from './pages/common/Profile.page'
import Restaurant from './pages/common/UserRestaurant.page'
// Manager pages
import RestaurantMenuEdit from './pages/manager/RestaurantMenuEdit.page'
import RestaurantMenuCreate from './pages/manager/RestaurantMenuCreate.page'
import ManagerRestaurant from './pages/manager/ManagerRestaurant.page'
import ManagerRestaurantList from './pages/manager/ManagerRestaurantList.page'
// Courier pages
import CourierHome from './pages/courier/CourierHome.page'
// Admin pages
import AdminHome from './pages/admin/AdminHome.page'
import Orders from './pages/common/Orders.page'
import Cart from './pages/common/Cart.page'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute notLoggedInAllowed='only' />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={[UserRole.USER]} notLoggedInAllowed='true' />
          }
        >
          <Route path='/restaurants' element={<UserRestaurantList />} />
          <Route path='/restaurants/:id' element={<Restaurant />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route
          element={<ProtectedRoute allowedRoles={[UserRole.COURIER, UserRole.ADMIN]} />}
        >
          <Route path='/home/courier' element={<CourierHome />} />
        </Route>
        <Route
          element={<ProtectedRoute allowedRoles={[UserRole.MANAGER, UserRole.ADMIN]} />}
        >
          <Route path='/manager/restaurants' element={<ManagerRestaurantList />} />
          <Route path='/manager/restaurants/:id' element={<ManagerRestaurant />} />
          <Route path='/manager/edit-menu-item/:id' element={<RestaurantMenuEdit />} />
          <Route
            path='/manager/create-menu-item/:id'
            element={<RestaurantMenuCreate />}
          />
        </Route>

        {/* Tva move bi e ostaveno za adminskiq dashbord? */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[UserRole.COURIER, UserRole.MANAGER, UserRole.ADMIN]}
            />
          }
        >
          <Route path='/orders' element={<Orders />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
          <Route path='/home/admin' element={<AdminHome />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  )
}
export default AppRoutes
