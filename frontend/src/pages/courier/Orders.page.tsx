import useGetMyOrders from '../../api/hooks/order/queries/useGetMyOrders'
import OrderCard from '../../components/Order/OrderCard'
import useUser from '../../hooks/useUser'

const Orders = () => {
  const { id } = useUser()
  const { data, isLoading, isError } = useGetMyOrders({ userId: id, isCourier: true })
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
