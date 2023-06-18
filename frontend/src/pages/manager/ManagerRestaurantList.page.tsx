import RestaurantList from '../../components/common/RestaurantList'

const ManagerRestaurantList = () => {
  //TODO: call  <backend>/restaurants/manager/:id to get the exact restaurant for this manager
  return <RestaurantList linkPrefix='/manager/restaurants' />
}

export default ManagerRestaurantList
