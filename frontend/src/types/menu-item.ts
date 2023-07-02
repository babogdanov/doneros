import { Restaurant } from './restaurant'

export type MenuItem = {
  id: number
  name: string
  description: string
  pictureUrl: string
  price: number
  restaurant: Restaurant
}

export type MenuItemEditable = Omit<MenuItem, 'id' | 'restaurant'>

export type MenuItemRequest = {
  name: string
  description: string
  pictureUrl: string
  price: number
}

export type MenuItemResponse = {
  menuItem: MenuItem
}

export type CreateMenuItemRequest = {
  name: string
  description: string
  pictureUrl: string
  price: number
  restaurantId: string
}
