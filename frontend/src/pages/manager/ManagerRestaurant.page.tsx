import { useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import MenuItemCard from '../../components/MenuItem/MenuItemCard'
import useRestaurant from '../../api/hooks/restaurant/queries/useRestaurant'
import useUser from '../../hooks/useUser'
import { UserRole } from '../../types/user'

const ManagerRestaurant = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { id: userId, role } = useUser()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data, isLoading, isError } = useRestaurant(id!)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <div>Unable to load data.</div>
  }

  if (data.restaurant.manager.id !== userId && role !== UserRole.ADMIN) {
    return <div> You are not the manager of this restaurant. </div>
  }

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
      {data!.restaurant.menuItems.map((item) => (
        <MenuItemCard key={item.id} menuItem={item} isManagerView />
      ))}
      <div className='m-5 flex h-96 w-96 flex-col items-center justify-center rounded-lg bg-white text-center font-sans shadow-lg'>
        <label> Create a menu item </label>
        <button
          className='rounded bg-orange-400 text-3xl font-bold text-white hover:bg-orange-500 focus:outline-none'
          onClick={() => navigate(`/manager/create-menu-item/${id}`)}
        >
          +
        </button>
        <button
          className='rounded bg-green-400  font-bold text-white hover:bg-green-500 focus:outline-none'
          onClick={() => navigate(`/manager/restaurants/${id}/storage`)}
        >
          Restourant Storage
        </button>
      </div>
    </>
  )
}

export default ManagerRestaurant
