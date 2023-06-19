import { Link } from 'react-router-dom'
import useRestaurants from '../../api/hooks/restaurant/queries/useRestaurants'

type RestaurantListProps = {
  linkPrefix: string
}
const RestaurantList = ({ linkPrefix }: RestaurantListProps) => {
  const { data, isLoading, isError } = useRestaurants()

  if (isLoading) {
    return <div>loading</div>
  } else if (isError) {
    return <div>Unable to load data.</div>
  }

  return (
    <ul>
      {data?.restaurants.map((restaurant, index) => (
        <Link key={index} to={`${linkPrefix}/${restaurant.id}`}>
          <li> {restaurant.name} </li>
        </Link>
      ))}
    </ul>
  )
}

export default RestaurantList
