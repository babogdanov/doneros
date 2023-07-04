import { GetOrdersResponse } from '../../../../types/order'
import useBaseQuery from '../../useBaseQuery'

const useGetAvailableOrders = () =>
  useBaseQuery<GetOrdersResponse>({ apiParams: { path: '/order/all-available' } })

export default useGetAvailableOrders
