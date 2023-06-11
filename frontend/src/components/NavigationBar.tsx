import { Link } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import useUser from '../hooks/useUser'
import logo from '../../resources/logo.png'

const Navbar = () => {
  const user = useUser()

  const onLogout = useLogout()

  return (
    <>
      <div className='w-full h-full mt-0 mb-0 flex bg-black'>
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

        <nav className='w-full h-full flex items-center justify-between font-bold text-yellow-500'>
          <div>
            <Link to='/restaurants' className='text-white font-bold mr-4'>
              Restaurants
            </Link>
          </div>

          {user?.accessToken ? (
            <button
              className='w-1/12 h-1/3 rounded-lg flex items-center justify-center mr-10 font-bold px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 text-slate-300 hover:text-slate-50 text-2xl hover:text-3xl bg-yellow-500 '
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            <div>
              <Link to='/login' className='text-white font-bold mr-4'>
                Login
              </Link>
              <Link to='/register' className='text-white font-bold'>
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  )

  // return (
  //   <>
  //     <div className='w-full h-full mt-0 mb-0 flex  bg-black'>
  //       <Link to='/home' className='w-1/6'>
  //         <div className='h-full'></div>
  //       </Link>

  //       <nav className='w-full h-full flex items-center justify-between font-bold text-cyan-200'>
  //         <div>
  //           <Link to='/restaurants'>
  //             <li className='text-white'>Restaurants</li>
  //           </Link>
  //         </div>

  //         {user?.accessToken ? (
  //           <button onClick={onLogout}>Logout</button>
  //         ) : (
  //           <div>
  //             <Link to='/login' className='text-white font-bold mr-4'>
  //               Login
  //             </Link>
  //             <Link to='/register' className='text-white font-bold'>
  //               Register
  //             </Link>
  //           </div>
  //         )}
  //       </nav>
  //     </div>
  //   </>
  // )
}

export default Navbar
