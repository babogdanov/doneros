import { Link } from 'react-router-dom'
import background from '../../../resources/welcomeTab1.png'

const WelcomeView = () => {
  return (
    <>
      <div
        className='flex flex-col justify-center items-center w-full h-full '
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center center',
          backgroundSize: '100% 100%',
        }}
      >
        <div className='flex flex-col justify-center items-center text-center text-black py-16'>
          <h1 className=' text-8xl  font-bold mb-8'>Welcome to Doneros</h1>
          <p className='text-2x1'>
            Discover the taste of authentic doner kebab, made fresh daily with the finest
            ingredients.
          </p>
          <Link to='/restaurants'>
            <div className='flex flex-col justify-center items-center text-center text-slate-300 hover:text-slate-50 text-2xl hover:text-3xl bg-yellow-500 h-20 w-60 rounded-lg'>
              ORDER NOW!
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default WelcomeView
