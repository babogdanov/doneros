import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
// eslint-disable-next-line import/no-cycle
import { MenuItem } from './menu-item.entity'

@Entity()
export class Restaurant extends BaseEntity {
  @Column()
  name: string

  @Column()
  description: string

  @Column()
  address: string

  @OneToMany(() => MenuItem, (menuItem) => menuItem.restaurant, {
    eager: true
  })
  menuItems: MenuItem[]
}
