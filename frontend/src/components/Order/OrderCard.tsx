import useUpdateOrder from '../../api/hooks/order/mutations/useUpdateOrder'
import useUser from '../../hooks/useUser'
import { Order, OrderStatus } from '../../types/order'

type OrderCardProps = {
  order: Order
}

const OrderCard = ({ order }: OrderCardProps) => {
  const { id: userId, isCourier } = useUser()
  const { address, paymentMethod, price, menuItems, status, id, courier } = order

  const { mutate } = useUpdateOrder('/orders')

  const handleUpdateOrderStatus = ({
    orderStatus,
    courierId,
  }: {
    orderStatus: OrderStatus
    courierId?: number
  }) => {
    mutate({ id, status: orderStatus, courierId })
  }

  return (
    <div className='m-5 mb-16 h-5/6 w-96 rounded-lg bg-white text-center font-sans shadow-lg'>
      <div className='h-1/6 w-full text-2xl'>{`Status: ${status}`}</div>
      <img className='h-full object-scale-down' src={address} alt='' />
      <div className='h-10 w-full text-xl text-blue-500'>{price}</div>
      <div className='h-1/6 w-full text-xl'>{`Payment method: ${paymentMethod}`}</div>
      <label>Menu items</label>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}> {`${item.name} from ${item.restaurant.name}`} </li>
        ))}
      </ul>

      {!isCourier && status !== OrderStatus.CREATED && (
        <p>{`Courier: ${order.courier.email}`}</p>
      )}
      {isCourier && (
        <>
          {status === OrderStatus.CREATED && (
            <button
              className=' bg-green-400 text-white hover:bg-green-600 hover:text-white'
              onClick={() =>
                handleUpdateOrderStatus({
                  orderStatus: OrderStatus.IN_PROGRESS,
                  courierId: userId,
                })
              }
            >
              Pick up
            </button>
          )}
          {status === OrderStatus.IN_PROGRESS && userId === courier?.id && (
            <button
              className=' bg-green-400 text-white hover:bg-green-600 hover:text-white'
              onClick={() =>
                handleUpdateOrderStatus({ orderStatus: OrderStatus.COMPLETED })
              }
            >
              Mark as delivered
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default OrderCard
