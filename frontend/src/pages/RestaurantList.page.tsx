import useRestaurants from '../api/hooks/restaurant/queries/useRestaurants'

const RestaurantList = () => {
  const { data, isLoading, isError, error } = useRestaurants()

  if (isLoading) {
    return <div>loading</div>
  } else if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  return (
    <ul>
      {data?.restaurants.map((restaurant, index) => (
        <li key={index}> {restaurant.name} </li>
      ))}
    </ul>
  )
}

export default RestaurantList
