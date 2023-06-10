import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MenuItem } from '../types/menu-item'
import useCreateMenuItem from '../api/hooks/menu-item/useCreateMenuItem'
import useRestaurant from '../api/hooks/restaurant/queries/useRestaurant'
import LoadingSpinner from '../components/common/LoadingSpinner'

const RestaurantMenuCreate = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { mutate: create } = useCreateMenuItem()
  const { data, isLoading, isError, error } = useRestaurant(id!)

  const [menuItem, setMenuItem] = useState<Omit<MenuItem, 'restaurant'>>({
    id: 0,
    name: '',
    description: '',
    pictureUrl: '',
})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setMenuItem((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const restaurant = data?.restaurant
    await create({ ...menuItem, restaurant })
    navigate(`/restaurants/${id}`)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <div>{error}</div>
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
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='pictureUrl'>
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
            className='bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default RestaurantMenuCreate
