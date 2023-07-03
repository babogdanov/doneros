import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
// eslint-disable-next-line import/no-cycle
import { User } from './user.entity'
// eslint-disable-next-line import/no-cycle
import { Order } from './order.entity'

@Entity()
export class Address extends BaseEntity {
  @Column()
  city: string

  @Column()
  street: string

  @Column()
  number: number

  @Column()
  postalCode: number

  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  user: User

  @OneToMany(() => Order, (order) => order.address)
  orders: Order[]
}
