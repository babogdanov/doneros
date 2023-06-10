import { MenuItemRequest, MenuItemResponse } from '../../../types/menu-item'
import useBaseMutation from '../useBaseMutation'

const useEditMenuItem = (id: string) => {
  return useBaseMutation<MenuItemRequest, MenuItemResponse>({
    apiParams: { path: `/menu-item/${id}`, method: 'PUT'},
  })
}

export default useEditMenuItem
