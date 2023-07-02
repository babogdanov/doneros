import { useNavigate } from 'react-router-dom'

import { MenuItem } from '../../types/menu-item'
import useDeleteMenuItem from '../../api/hooks/menu-item/useDeleteMenuItem'
import useCartStore from '../../hooks/zustand/useCartStore'
import { toast } from 'react-toastify'

type MenuItemProps = {
  menuItem: MenuItem
  isManagerView?: boolean
}

const MenuItemCard = ({ menuItem, isManagerView = false }: MenuItemProps) => {
  const navigate = useNavigate()
  const { id, name, description, pictureUrl, price } = menuItem
  const { mutate: deleteMenuItem } = useDeleteMenuItem(`${id}`)

  const addToCart = useCartStore((state) => state.add)
  const removeFromCart = useCartStore((state) => state.remove)

  const handleAddToCart = () => {
    addToCart(menuItem)
    toast.success('Item added to cart successfully!')
  }

  return (
    <div className='m-5 mb-16 h-5/6 w-96 rounded-lg bg-white text-center font-sans shadow-lg'>
      <div className='h-1/6 w-full text-2xl'>{name}</div>
      <img className='h-full object-scale-down' src={pictureUrl} alt='' />
      <div className='h-10 w-full text-xl text-blue-500'>{price}</div>
      <div className='h-1/6 w-full text-xl'>{description}</div>
      {!isManagerView && (
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
      )}
    </div>
  )
}
export default MenuItemCard
