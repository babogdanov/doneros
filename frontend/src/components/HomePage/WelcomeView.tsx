import { Link } from 'react-router-dom'
import background from '../../../resources/welcomeTab1.png'

const WelcomeView = () => {
  return (
    <>
      <div
        className='flex h-full w-full flex-col items-center justify-center'
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center center',
          backgroundSize: '100% 100%',
        }}
      >
        <div className='flex flex-col items-center justify-center py-16 text-center text-black'>
          <h1 className='mb-8  text-8xl font-bold'>Welcome to Doneros</h1>
          <p className='text-2xl'>
            Discover the taste of authentic doner kebab, made fresh daily with the finest
            ingredients.
          </p>
          <Link to='/restaurants'>
            <div className='flex h-20 w-60 flex-col items-center justify-center rounded-lg bg-yellow-500 text-center text-2xl text-slate-300 hover:text-3xl hover:text-slate-50'>
              ORDER NOW!
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default WelcomeView
