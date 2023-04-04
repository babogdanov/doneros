import { Route, Routes } from 'react-router-dom'

import Layout from './components/common/Layout'
import Etc from './pages/etc'
import Home from './pages/home'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/etc" element={<Etc />} />
      </Route>
    </Routes>
  )
}
export default AppRoutes
