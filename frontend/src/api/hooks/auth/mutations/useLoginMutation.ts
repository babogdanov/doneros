import useBaseMutation from '../../useBaseMutation'
import { LoginRequest, LoginResponse } from '../../../../types/user'

const useLoginMutation = () => {
  return useBaseMutation<LoginRequest, LoginResponse>({
    apiParams: { path: '/auth/login', method: 'POST' },
  })
}

export default useLoginMutation
