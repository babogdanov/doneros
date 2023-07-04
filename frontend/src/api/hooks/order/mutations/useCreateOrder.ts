import { useNavigate } from 'react-router-dom'
import useBaseMutation from '../../useBaseMutation'
import { CreateOrderRequest, OrderResponse } from '../../../../types/order'
import { toast } from 'react-toastify'

const useCreateOrder = () => {
  const navigate = useNavigate()

  return useBaseMutation<CreateOrderRequest, OrderResponse>({
    apiParams: { path: '/order', method: 'POST' },
    builtInParams: {
      onSuccess: () => {
        navigate('/profile'), toast.success('You have successfully placed an order')
      },
      onError: (error) => {
        navigate('/cart'), toast.error(error.message)
      },
    },
  })
}

export default useCreateOrder
