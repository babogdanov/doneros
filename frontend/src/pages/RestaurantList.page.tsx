import useRestaurants from '../api/hooks/restaurant/queries/useRestaurants'

const RestaurantList = () => {
  const { data, isLoading, isError, error, isSuccess } = useRestaurants()

  if (isLoading) {
    return <div>loading</div>
  }
  else if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  return <ul>{data?.restaurants.map(r => <li> {r.name} </li>)}</ul>
}

export default RestaurantList
