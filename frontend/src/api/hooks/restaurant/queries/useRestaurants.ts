import { RestaurantResponse } from '../../../../types/menu-item'
import useBaseQuery from '../../useBaseQuery'

const useRestaurants = () => useBaseQuery<RestaurantResponse>({
  apiParams: { path: '/restaurant' },
})

export default useRestaurants