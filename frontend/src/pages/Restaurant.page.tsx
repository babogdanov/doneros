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
        <MenuItemCard key={item.id} menuItem={item} />
      ))}
      <div className='flex flex-col bg-white shadow-lg rounded-lg w-96 m-5 justify-center items-center font-sans text-center'>
        <label> Създаване </label>
        <button
          className='bg-orange-400 hover:bg-orange-500 text-white font-bold text-3xl rounded focus:outline-none focus:shadow-outline'
          onClick={() => navigate(`/create-menu-item/${id}`)}
        >
          +
        </button>
      </div>
    </>
  )
}

export default Restaurant
