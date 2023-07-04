import { useInterval } from 'usehooks-ts'
import useGetMyOrders from '../../api/hooks/order/queries/useGetMyOrders'
import OrderCard from '../../components/Order/OrderCard'
import useUser from '../../hooks/useUser'
import { OrderStatus } from '../../types/order'
import useUpdateCourierLocation from '../../api/hooks/order/mutations/useUpdateCourierLocation'

const Orders = () => {
  const { id } = useUser()
  const { data, isLoading, isError } = useGetMyOrders({ userId: id, isCourier: true })
  const { mutate: updateCourierLocation } = useUpdateCourierLocation()

  const hasOrdersInProgress = data?.orders?.find(
    (order) => order.status === OrderStatus.IN_PROGRESS,
  )

  useInterval(
    () => {
      // Your custom logic here
      navigator.geolocation.getCurrentPosition((pos) => {
        const body = {
          courierId: id,
          location: { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
        }
        updateCourierLocation(body)
      })
    },
    // Delay in milliseconds or null to stop it
    hasOrdersInProgress ? 4 * 1000 : null,
  )

  if (isLoading) {
    return <div> loading </div>
  }

  if (isError) {
    return <div> error </div>
  }

  return (
    <div>
      <h3 className='text-center'> My orders </h3>
      {data.orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}

export default Orders
