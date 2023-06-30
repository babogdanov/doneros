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
  price: 0
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
  const { name, description, pictureUrl, price } = formData

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
    //TODO: коментара е в useValidation
    // {
    //   input: formData.price,
    //   validationFunc: (input) => isValidUrl(input as number),
    //   errorMessage: ERROR.generic.priceRequried,
    // },
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
    <div className='flex h-fit items-center justify-center'>
      <form
        className='flex flex-col justify-center rounded bg-white px-6 py-4 shadow-md'
        onSubmit={onSubmit}
      >
        <div>
          <label className='block text-sm font-bold text-gray-700' htmlFor='name'>
            Name
          </label>
          <input
            className='w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none'
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
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='description'
          >
            Description
          </label>
          <textarea
            className='w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none'
            id='description'
            placeholder='Enter item description'
            name='description'
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='price'
          >
            Price
          </label>
          <input
            className='w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none'
            id='price'
            name='price'
            value={price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='pictureUrl'
          >
            Picture
          </label>
          <input
            className='w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none'
            id='pictureUrl'
            name='pictureUrl'
            value={pictureUrl}
            onChange={handleChange}
          />
        </div>
        <button
          className='rounded bg-orange-400 font-bold text-white hover:bg-orange-600 '
          type='submit'
        >
          {submitLabel}
        </button>
      </form>
    </div>
  )
}

export default MenuItemForm
