import { useState } from 'react'
import useDeleteIngredient from '../../api/hooks/ingredient/useDeleteIngredient'
import { Ingredient } from '../../types/ingredient'
import useEditIngredient from '../../api/hooks/ingredient/useEditIngredient'

type IngredientProps = {
  ingredient: Ingredient
}

const StorageIngredient = ({ ingredient }: IngredientProps) => {
  const { id, name, quantity } = ingredient

  const { mutate: deleteIngredient } = useDeleteIngredient(`${id}`)
  const { mutate: updateIngredient } = useEditIngredient(`${id}`)

  const [showInputFields, setShowInputFields] = useState(false)
  const [newName, setNewName] = useState(name)
  const [newQuantity, setNewQuantity] = useState(quantity)
  const [buttonLabel, setButtonLabel] = useState('Обнови')

  const handleButtonClick = () => {
    if (showInputFields) {
      setButtonLabel('Обнови')
      setShowInputFields(false)
      updateIngredient({ name: newName, quantity: newQuantity })
    } else {
      setButtonLabel('Запази')
      setShowInputFields(true)
    }
  }

  return (
    <div className='m-5 mb-16 h-5/6 w-96 rounded-lg bg-white text-center font-sans shadow-lg'>
      <div className='h-1/6 w-full text-2xl'>Продукт: {name}</div>
      <div className='h-10 w-full text-xl text-blue-500'>Количество: {quantity}</div>
      {showInputFields && (
        <div className='mt-2 flex flex-col items-start'>
          <label htmlFor='name' className='text-sm font-medium text-gray-600'>
            Ново име:
          </label>
          <input
            id='name'
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className='mb-2 mt-1 w-full rounded border border-gray-300 px-2 py-1'
          />
          <label htmlFor='quantity' className='text-sm font-medium text-gray-600'>
            Ново количество:
          </label>
          <input
            id='quantity'
            type='number'
            value={newQuantity}
            onChange={(e) => setNewQuantity(parseInt(e.target.value))}
            className='mb-4 w-full rounded border border-gray-300 px-2 py-1'
          />
        </div>
      )}
      <button
        className='w-full bg-red-500 text-white hover:bg-red-600 hover:text-white'
        onClick={() => {
          deleteIngredient()
        }}
      >
        Премахни
      </button>
      <button className='mt-2 w-full bg-green-500' onClick={handleButtonClick}>
        {buttonLabel}
      </button>
    </div>
  )
}

export default StorageIngredient
