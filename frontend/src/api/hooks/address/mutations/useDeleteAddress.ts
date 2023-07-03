import { useQueryClient } from '@tanstack/react-query'
import { AddressResponse } from '../../../../types/address'
import useBaseMutation from '../../useBaseMutation'
import { AUTH_QUERY_KEY } from '../../auth/queries/useSyncQuery'

const useDeleteAddress = (id: string) => {
  const queryClient = useQueryClient()
  return useBaseMutation<void, AddressResponse>({
    apiParams: { path: `/address/${id}`, method: 'DELETE' },
    builtInParams: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY })
      },
    },
  })
}

export default useDeleteAddress
