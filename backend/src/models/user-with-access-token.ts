import { UserWithoutPassword } from './user-without-password'

export type UserWithAccessToken = UserWithoutPassword & { accessToken: string }
