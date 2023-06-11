import { useNavigate } from 'react-router-dom'
import { MenuItemRequest, MenuItemResponse } from '../../../types/menu-item'
import useBaseMutation from '../useBaseMutation'

const useEditMenuItem = (id: string) => {
  const navigate = useNavigate()
  return useBaseMutation<MenuItemRequest, MenuItemResponse>({
    apiParams: { path: `/menu-item/${id}`, method: 'PUT' },
    builtInParams: {
      onSuccess: (data) => navigate(`/restaurants/${data.menuItem.restaurant.id}`),
    },
  })
}

export default useEditMenuItem
