import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { IngredientEditable } from '../../../types/ingredient'

const initialState: IngredientEditable = {
  name: '',
  quantity: 0,
}

type IngredientFormProps = {
  initialData?: IngredientEditable
  handleSubmit: (data: IngredientEditable) => void
  submitLabel: string
}

const IngredientForm = ({
  initialData = initialState,
  handleSubmit,
  submitLabel,
}: IngredientFormProps) => {
  const [formData, setFormData] = useState(initialData)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, quantity } = formData



  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
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
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='name'
          >
            New product:
          </label>
          <input
            className='w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none'
            id='name'
            name='name'
            value={name}
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

export default IngredientForm
