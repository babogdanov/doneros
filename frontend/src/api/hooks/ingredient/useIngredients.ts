import { IngredientsResponse } from '../../../types/ingredient'
import useBaseQuery from '../useBaseQuery'

export const STORAGE_QUERY_KEY = ['/storage']

const useGetRestaurantIngredients = (id: string) =>
  useBaseQuery<IngredientsResponse>({
    apiParams: { path: `/storage/${id}` },
    builtInParams: {
      queryKey: STORAGE_QUERY_KEY,
    },
  })

export default useGetRestaurantIngredients
