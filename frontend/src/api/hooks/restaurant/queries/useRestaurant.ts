import { RestaurantResponse } from '../../../../types/restaurant'
import useBaseQuery from '../../useBaseQuery'

const useRestaurant = (id: string) =>
  useBaseQuery<RestaurantResponse>({
    apiParams: { path: `/restaurant/${id}` },
  })

export default useRestaurant
