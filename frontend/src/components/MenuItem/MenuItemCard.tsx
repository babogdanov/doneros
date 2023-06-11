import { useNavigate } from 'react-router-dom'
import { MenuItem } from '../../types/menu-item'
import useDeleteMenuItem from '../../api/hooks/menu-item/useDeleteMenuItem'

type MenuItemProps = {
  menuItem: MenuItem
}

const MenuItemCard = ({ menuItem }: MenuItemProps) => {
  const { id, name, description, pictureUrl } = menuItem
  const { mutate: deleteMenuItem } = useDeleteMenuItem(`${id}`)
  const navigate = useNavigate()

  return (
    <div className='bg-white shadow-lg rounded-lg w-96 m-5 mb-16 font-sans text-center'>
      <div className='w-full h-1/6 text-2xl'>{name}</div>
      <img className='w-full h-3/6' src={pictureUrl} alt='' />
      <div className='w-full h-1/6 text-base'>{description}</div>
      <button className='w-full h-1/6 bg-lime-500 hover:bg-lime-400 text-white font-semibold hover:text-white'>
        Изберете
      </button>
      <button
        className='w-1/2 bg-orange-400 hover:bg-orange-600 text-white hover:text-white'
        onClick={() => navigate(`/edit-menu-item/${id}`)}
      >
        Редакция
      </button>
      <button
        className='w-1/2 bg-red-500 hover:bg-red-600 text-white hover:text-white'
        onClick={() => {
          deleteMenuItem(undefined)
          window.location.reload()
        }}
      >
        Изтриване
      </button>
    </div>
  )
}
export default MenuItemCard
