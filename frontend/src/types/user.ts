/* General-use types */

export type User = {
  id: number
  email: string
  accessToken: string | null
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
