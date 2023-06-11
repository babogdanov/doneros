import { Link } from 'react-router-dom'

const RestaurantListButton = () => (
  <Link to='/restaurants'>
    <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
      Restaurant List
    </button>
  </Link>
)

export default RestaurantListButton
