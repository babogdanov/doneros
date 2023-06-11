import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <>
      <div className='w-screen px-4 flex flex-col'>
        <div className='h-28 w-full border-gray-800'>
          <Navbar />
        </div>
        <div className='w-full h-full flex items-center justify-center'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
