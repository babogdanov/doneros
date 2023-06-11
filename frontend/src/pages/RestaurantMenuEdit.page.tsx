import { useParams } from 'react-router-dom'

import { MenuItemEditable } from '../types/menu-item'
import useMenuItem from '../api/hooks/menu-item/useMenuItem'
import useEditMenuItem from '../api/hooks/menu-item/useEditMenuItem'
import LoadingSpinner from '../components/common/LoadingSpinner'
import MenuItemForm from '../components/MenuItem/MenuItemForm'

const RestaurantMenuEdit = () => {
  const { id } = useParams()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const menuItemId = id!
  const { isLoading, isError, error, data } = useMenuItem(menuItemId)
  const { mutate: edit } = useEditMenuItem(menuItemId)

  const handleSubmit = async (data: MenuItemEditable) => {
    edit(data)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  return (
    <MenuItemForm
      initialData={data.menuItem}
      handleSubmit={handleSubmit}
      submitLabel='Редактиране'
    />
  )
}

export default RestaurantMenuEdit
