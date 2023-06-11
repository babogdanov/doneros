import { Outlet } from 'react-router-dom'
import Navbar from '../components/NavigationBar'

const Layout = () => {
  return (
    <>
      <div className='h-screen w-screen flex flex-col'>
        <div className=' h-28 w-full border-gray-800'>
          <Navbar />
        </div>
        <div className='flex-1 w-full h-full'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
