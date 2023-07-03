import AddressEntry from '../../components/Address/AddressEntry'
import useUser from '../../hooks/useUser'
import { UserRole } from '../../types/user'
import { useState } from 'react'
import Popup from '../../components/common/Popup'
import { CreateAddressRequest } from '../../types/address'
import useCreateAddress from '../../api/hooks/address/mutations/useCreateAddress'

const Profile = () => {
  const user = useUser()

  const { email, phoneNumber, role, addresses } = user
  const [isOpen, setIsOpen] = useState(false)

  const [formState, setFormState] = useState({
    city: '',
    street: '',
    number: '',
    postalCode: '',
  })

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const { mutate: createAddress } = useCreateAddress()

  const handleSubmit = async (data: CreateAddressRequest) => {
    createAddress(data)
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h3>Вашите данни</h3>
      <label>Имейл</label>
      <p>{email} </p>
      <label>Телефонен номер</label>
      <p>{phoneNumber} </p>
      <label>Роля</label>
      <p>{role} </p>
      {role === UserRole.USER && (
        <>
          <h5 className=' mb-0'>Вашите адреси:</h5>
          <div>
            {addresses.map((address) => (
              <AddressEntry key={address.id} address={address} />
            ))}
          </div>
          <button onClick={togglePopup}>Добави адрес</button>
        </>
      )}
      {isOpen && (
        <Popup
          context={
            <>
              <h4>Добавяне на адрес</h4>
              <input
                type='text'
                name='city'
                placeholder='Град'
                className='block w-full rounded-lg bg-gray-800 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500'
                value={formState.city}
                onChange={(event) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    city: event.target.value,
                  }))
                }
              />
              <input
                type='text'
                name='street'
                placeholder='Улица'
                className='block w-full rounded-lg bg-gray-800 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500'
                value={formState.street}
                onChange={(event) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    street: event.target.value,
                  }))
                }
              />
              <input
                type='text'
                name='number'
                placeholder='Номер'
                className='block w-full rounded-lg bg-gray-800 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500'
                value={formState.number}
                onChange={(event) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    number: event.target.value,
                  }))
                }
              />
              <input
                type='text'
                name='postalCode'
                placeholder='Пощенски код'
                className='block w-full rounded-lg bg-gray-800 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500'
                value={formState.postalCode}
                onChange={(event) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    postalCode: event.target.value,
                  }))
                }
              />
              <button
                onClick={() => {
                  handleSubmit({
                    userId: user.id,
                    city: formState.city,
                    street: formState.street,
                    number: +formState.number,
                    postalCode: +formState.postalCode,
                  })
                  togglePopup()
                }}
              >
                Добави
              </button>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  )
}

export default Profile
