import useBaseMutation from '../useBaseMutation'
import { RegisterRequest, RegisterResponse } from '../../../../types/user'

const useRegisterMutation = () => {
  return useBaseMutation<RegisterRequest, RegisterResponse>({
    apiParams: { path: '/auth/register', method: 'POST' },
  })
}

export default useRegisterMutation
