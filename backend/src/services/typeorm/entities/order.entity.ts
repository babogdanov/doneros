import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { BaseEntity } from './base.entity'
// eslint-disable-next-line import/no-cycle
import { User } from './user.entity'
// eslint-disable-next-line import/no-cycle
import { Address } from './address.entity'
// eslint-disable-next-line import/no-cycle
import { MenuItem } from './menu-item.entity'
// eslint-disable-next-line import/no-cycle
import { Courier } from './courier.entity'

export enum OrderStatus {
  CREATED = 'created',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

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

  @ManyToOne(() => Courier, (courier) => courier.orders)
  courier: Courier

  @ManyToMany(() => MenuItem, { eager: true, cascade: true })
  @JoinTable()
  menuItems: MenuItem[]

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status: OrderStatus
}
