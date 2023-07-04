import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
// eslint-disable-next-line import/no-cycle
import { Restaurant } from './restaurant.entity'

@Entity()
export class Ingredient extends BaseEntity {
  @Column()
  name: string

  @Column({ type: 'numeric', scale: 3, default: 0 })
  quantity: number

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.Ingredients)
  restaurant: Restaurant
}
