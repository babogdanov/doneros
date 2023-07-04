import { OrderResponse } from '../../../../types/order'
import useBaseQuery from '../../useBaseQuery'

const useGetOrder = (orderId: number) =>
  useBaseQuery<OrderResponse>({
    apiParams: { path: `/order/${orderId}` },
  })

export default useGetOrder
