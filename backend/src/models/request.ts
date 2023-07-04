import type { Request as ExpressRequest } from 'express'

import {
  CourierWithoutPassword,
  UserWithoutPassword,
} from './user-without-password'

export interface Request extends ExpressRequest {
  user: UserWithoutPassword | CourierWithoutPassword
}
