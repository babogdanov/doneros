import { IngredientsResponse } from '../../../types/ingredient'
import useBaseQuery from '../useBaseQuery'

const useGetRestaurantIngredients = (id: string) =>
  useBaseQuery<IngredientsResponse>({
    apiParams: { path: `/storage/${id}` },
  })

export default useGetRestaurantIngredients
