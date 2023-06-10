import { Restaurant } from './restaurant'

export type MenuItem = {
    id: number,
    name: string,
    description: string,
    pictureUrl: string,
    restaurant: Restaurant
}

export type MenuItemRequest = {
    name: string,
    description: string,
    pictureUrl: string
} 

export type MenuItemResponse = {
    menuItem: MenuItem
}

export type CreateMenuItemRequest = {
    name: string,
    description: string,
    pictureUrl: string,
    restaurant: Restaurant | undefined
}