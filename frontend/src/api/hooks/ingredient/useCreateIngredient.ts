import useBaseMutation from '../useBaseMutation'
import { CreateIngredientRequest, IngredientResponse } from '../../../types/ingredient'

const useCreateIngredient = () => {
  return useBaseMutation<CreateIngredientRequest, IngredientResponse>({
    apiParams: { path: '/storage', method: 'POST' },
    builtInParams: {
    },
  })
}

export default useCreateIngredient
