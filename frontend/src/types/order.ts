import { User } from './user'

export type Order = {
  id: number
  paymentMethod: string
  price: number
  user: User
}

export type OrderRequest = {
  paymentMethod: string
  price: number
}

export type OrderResponse = {
  order: Order
}

export type CreateOrderRequest = {
  paymentMethod: string
  price: number
  userId: number
}
