import { useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/common/LoadingSpinner'
import MenuItemCard from '../components/MenuItem/MenuItemCard'
import useRestaurant from '../api/hooks/restaurant/queries/useRestaurant'

const Restaurant = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data, isLoading, isError, error } = useRestaurant(id!)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
      {data!.restaurant.menuItems.map((item) => (
        <MenuItemCard key={item.id} menuItem={item} addEnabled />
      ))}
      <div className='m-5 flex h-96 w-96 flex-col items-center justify-center rounded-lg bg-white text-center font-sans shadow-lg'>
        <label> Създаване </label>
        <button
          className='rounded bg-orange-400 text-3xl font-bold text-white hover:bg-orange-500 focus:outline-none'
          onClick={() => navigate(`/create-menu-item/${id}`)}
        >
          +
        </button>
      </div>
    </>
  )
}

export default Restaurant
