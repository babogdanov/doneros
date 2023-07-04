import { GetOrdersResponse } from '../../../../types/order'
import useBaseQuery from '../../useBaseQuery'

type GetOrdersProps = {
  userId: number
  isCourier?: boolean
}
const useGetMyOrders = ({ userId, isCourier = false }: GetOrdersProps) =>
  useBaseQuery<GetOrdersResponse>({
    apiParams: { path: `/order/${isCourier ? 'courier' : 'user'}/${userId}` },
  })

export default useGetMyOrders
