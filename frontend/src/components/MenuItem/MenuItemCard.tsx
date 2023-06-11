import { useNavigate } from 'react-router-dom'

import { MenuItem } from '../../types/menu-item'
// import useDeleteMenuItem from '../../api/hooks/menu-item/useDeleteMenuItem'
import useCartStore from '../../hooks/zustand/useCartStore'
import { toast } from 'react-toastify'
import useUser from '../../hooks/useUser'
import { UserRole } from '../../types/user'

type MenuItemProps = {
  menuItem: MenuItem
  addEnabled?: boolean
  removeEnabled?: boolean
}

const MenuItemCard = ({
  menuItem,
  addEnabled = false,
  removeEnabled = false,
}: MenuItemProps) => {
  const navigate = useNavigate()
  const { role } = useUser()
  const { id, name, description, pictureUrl } = menuItem
  // const { mutate: deleteMenuItem } = useDeleteMenuItem(`${id}`)

  const addToCart = useCartStore((state) => state.add)
  const removeFromCart = useCartStore((state) => state.remove)

  const handleAddToCart = () => {
    addToCart(menuItem)
    toast.success('Item added to cart successfully!')
  }

  const canModify = role === UserRole.ADMIN || role === UserRole.MANAGER

  return (
    <div className='m-5 mb-16 h-96 w-96 rounded-lg bg-white text-center font-sans shadow-lg'>
      <div className='h-1/6 w-full text-2xl'>{name}</div>
      <img className='h-full object-scale-down' src={pictureUrl} alt='' />
      <div className='h-1/6 w-full text-xl'>{description}</div>
      {addEnabled && (
        <button
          className='h-1/6 w-full bg-lime-500 font-semibold text-white hover:bg-lime-400 hover:text-white'
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      )}

      {canModify && (
        <button
          className='w-1/2 bg-orange-400 text-white hover:bg-orange-600 hover:text-white'
          onClick={() => navigate(`/edit-menu-item/${id}`)}
        >
          Edit
        </button>
      )}

      {removeEnabled && (
        <button
          className='w-1/2 bg-red-500 text-white hover:bg-red-600 hover:text-white'
          onClick={() => {
            removeFromCart(id)
            window.location.reload()
          }}
        >
          Delete
        </button>
      )}
    </div>
  )
}
export default MenuItemCard
