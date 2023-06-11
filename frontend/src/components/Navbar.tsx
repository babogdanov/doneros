import { Link } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import useUser from '../hooks/useUser'
import logo from '../../resources/logo.png'

const Navbar = () => {
  const user = useUser()

  const onLogout = useLogout()

  return (
    <div className='h-full flex bg-black'>
      <Link to='/home' className='w-1/6'>
        <div
          className='h-full'
          style={{
            background: `url(${logo})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: '100% 100%',
          }}
        ></div>
      </Link>

      <nav className='w-full flex items-center justify-between font-bold text-yellow-500'>
        <div>
          <Link to='/restaurants' className='text-white font-bold mr-4'>
            Restaurants
          </Link>
        </div>

        <div className='flex mr-20 gap-10'>
          {user?.accessToken ? (
            <button
              className='rounded-lg flex items-center justify-center mr-10 font-bold  text-2xl bg-slate-200'
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to='/login' className='text-white font-bold mr-4'>
                Login
              </Link>
              <Link to='/register' className='text-white font-bold'>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
