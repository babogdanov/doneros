import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import useUser from '../hooks/useUser'
import { User, UserRole } from '../types/user'

const getNavbarLinksForRole = (user: User) => {
  const userRole = user.role

  if (user.isCourier) {
    return [
      { path: '/home/courier', label: 'Home' },
      { path: '/orders', label: 'My Orders' },
    ]
  }
  switch (userRole) {
    case UserRole.USER:
      return [
        { path: '/home', label: 'Home' },
        { path: '/restaurants', label: 'Restaurants' },
        { path: '/user/orders', label: 'My orders' },
        { path: '/cart', label: 'Cart' },
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

  const navbarLinks = getNavbarLinksForRole(user)

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
