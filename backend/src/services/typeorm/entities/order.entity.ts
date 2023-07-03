import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
// eslint-disable-next-line import/no-cycle
import { User } from './user.entity'

@Entity()
export class Order extends BaseEntity {
  @Column()
  paymentMethod: string

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  price: number

  @ManyToOne(() => User, (user) => user.orders)
  user: User
}
