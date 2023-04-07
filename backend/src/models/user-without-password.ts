import { User } from '@entities/user.entity'

type RemovedUserProperties =
  | 'hashPassword'
  | 'hasId'
  | 'save'
  | 'remove'
  | 'softRemove'
  | 'recover'
  | 'reload'
  | 'password'

export type UserWithoutPassword = Omit<User, RemovedUserProperties>
