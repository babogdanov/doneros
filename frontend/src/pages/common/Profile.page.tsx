import MenuItemCard from '../../components/MenuItem/MenuItemCard'
import AddressEntry from '../../components/Address/AddressEntry'
import useUser from '../../hooks/useUser'
import useCartStore from '../../hooks/zustand/useCartStore'
import { UserRole } from '../../types/user'

const Profile = () => {
  const user = useUser()

  const { email, phoneNumber, role, addresses } = user
  const cart = useCartStore((state) => state.cart)

  return (
    <div className='flex flex-col items-center justify-center'>
      <h3>Your data</h3>
      <label>Email</label>
      <p>{email} </p>
      <label>Phone number</label>
      <p>{phoneNumber} </p>
      <label>Role</label>
      <p>{role} </p>
      {role === UserRole.USER && (
        <>
          <h5 className=' mb-0'>Your addresses:</h5>
          <div>
            {addresses.map((address) => (
              <AddressEntry key={address.id} address={address} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Profile
