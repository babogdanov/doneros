import { MenuItemResponse } from '../../../types/menu-item'
import useBaseMutation from '../useBaseMutation'

const useDeleteMenuItem = (id: string) => {
  return useBaseMutation<undefined, MenuItemResponse>({
    apiParams: { path: `/menu-item/${id}`, method: 'DELETE'},
  })
}

export default useDeleteMenuItem
