import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { MenuItemEditable } from '../../types/menu-item'
import useValidation from '../../hooks/useValidation'
import { ERROR } from '../../utils/error-message.constants'
import { toast } from 'react-toastify'
import isValidUrl from '../../utils/url.utils'

const initialState: MenuItemEditable = {
  name: '',
  description: '',
  pictureUrl: '',
}

type MenuItemFormProps = {
  initialData?: MenuItemEditable
  handleSubmit: (data: MenuItemEditable) => void
  submitLabel: string
}

const MenuItemForm = ({
  initialData = initialState,
  handleSubmit,
  submitLabel,
}: MenuItemFormProps) => {
  const [formData, setFormData] = useState(initialData)
  const { name, description, pictureUrl } = formData

  const [isValid, errorMessage] = useValidation([
    {
      input: formData.name,
      validationFunc: (input) => input.length > 0,
      errorMessage: ERROR.menuItem.nameRequired,
    },
    {
      input: formData.description,
      validationFunc: (input) => input.length >= 10,
      errorMessage: ERROR.menuItem.descriptionRequired(10),
    },
    {
      input: formData.pictureUrl,
      validationFunc: (input) => isValidUrl(input as string),
      errorMessage: ERROR.generic.pictureUrlRequried,
    },
  ])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isValid) {
      toast.error(errorMessage)
      return
    }

    handleSubmit(formData)
  }

  useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  return (
    <div className='flex justify-center items-center h-fit'>
      <form
        className='flex flex-col justify-center bg-white shadow-md rounded px-6 py-4'
        onSubmit={onSubmit}
      >
        <div>
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
        <div>
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
        <div>
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
        <button
          className='bg-orange-400 hover:bg-orange-600 text-white font-bold rounded '
          type='submit'
        >
          {submitLabel}
        </button>
      </form>
    </div>
  )
}

export default MenuItemForm
