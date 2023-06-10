import { CreateMenuItemRequest, MenuItemResponse } from '../../../types/menu-item'
import useBaseMutation from '../useBaseMutation'

const useCreateMenuItem = () => {
  return useBaseMutation<CreateMenuItemRequest, MenuItemResponse>({
    apiParams: { path: '/menu-item', method: 'POST'},
  })
}

export default useCreateMenuItem
