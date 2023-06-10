import { MenuItem } from './menu-item'

export type Restaurant = {
  id: number
  name: string
  description: string
  address: string
  menuItems: MenuItem[]
}

export type GetRestaurantsResponse = {
  restaurants: Restaurant[]
}

export type RestaurantResponse = {
  restaurant: Restaurant
}

export type RestaurantRequest = Omit<Restaurant, 'id' | 'menuItems'>
