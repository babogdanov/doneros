import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import useUser from '../hooks/useUser'
import { UserRole } from '../types/user'

//TODO: tva maj ne e bash izmisleno shtoto hem si vzima konfiguraciite ot tuka za kakvo da ima v navbara hem imame i navbar.tsx kudeto sa opisani drugi raboti
//TODO: moje i na men neshto ne mi e qsno suvsem
const getNavbarLinksForRole = (userRole: UserRole) => {
  switch (userRole) {
    case UserRole.USER:
      return [
        { path: '/home', label: 'Home' },
        { path: '/restaurants', label: 'Restaurants' },
      ]
    case UserRole.COURIER:
      return [
        { path: '/home/courier', label: 'Home' },
        { path: '/orders', label: 'Orders' },
      ]
    case UserRole.MANAGER:
      return [
        { path: '/home/manager', label: 'Home' },
        { path: '/orders', label: 'Orders' },
        { path: '/manager/restaurants', label: 'Restaurants' },
      ]
    case UserRole.ADMIN:
      return [
        { path: '/home/admin', label: 'Home' },
        { path: '/orders', label: 'Orders' },
        { path: '/manager/restaurants', label: 'Restaurants' },
      ]
    default:
      return [
        { path: '/home', label: 'Home' },
        { path: '/restaurants', label: 'Restaurants' },
      ]
  }
}

const Layout = () => {
  const user = useUser()

  const navbarLinks = getNavbarLinksForRole(user.role)

  return (
    <>
      <div className='flex w-screen flex-col px-4'>
        <div className='h-28 w-full border-gray-800'>
          <Navbar
            homePath='/home'
            navbarLinks={navbarLinks}
            isLoggedIn={!!user.accessToken}
          />
        </div>
        <div className='flex h-full w-full items-center justify-center'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
