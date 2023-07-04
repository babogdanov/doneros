import useGetMyOrders from '../../api/hooks/order/queries/useGetMyOrders'
import OrderCard from '../../components/Order/OrderCard'
import useUser from '../../hooks/useUser'

const UserOrders = () => {
    const { id } = useUser()
    const { data, isLoading, isError } = useGetMyOrders({userId: id})
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

export default UserOrders