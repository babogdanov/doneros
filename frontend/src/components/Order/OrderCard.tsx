import useUpdateOrder from '../../api/hooks/order/mutations/useUpdateOrder'
import useUser from '../../hooks/useUser'
import { Order, OrderStatus } from '../../types/order'

type OrderCardProps = {
  order: Order
}

/* const getButtonPropsFromStatus = (status: OrderStatus) => {
  switch(orderStatus) {

  }
} */
const OrderCard = ({ order }: OrderCardProps) => {
  const { id: userId } = useUser()
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
      {/* {!isManagerView && (
        <>
          <button
            className='h-1/6 w-full bg-lime-500 font-semibold text-white hover:bg-lime-400 hover:text-white'
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <button
            className='w-full bg-red-500 text-white hover:bg-red-600 hover:text-white'
            onClick={() => {
              removeFromCart(id)
              window.location.reload()
            }}
          >
            Remove from cart
          </button>
        </>
      )}

      {isManagerView && (
        <>
          <button
            className='w-1/2 bg-orange-400 text-white hover:bg-orange-600 hover:text-white'
            onClick={() => navigate(`/manager/edit-menu-item/${id}`)}
          >
            Edit
          </button>

          <button
            className='w-1/2 bg-red-500 text-white hover:bg-red-600 hover:text-white'
            onClick={() => deleteMenuItem()}
          >
            Delete
          </button>
        </>
      )} */}
    </div>
  )
}

export default OrderCard
