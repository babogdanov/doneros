import { MenuItemResponse } from '../../../types/menu-item'
import useBaseQuery from '../useBaseQuery'

const useMenuItem = (id: string) =>
  useBaseQuery<MenuItemResponse>({
    apiParams: { path: `/menu-item/${id}`},
  })

export default useMenuItem




