import { Link } from 'react-router-dom'
import background from '../../../resources/welcomeTab1.png'

const Home = () => {
  return (
    <>
      <div
        className='flex h-screen w-full flex-col items-center justify-center'
        style={{
          backgroundImage: `url(${background})`,
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
            <div className='flex h-20 w-60 flex-col items-center justify-center rounded-lg bg-yellow-500 text-center text-2xl text-white hover:text-3xl'>
              ORDER NOW!
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
