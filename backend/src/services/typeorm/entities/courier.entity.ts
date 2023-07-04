/* eslint-disable import/no-cycle */
import * as bcrypt from 'bcrypt'
import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm'

import { BaseEntity } from './base.entity'
import { Order } from './order.entity'

@Entity('courier', {
  orderBy: {
    id: 'ASC',
  },
})
export class Courier extends BaseEntity {
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: false, default: '' })
  phoneNumber: string

  @OneToMany(() => Order, (order) => order.courier)
  orders: Order[]

  @Column({ default: true })
  isCourier: boolean

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(this.password, salt)
    this.password = hashedPassword
  }
}
