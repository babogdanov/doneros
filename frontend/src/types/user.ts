/* General-use types */

export enum UserRole {
  USER = 'user',
  COURIER = 'courier',
  MANAGER = 'manager',
  ADMIN = 'admin',
}

export type User = {
  id: number
  email: string
  accessToken: string | null
  phoneNumber: string
  role: UserRole
}

/* API types */

export type EmailRequest = {
  email: string
}

export type LoginRequest = EmailRequest & {
  password: string
}

export type LoginResponse = User

export type SyncResponse = User

export type RegisterRequest = EmailRequest & {
  password: string
}

export type RegisterResponse = Omit<User, 'accessToken'>
