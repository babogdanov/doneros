import { User } from './user'

export type Order = {
  id: number
  paymentMethod: string
  address: string
  price: number
  user: User
}

export type OrderResponse = {
  order: Order
}

export type CreateOrderRequest = {
  paymentMethod: string
  addressId: number
  price: number
  userId: number
}
