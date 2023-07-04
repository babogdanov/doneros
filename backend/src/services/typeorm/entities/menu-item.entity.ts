import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
// eslint-disable-next-line import/no-cycle
import { Restaurant } from './restaurant.entity'
// eslint-disable-next-line import/no-cycle
import { Order } from './order.entity'

@Entity()
export class MenuItem extends BaseEntity {
  @Column()
  name: string

  @Column()
  description: string

  @Column()
  pictureUrl: string

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  price: number

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menuItems)
  restaurant: Restaurant

  @ManyToMany(() => Order)
  orders: Order[]
}
