import { Entity, Column, OneToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
// eslint-disable-next-line import/no-cycle
import { User } from './user.entity'

@Entity()
export class UserCoupons extends BaseEntity {
  @Column()
  freeDelivery: number

  @Column()
  tenPercentOff: number

  @Column()
  twentyPercentOff: number

  @Column()
  thirtyPercentOff: number

  @Column()
  fiftyPercentOff: number

  @OneToOne(() => User, (user) => user.id)
  user: User
}
