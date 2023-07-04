import useBaseMutation from '../../useBaseMutation'
import {
  UpdateOrderStatusRequest,
  UpdateOrderStatusResponse,
} from '../../../../types/order'
import { useNavigate } from 'react-router-dom'

const useUpdateOrder = (successRedirectPath: string) => {
  const navigate = useNavigate()
  return useBaseMutation<UpdateOrderStatusRequest, UpdateOrderStatusResponse>({
    apiParams: { path: '/order/update', method: 'PUT' },
    builtInParams: { onSuccess: () => navigate(successRedirectPath) },
  })
}

export default useUpdateOrder
