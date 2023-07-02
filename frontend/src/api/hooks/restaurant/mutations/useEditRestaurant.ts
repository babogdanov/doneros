import { RestaurantRequest, RestaurantResponse } from '../../../../types/restaurant'
import useBaseMutation from '../../useBaseMutation'

const useEditRestaurant = (id: string) => {
  return useBaseMutation<RestaurantRequest, RestaurantResponse>({
    apiParams: { path: `/restaurants/${id}`, method: 'PUT' },
  })
}

export default useEditRestaurant
