import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
// eslint-disable-next-line import/no-cycle
import { Restaurant } from './restaurant.entity'

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
}
