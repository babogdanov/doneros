import useGetAvailableOrders from '../../api/hooks/order/queries/useGetAvailableOrders'
import OrderCard from '../../components/Order/OrderCard'

const CourierHome = () => {
  const { data, isLoading, isError } = useGetAvailableOrders()
  if (isLoading) {
    return <div> loading </div>
  }

  if (isError) {
    return <div> error </div>
  }

  return (
    <div>
      <h3 className='text-center'> Available orders </h3>
      {data.orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}

export default CourierHome
