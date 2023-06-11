import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

import useBaseMutation from '../../useBaseMutation'
import { LoginRequest, LoginResponse } from '../../../../types/user'
import { AUTH_QUERY_KEY } from '../queries/useSyncQuery'
import { setUser } from '../../../../utils/local-storage.utils'

const useLoginMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useBaseMutation<LoginRequest, LoginResponse>({
    apiParams: { path: '/auth/login', method: 'POST' },
    builtInParams: {
      onSuccess: (data) => {
        setUser(data)
        queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY })
        toast.success('You have logged in succesfully')
        navigate('/restaurants')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    },
  })
}

export default useLoginMutation
