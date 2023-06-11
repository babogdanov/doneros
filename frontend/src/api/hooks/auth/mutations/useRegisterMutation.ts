import useBaseMutation from '../../useBaseMutation'
import { RegisterRequest, RegisterResponse } from '../../../../types/user'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const useRegisterMutation = () => {
  const navigate = useNavigate()
  return useBaseMutation<RegisterRequest, RegisterResponse>({
    apiParams: { path: '/auth/register', method: 'POST' },
    builtInParams: {
      onSuccess: () => {
        toast.success('You have registered succesfully')
        navigate('/login')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    },
  })
}

export default useRegisterMutation
