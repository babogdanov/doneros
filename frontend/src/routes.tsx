import { Route, Routes } from 'react-router-dom'

import Layout from './layout/Layout'
import Home from './pages/Home.page'
import RegisterPage from './pages/Register.page'
import LoginPage from './pages/Login.page'
import ProtectedRoute from './layout/ProtectedRoutes'
import Menu from './pages/Menu.page'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/menu' element={<Menu />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/restaurants' element={<div>Тука е само за избрани. </div>} />
        </Route>
      </Route>
    </Routes>
  )
}
export default AppRoutes
