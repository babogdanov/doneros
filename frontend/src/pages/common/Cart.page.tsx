import MenuItemCard from '../../components/MenuItem/MenuItemCard'
import useUser from '../../hooks/useUser'
import useCartStore from '../../hooks/zustand/useCartStore'
import { UserRole } from '../../types/user'
import { useEffect, useState } from 'react'
import Popup from '../../components/common/Popup'
import { CreateOrderRequest } from '../../types/order'
import useCreateOrder from '../../api/hooks/order/mutations/useCreateOrder'

const Cart = () => {
  const user = useUser()
  const cart = useCartStore((state) => state.cart)
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: create } = useCreateOrder()
  const [price, setPrice] = useState(0)

  useEffect(() => {
    setPrice(cart.reduce((sum, item) => +sum + +item.price, 0))
  }, [cart])

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmit = async (data: CreateOrderRequest) => {
    create({ ...data })
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      {user.role === UserRole.USER && (
        <>
          <h3> Your cart: </h3>
          <div className='flex'>
            {cart.map((menuItem, index) => (
              <MenuItemCard key={index} menuItem={menuItem} />
            ))}
          </div>
          <div className='flex flex-col'>
            <h3> Total price: {price}</h3>
          </div>
          <button className='h-20 w-56' onClick={togglePopup}>
            Order now
          </button>
        </>
      )}
      {isOpen && (
        <Popup
          context={
            <>
              <h4>Завърши поръката</h4>
              <div>
                {cart.map((menuItem, index) => (
                  <div className='flex' key={index}>
                    <div className='w-1/3'>{menuItem.name}</div>
                    <div className='w-2/3'>{menuItem.price}</div>
                  </div>
                ))}
              </div>
              <h5>Крайна цена: {price}</h5>
              <div className='flex'>
                <div className='w-1/3'>Избери адрес за доставка</div>
                <div className='w-1/3'>Избери начин на плащане</div>
                <div className='w-1/3'>Очакван час на доставка:</div>
              </div>
              <button
                onClick={() =>
                  handleSubmit({ paymentMethod: 'card', price: price, userId: user.id })
                }
              >
                Завърши поръчка
              </button>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  )
}

export default Cart
