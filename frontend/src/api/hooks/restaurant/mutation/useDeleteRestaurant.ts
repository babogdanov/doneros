import { RestaurantResponse } from '../../../../types/restaurant'
import useBaseMutation from '../../useBaseMutation'

const useDeleteRestaurant = (id: string) => {
  return useBaseMutation<undefined, RestaurantResponse>({
    apiParams: { path: `/restaurants/${id}`, method: 'DELETE'},
  })
}

export default useDeleteRestaurant