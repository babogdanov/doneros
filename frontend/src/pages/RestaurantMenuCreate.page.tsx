import { useParams } from 'react-router-dom'

import { MenuItemEditable } from '../types/menu-item'
import useCreateMenuItem from '../api/hooks/menu-item/useCreateMenuItem'
import MenuItemForm from '../components/MenuItem/MenuItemForm'

const RestaurantMenuCreate = () => {
  const { id } = useParams()
  const { mutate: create } = useCreateMenuItem()

  if (!id) {
    return <div> Not found. </div>
  }

  const handleSubmit = async (data: MenuItemEditable) => {
    create({ ...data, restaurantId: id })
  }

  return <MenuItemForm handleSubmit={handleSubmit} submitLabel='Създаване' />
}

export default RestaurantMenuCreate
