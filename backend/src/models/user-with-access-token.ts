import {
  CourierWithoutPassword,
  UserWithoutPassword,
} from './user-without-password'

export type UserWithAccessToken = (
  | UserWithoutPassword
  | CourierWithoutPassword
) & { accessToken: string }
