import { Link } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
import useUser from '../../hooks/useUser'
import logo from '../../../resources/logo.png'

const Navbar = () => {
  const user = useUser()

  const onLogout = useLogout()

  return (
    <div className='flex h-full bg-black'>
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

      <nav className='flex w-full items-center justify-between font-bold text-yellow-500'>
        <div>
          <Link to='/restaurants' className='mr-4 font-bold text-white'>
            Restaurants
          </Link>
        </div>

        <div className='mr-20 flex items-center justify-between gap-10'>
          {user?.accessToken ? (
            <>
              <Link to='/profile' className='mr-4 flex font-bold text-white '>
                Profile
              </Link>
              <button
                className='my-auto mr-10 rounded-lg bg-slate-200 text-2xl font-bold'
                onClick={onLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='mr-4 font-bold text-white'>
                Login
              </Link>
              <Link to='/register' className='font-bold text-white'>
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