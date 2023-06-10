import { RestaurantRequest, RestaurantResponse } from '../../../../types/restaurant'
import useBaseMutation from '../../useBaseMutation'

const useNewRestaurant = () => {
  return useBaseMutation<RestaurantRequest, RestaurantResponse>({
    apiParams: { path: '/restaurants', method: 'POST'},
  })
}

export default useNewRestaurant
