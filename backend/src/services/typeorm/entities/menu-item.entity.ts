import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Restaurant } from './restaurant.entity'

@Entity()
export class MenuItem extends BaseEntity {
  @Column()
  name: string

  @Column()
  description: string

  @Column()
  pictureUrl: string

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menuItems)
  restaurant: Restaurant
}
