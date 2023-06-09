/* eslint-disable import/no-cycle */
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { MenuItem } from './menu-item.entity'
import { User } from './user.entity'
import { Ingredient } from './ingredients.entity'

@Entity()
export class Restaurant extends BaseEntity {
  @Column()
  name: string

  @Column()
  description: string

  @Column()
  address: string

  @OneToMany(() => MenuItem, (menuItem) => menuItem.restaurant, {
    eager: true,
  })
  menuItems: MenuItem[]

  @OneToMany(() => Ingredient, (ingredient) => ingredient.restaurant, {
    eager: true,
  })
  Ingredients: Ingredient[]

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  manager: User
}
