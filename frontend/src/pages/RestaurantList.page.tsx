import { useQuery } from '@tanstack/react-query'
import fetchApi from '../api/fetch-api'
import useRestaurants from '../api/hooks/queries/restaurant/useRestaurants'

const RestaurantList = () => {
  const { data, isLoading, isError, error } = useRestaurants()

  if (isLoading) {
    return <div>loading</div>
  }

  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  return <ul>{data.restaurants.map(r => <li> {r.name} </li>)}</ul>
}

export default RestaurantList
