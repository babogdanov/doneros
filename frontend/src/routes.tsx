import { Route, Routes } from 'react-router-dom'

import Layout from './components/common/Layout'
import Home from './pages/home'
import Login from './pages/login'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  )
}
export default AppRoutes
