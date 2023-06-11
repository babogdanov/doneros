import { useNavigate } from 'react-router-dom'

import { CreateMenuItemRequest, MenuItemResponse } from '../../../types/menu-item'
import useBaseMutation from '../useBaseMutation'

const useCreateMenuItem = () => {
  const navigate = useNavigate()
  return useBaseMutation<CreateMenuItemRequest, MenuItemResponse>({
    apiParams: { path: '/menu-item', method: 'POST' },
    builtInParams: {
      onSuccess: (data) => navigate(`/restaurants/${data.menuItem.restaurant.id}`),
    },
  })
}

export default useCreateMenuItem
