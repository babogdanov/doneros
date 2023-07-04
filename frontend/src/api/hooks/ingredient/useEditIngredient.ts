import useBaseMutation from '../useBaseMutation'
import { IngredientRequest, IngredientResponse } from '../../../types/ingredient'

const useEditIngredient = (id: string) => {
  return useBaseMutation<IngredientRequest, IngredientResponse>({
    apiParams: { path: `/storage/${id}`, method: 'PUT' },
  })
}

export default useEditIngredient
