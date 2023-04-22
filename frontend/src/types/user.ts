/** General-use types */
export interface User {
  id: number
  email: string
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
}

/** API types */
export interface LoginResponse {
  user: User
  accessToken: string
}

export interface EmailRequest {
  email: string
}

export interface LoginRequest extends EmailRequest {
  password: string
}

export interface RegisterResponse {
  user: User
}

export interface RegisterRequest extends EmailRequest {
  password: string
}
