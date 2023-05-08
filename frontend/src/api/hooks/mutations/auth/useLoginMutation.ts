import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import useBaseMutation from '../useBaseMutation'
import { AUTH_QUERY_KEY } from '../../queries/auth/useSyncQuery'
import { LoginRequest, LoginResponse } from '../../../../types/user'
import { toast } from 'react-toastify'

const useLoginMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useBaseMutation<LoginRequest, LoginResponse>({
    apiParams: { path: '/auth/login', method: 'POST' },
    builtInParams: {
      onSuccess: (data) => {
        queryClient.setQueryData(AUTH_QUERY_KEY, data)
        navigate('/restaurants')
        toast.success('You have logged in successfully')
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message
        toast.error(errorMessage)
      },
    },
  })
}

export default useLoginMutation
