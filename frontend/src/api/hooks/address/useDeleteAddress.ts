import { useQueryClient} from '@tanstack/react-query'
import { AddressResponse } from '../../../types/address'
import useBaseMutation from '../useBaseMutation'
import { AUTH_QUERY_KEY } from '../auth/queries/useSyncQuery'
import { useNavigate } from 'react-router-dom'

const useDeleteAddress = (id: string) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useBaseMutation<void, AddressResponse>({
    apiParams: { path: `/address/${id}`, method: 'DELETE' },
    builtInParams: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY })
        queryClient.fetchQuery({ queryKey: AUTH_QUERY_KEY })
        navigate('/profile')
      }
    }
  })
}

export default useDeleteAddress
