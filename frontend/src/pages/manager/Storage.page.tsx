import useCreateIngredient from '../../api/hooks/ingredient/useCreateIngredient'
import { useParams } from 'react-router-dom'
import { IngredientRequest } from '../../types/ingredient'
import useGetRestaurantIngredients from '../../api/hooks/ingredient/useIngredients'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import IngredientForm from '../../components/Restaurant/Storage/IngredientForm'
import StorageIngredient from '../../components/Restaurant/StorageIngredient'

const Storage = () => {
  const { id: restaurantId } = useParams()
  const { mutate: create } = useCreateIngredient()

  if (!restaurantId) {
    return <div> Not found. </div>
  }

  const { isLoading, isError, data } = useGetRestaurantIngredients(restaurantId)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <div>Unable to load initial data.</div>
  }

  const handleSubmit = async (data: IngredientRequest) => {
    create({ ...data, restaurantId })
    window.location.reload()
  }

  return (
    <>
      <div className='flex flex-col'>
        <IngredientForm handleSubmit={handleSubmit} submitLabel='Добавяне' />
        {data.ingredients.map((item) => (
          <StorageIngredient key={item.id} ingredient={item} />
        ))}
      </div>
    </>
  )
}

export default Storage
