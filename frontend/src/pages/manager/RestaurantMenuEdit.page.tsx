import { useNavigate, useParams } from 'react-router-dom'

import { MenuItemEditable } from '../../types/menu-item'
import useMenuItem from '../../api/hooks/menu-item/useMenuItem'
import useEditMenuItem from '../../api/hooks/menu-item/useEditMenuItem'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import MenuItemForm from '../../components/MenuItem/MenuItemForm'
import useUser from '../../hooks/useUser'

const RestaurantMenuEdit = () => {
  const { id } = useParams()
  const { id: userId } = useUser()
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const menuItemId = id!
  const { isLoading, isError, data } = useMenuItem(menuItemId)
  const { mutate: edit } = useEditMenuItem(menuItemId)

  const handleSubmit = async (data: MenuItemEditable) => {
    //TODO: след едит на връша на холм пейдж
    navigate(`/manager/restaurants/${id}`)
    edit(data)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <div>Unable to load initial data.</div>
  }

  if (data.menuItem.restaurant.manager.id !== userId) {
    return <div> You are not allowed to edit this restaurant. </div>
  }
  return (
    <MenuItemForm
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      initialData={data!.menuItem}
      handleSubmit={handleSubmit}
      submitLabel='Редактиране'
    />
  )
}

export default RestaurantMenuEdit
