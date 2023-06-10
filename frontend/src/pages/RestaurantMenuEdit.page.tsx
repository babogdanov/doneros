import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MenuItem } from '../types/menu-item'
import useMenuItem from '../api/hooks/menu-item/useMenuItem'
import LoadingSpinner from '../components/common/LoadingSpinner'
import useEditMenuItem from '../api/hooks/menu-item/useEditMenuItem'

const RestaurantMenuEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoading, isError, error, data } = useMenuItem(id!)
  const { mutate: edit } = useEditMenuItem(id!)
  const initialMenuItem: Omit<MenuItem, 'restaurant'> = {
    id: +id!,
    name: '',
    description: '',
    pictureUrl: '',
  }
  const [menuItem, setMenuItem] = useState<Omit<MenuItem, 'restaurant'>>(
    data?.menuItem ?? initialMenuItem,
  )

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setMenuItem(data.menuItem)
    }
  }, [isLoading, isError, data])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setMenuItem((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await edit(menuItem)
    navigate(`/restaurants/${data?.menuItem.restaurant.id}`)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  const { description, name, pictureUrl } = menuItem
  return (
    <div className='flex justify-center items-center h-fit'>
      <form className='bg-white shadow-md rounded px-6 py-4' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold' htmlFor='name'>
            Name
          </label>
          <input
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            type='text'
            placeholder='Enter item name'
            name='name'
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='description'
          >
            Description
          </label>
          <textarea
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='description'
            placeholder='Enter item description'
            name='description'
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='pictureUrl'
          >
            Picture
          </label>
          <input
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='pictureUrl'
            name='pictureUrl'
            value={pictureUrl}
            onChange={handleChange}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  )
}

export default RestaurantMenuEdit
