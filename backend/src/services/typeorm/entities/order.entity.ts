import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
// eslint-disable-next-line import/no-cycle
import { User } from './user.entity'
// eslint-disable-next-line import/no-cycle
import { Address } from './address.entity'

@Entity()
export class Order extends BaseEntity {
  @Column()
  paymentMethod: string

  @ManyToOne(() => Address, (address) => address.orders, {
    eager: true,
    nullable: true,
  })
  address: Address

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  price: number

  @ManyToOne(() => User, (user) => user.orders)
  user: User
}
