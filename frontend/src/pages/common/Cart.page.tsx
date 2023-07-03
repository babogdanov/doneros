import MenuItemCard from '../../components/MenuItem/MenuItemCard'
import useUser from '../../hooks/useUser'
import useCartStore from '../../hooks/zustand/useCartStore'
import { UserRole } from '../../types/user'
import { useEffect, useState } from 'react'
import Popup from '../../components/common/Popup'
import { CreateOrderRequest } from '../../types/order'
import useCreateOrder from '../../api/hooks/order/mutations/useCreateOrder'
import { Address } from '../../types/address'

const getFormattedAddress = (address: Address) => {
  return `${address.city}, ${address.street}, ${address.number}, ${address.postalCode}`
}

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

  console.log(user.addresses)

  const defaultAddress = user.addresses[0]
  const [formState, setFormState] = useState({
    paymentMethod: 'card',
    addressId: defaultAddress.id,
    price: '',
  })

  const handleSubmit = async (data: CreateOrderRequest) => {
    create({ ...data, userId: user.id })
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
                <div className='w-1/3'>
                  <div className=''>Избери адрес за доставка:</div>
                  <select
                    onChange={(event) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        addressId: +event.target.value,
                      }))
                    }
                  >
                    {user.addresses.map((address, index) => (
                      <option key={index} value={address.id}>
                        {getFormattedAddress(address)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='w-1/3'>
                  <div>Избери начин на плащане:</div>
                  <select
                    onChange={(event) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        paymentMethod: event.target.value,
                      }))
                    }
                  >
                    <option key={1} value={'card'}>
                      Плащане с карта
                    </option>
                    <option key={2} value={'cash'}>
                      Наложен платеж
                    </option>
                  </select>
                </div>
              </div>
              <button
                onClick={() =>
                  handleSubmit({
                    paymentMethod: formState.paymentMethod,
                    addressId: formState.addressId,
                    price: +price,
                    userId: user.id,
                  })
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
