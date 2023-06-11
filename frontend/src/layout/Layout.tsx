import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import useLogout from '../hooks/useLogout'

const Layout = () => {
  const onLogout = useLogout()

  return (
    <>
      <nav className='w-full h-20 bg-gray-900'>
        <ul className='w-40 h-20 p-4 flex justify-between items-center list-none'>
          <Link to='/'>
            <li className='text-gray-50'>Home</li>
          </Link>
          <Link to='/login'>
            <li className='text-gray-50'>Login</li>
          </Link>
          <Link to='/register'>
            <li className='text-gray-50'>Registration</li>
          </Link>
          <button onClick={onLogout}>Logout</button>
        </ul>
      </nav>
      <main className='p-10'>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
