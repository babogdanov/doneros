import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './layout/Layout'
import ProtectedRoute from './layout/ProtectedRoute'
import { UserRole } from './types/user'

// Common pages
import Register from './pages/common/Register.page'
import Login from './pages/common/Login.page'
import UserRestaurantList from './pages/common/UserRestaurantList.page'
import Profile from './pages/common/Profile.page'
import Restaurant from './pages/common/UserRestaurant.page'
import UserOrders from './pages/common/UserOrders.page'
// Manager pages
import RestaurantMenuEdit from './pages/manager/RestaurantMenuEdit.page'
import RestaurantMenuCreate from './pages/manager/RestaurantMenuCreate.page'
import ManagerRestaurant from './pages/manager/ManagerRestaurant.page'
import ManagerRestaurantList from './pages/manager/ManagerRestaurantList.page'
import Storage from './pages/manager/Storage.page'
// Courier pages
import CourierHome from './pages/courier/CourierHome.page'
// Admin pages
import AdminHome from './pages/admin/AdminHome.page'
import Orders from './pages/courier/Orders.page'
import Cart from './pages/common/Cart.page'
import OrderTracking from './pages/common/OrderTracking.page'
import Home from './pages/common/Home.page'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
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

        <Route element={<ProtectedRoute allowedRoles={[UserRole.USER]} />}>
          <Route path='/cart' element={<Cart />} />
          <Route path='/user/orders' element={<UserOrders />} />
          <Route path='/order-tracking/:orderId' element={<OrderTracking />} />
        </Route>

        <Route element={<ProtectedRoute allowCourier />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} allowCourier />}>
          <Route path='/home/courier' element={<CourierHome />} />
        </Route>

        <Route
          element={<ProtectedRoute allowedRoles={[UserRole.MANAGER, UserRole.ADMIN]} />}
        >
          <Route path='/manager/restaurants' element={<ManagerRestaurantList />} />
          <Route path='/manager/restaurants/:id' element={<ManagerRestaurant />} />
          <Route path='/manager/restaurants/:id/storage' element={<Storage />} />
          <Route path='/manager/edit-menu-item/:id' element={<RestaurantMenuEdit />} />
          <Route
            path='/manager/create-menu-item/:id'
            element={<RestaurantMenuCreate />}
          />
        </Route>

        <Route
          element={
            <ProtectedRoute
              allowedRoles={[UserRole.MANAGER, UserRole.ADMIN]}
              allowCourier
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
