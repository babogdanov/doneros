import MenuItemCard from '../../components/MenuItem/MenuItemCard'
import useUser from '../../hooks/useUser'
import useCartStore from '../../hooks/zustand/useCartStore'
import { UserRole } from '../../types/user'

const Profile = () => {
  const user = useUser()

  const { email, phoneNumber, role } = user
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
          <h3> Your cart: </h3>
          <div className='flex'>
            {cart.map((menuItem) => (
              <MenuItemCard key={menuItem.id} menuItem={menuItem} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Profile