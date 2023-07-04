import useBaseMutation from '../useBaseMutation'
import { CreateIngredientRequest, IngredientResponse } from '../../../types/ingredient'
import { STORAGE_QUERY_KEY } from './useIngredients'
import { useQueryClient } from '@tanstack/react-query'

const useCreateIngredient = () => {
  const queryClient = useQueryClient()
  return useBaseMutation<CreateIngredientRequest, IngredientResponse>({
    apiParams: { path: '/storage', method: 'POST' },
    builtInParams: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: STORAGE_QUERY_KEY })
      },
    },
  })
}

export default useCreateIngredient
