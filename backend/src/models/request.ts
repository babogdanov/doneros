import type { Request as ExpressRequest } from 'express'

import { UserWithoutPassword } from './user-without-password'

export interface Request extends ExpressRequest {
  user: UserWithoutPassword
}
