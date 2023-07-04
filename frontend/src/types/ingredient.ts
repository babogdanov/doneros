import { Restaurant } from './restaurant'

export type Ingredient = {
  id: number
  name: string
  quantity: number
  restaurant: Restaurant
}

export type IngredientEditable = Omit<Ingredient, 'id' | 'restaurant'>

export type IngredientRequest = {
  name: string
  quantity: number
}

export type IngredientResponse = {
  ingredient: Ingredient
}

export type IngredientsResponse = {
  ingredients: Ingredient[]
}

export type CreateIngredientRequest = {
  name: string
  quantity: number
  restaurantId?: string
}
