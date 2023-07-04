import { useState } from 'react'

import useCreateOrder from '../../api/hooks/order/mutations/useCreateOrder'
import useUser from '../../hooks/useUser'
import useCartStore from '../../hooks/zustand/useCartStore'
import MenuItemCard from '../../components/MenuItem/MenuItemCard'
import Popup from '../../components/common/Popup'
import { UserRole } from '../../types/user'
import { CreateOrderRequest } from '../../types/order'
import { Address } from '../../types/address'

type FormState = {
  paymentMethod: string
  addressId: number
}

const getFormattedAddress = (address: Address) => {
  return `${address.city}, ${address.street}, ${address.number}, ${address.postalCode}`
}

const Cart = () => {
  const user = useUser()
  const cart = useCartStore((state) => state.cart)

  const [isOpen, setIsOpen] = useState(false)
  const defaultAddress = user.addresses[0]

  const [formState, setFormState] = useState<FormState>({
    paymentMethod: 'card',
    addressId: defaultAddress.id,
  })

  const { mutate: create } = useCreateOrder()

  const menuItemIds = cart.map((menuItem) => menuItem.id)
  const price = cart.reduce((sum, item) => +sum + +item.price, 0)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmit = async () => {
    const payload: CreateOrderRequest = {
      ...formState,
      price,
      userId: user.id,
      menuItemIds,
    }
    create(payload)
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
              <button onClick={handleSubmit}>Завърши поръчка</button>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  )
}

export default Cart
