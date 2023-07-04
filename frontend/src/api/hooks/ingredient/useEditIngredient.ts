import useBaseMutation from '../useBaseMutation'
import { IngredientRequest, IngredientResponse } from '../../../types/ingredient'
import { STORAGE_QUERY_KEY } from './useIngredients'
import { useQueryClient } from '@tanstack/react-query'

const useEditIngredient = (id: string) => {
  const queryClient = useQueryClient()
  return useBaseMutation<IngredientRequest, IngredientResponse>({
    apiParams: { path: `/storage/${id}`, method: 'PUT' },
    builtInParams: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: STORAGE_QUERY_KEY })
      },
    },
  })
}

export default useEditIngredient
