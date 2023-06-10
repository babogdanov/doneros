import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './layout/Layout'
import Home from './pages/Home.page'
import RegisterPage from './pages/Register.page'
import LoginPage from './pages/Login.page'
import ProtectedRoute from './layout/ProtectedRoutes'
import RestaurantList from './pages/RestaurantList.page'
import Restaurant from './pages/Restaurant.page'
import RestaurantMenuEdit from './pages/RestaurantMenuEdit.page'
import RestaurantMenuCreate from './pages/RestaurantMenuCreate.page'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/restaurants' element={<RestaurantList />} />
        <Route path='/restaurants/:id' element={<Restaurant />} />
        <Route path='/edit-menu-item/:id' element={<RestaurantMenuEdit />} />
        <Route path='/create-menu-item/:id' element={<RestaurantMenuCreate />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/test' element={<div>Тука е само за избрани. </div>} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  )
}
export default AppRoutes
