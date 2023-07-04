import { MenuItem } from './menu-item'
import { User } from './user'

export enum OrderStatus {
  CREATED = 'created',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

export type Order = {
  id: number
  paymentMethod: string
  address: string
  price: number
  user: User
  menuItems: MenuItem[]
  status: OrderStatus
  courier: User
}

export type OrderResponse = {
  order: Order
}

export type GetOrdersResponse = {
  orders: Order[]
}

export type CreateOrderRequest = {
  paymentMethod: string
  addressId: number
  price: number
  userId: number
  menuItemIds: number[]
}

export type UpdateOrderStatusRequest = {
  id: number
  status: OrderStatus
  courierId?: number
}

export type GetCourierLocationResponse = {
  courierId: number
  location: {
    latitude: number
    longitude: number
  }
}

export type UpdateCourierLocationRequest = GetCourierLocationResponse

export type UpdateCourierLocationResponse = GetCourierLocationResponse

export type UpdateOrderStatusResponse = Order
