import { MenuItem } from './menu-item'
import { User } from './user'

export type Restaurant = {
  id: number
  name: string
  description: string
  address: string
  menuItems: MenuItem[]
  manager: User
}

export type GetRestaurantsResponse = {
  restaurants: Restaurant[]
}

export type RestaurantResponse = {
  restaurant: Restaurant
}

export type RestaurantRequest = Omit<Restaurant, 'id' | 'menuItems'>
