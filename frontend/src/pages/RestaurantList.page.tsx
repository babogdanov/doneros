import { Link } from 'react-router-dom'
import useRestaurants from '../api/hooks/restaurant/queries/useRestaurants'

const RestaurantList = () => {
  const { data, isLoading, isError } = useRestaurants()

  if (isLoading) {
    return <div>loading</div>
  } else if (isError) {
    return <div>Unable to load data.</div>
  }

  return (
    <ul>
      {data?.restaurants.map((restaurant, index) => (
        <Link to={`/restaurants/${index + 1}`} key={index}>
          <li key={index}> {restaurant.name} </li>
        </Link>
      ))}
    </ul>
  )
}

export default RestaurantList
