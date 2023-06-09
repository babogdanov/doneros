import { Address } from './address'

/* General-use types */

import { Level } from './level'
import { UserCoupons } from './user-coupons'

export enum UserRole {
  USER = 'user',
  MANAGER = 'manager',
  ADMIN = 'admin',
}

export type User = {
  id: number
  email: string
  accessToken: string | null
  phoneNumber: string
  role: UserRole
  points: number
  level: Level
  coupons: UserCoupons
  addresses: Address[]
  isCourier: boolean
}

/* API types */

export type EmailRequest = {
  email: string
}

export type LoginRequest = EmailRequest & {
  password: string
  isCourier: boolean
}

export type LoginResponse = User

export type SyncResponse = User

export type RegisterRequest = EmailRequest & {
  password: string
}

export type RegisterResponse = Omit<User, 'accessToken'>
