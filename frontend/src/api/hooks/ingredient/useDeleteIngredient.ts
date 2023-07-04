import { IngredientsResponse } from '../../../types/ingredient'
import useBaseMutation from '../useBaseMutation'

const useDeleteIngredient = (id: string) => {
  return useBaseMutation<void, IngredientsResponse>({
    apiParams: { path: `/storage/${id}`, method: 'DELETE' },
  })
}

export default useDeleteIngredient
