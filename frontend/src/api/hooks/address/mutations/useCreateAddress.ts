import { useNavigate } from 'react-router-dom'

import { CreateAddressRequest, AddressResponse } from '../../../../types/address'
import useBaseMutation from '../../useBaseMutation'

const useCreateAddress = () => {
  const navigate = useNavigate()
  return useBaseMutation<CreateAddressRequest, AddressResponse>({
    apiParams: { path: '/address', method: 'POST' },
    builtInParams: {
      onSuccess: (data) =>
        navigate(`/profile`),
    },
  })
}

export default useCreateAddress
