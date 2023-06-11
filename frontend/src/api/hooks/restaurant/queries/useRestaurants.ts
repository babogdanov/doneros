import { GetRestaurantsResponse } from '../../../../types/restaurant'
import useBaseQuery from '../../useBaseQuery'

const useRestaurants = () =>
  useBaseQuery<GetRestaurantsResponse>({
    apiParams: { path: '/restaurant' },
  })

export default useRestaurants
