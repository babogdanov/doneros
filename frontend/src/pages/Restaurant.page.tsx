import { useNavigate, useParams } from 'react-router-dom'
import useRestaurantMenu from '../api/hooks/menu-item/useMenuItem'
import LoadingSpinner from '../components/common/LoadingSpinner'
import MenuItemCard from '../components/common/MenuItemCard'
import useRestaurant from '../api/hooks/restaurant/queries/useRestaurant'

const Restaurant = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isLoading, isError, error } = useRestaurant(id!)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <div>{error}</div>
  }
  
  return (
    <div className='flex flex-wrap'>
      {data.restaurant.menuItems.map((item) => (
        <MenuItemCard key={item.id} menuItem={item} />
      ))}
      <div className='bg-white shadow-lg rounded-lg w-96 m-5 flex justify-center items-center font-sans text-center'>
        <button
          className='bg-orange-400 hover:bg-orange-500 text-white font-bold text-3xl rounded focus:outline-none focus:shadow-outline'
          onClick={() => navigate(`/create-menu-item/${id}`)}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default Restaurant
