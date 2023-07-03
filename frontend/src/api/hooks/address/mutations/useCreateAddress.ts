import { useQueryClient } from '@tanstack/react-query'
import { CreateAddressRequest, AddressResponse } from '../../../../types/address'
import useBaseMutation from '../../useBaseMutation'
import { AUTH_QUERY_KEY } from '../../auth/queries/useSyncQuery'

const useCreateAddress = () => {
  const queryClient = useQueryClient()
  return useBaseMutation<CreateAddressRequest, AddressResponse>({
    apiParams: { path: '/address', method: 'POST' },
    builtInParams: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY })
      },
    },
  })
}

export default useCreateAddress
