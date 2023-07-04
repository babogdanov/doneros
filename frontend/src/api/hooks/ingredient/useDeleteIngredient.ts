import { useQueryClient } from '@tanstack/react-query'
import { IngredientsResponse } from '../../../types/ingredient'
import useBaseMutation from '../useBaseMutation'
import { STORAGE_QUERY_KEY } from './useIngredients'

const useDeleteIngredient = (id: string) => {
  const queryClient = useQueryClient()
  return useBaseMutation<void, IngredientsResponse>({
    apiParams: { path: `/storage/${id}`, method: 'DELETE' },
    builtInParams: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: STORAGE_QUERY_KEY })
      },
    },
  })
}

export default useDeleteIngredient
