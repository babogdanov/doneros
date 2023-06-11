import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

const Layout = () => {
  return (
    <>
      <div className='flex w-screen flex-col px-4'>
        <div className='h-28 w-full border-gray-800'>
          <Navbar />
        </div>
        <div className='flex h-full w-full items-center justify-center'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
