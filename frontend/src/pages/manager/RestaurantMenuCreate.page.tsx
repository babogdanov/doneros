import { useParams } from 'react-router-dom'

import { MenuItemEditable } from '../../types/menu-item'
import useCreateMenuItem from '../../api/hooks/menu-item/mutations/useCreateMenuItem'
import MenuItemForm from '../../components/MenuItem/MenuItemForm'

const RestaurantMenuCreate = () => {
  const { id: restaurantId } = useParams()
  const { mutate: create } = useCreateMenuItem()

  if (!restaurantId) {
    return <div> Not found. </div>
  }

  const handleSubmit = async (data: MenuItemEditable) => {
    create({ ...data, restaurantId })
  }

  return <MenuItemForm handleSubmit={handleSubmit} submitLabel='Създаване' />
}

export default RestaurantMenuCreate
