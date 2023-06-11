import { Link } from 'react-router-dom'

const RestaurantListButton = () => (
  <Link to='/restaurants'>
    <button className='rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white'>
      Restaurant List
    </button>
  </Link>
)

export default RestaurantListButton
