import { Route, Routes } from 'react-router-dom'

import Layout from './components/common/Layout'
import Home from './pages/home'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/etc" element={<div> Сложи ме в /pages, бре! </div>} />
      </Route>
    </Routes>
  )
}
export default AppRoutes
