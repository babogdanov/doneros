import { GetOrdersResponse } from '../../../../types/order'
import useBaseQuery from '../../useBaseQuery'

const useGetMyOrders = (courierId: number) =>
  useBaseQuery<GetOrdersResponse>({ apiParams: { path: `/order/${courierId}` } })

export default useGetMyOrders
