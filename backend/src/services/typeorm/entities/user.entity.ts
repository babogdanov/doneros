/* eslint-disable import/no-cycle */
import * as bcrypt from 'bcrypt'
import {
  Entity,
  Column,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm'

import { BaseEntity } from './base.entity'
import { ResetToken } from './reset-token.entity' // eslint-disable-line
import { Order } from './order.entity'
import { UserCoupons } from './user-coupons.entity'
import { Level } from './level.entity'
import { Address } from './address.entity'

export enum UserRole {
  USER = 'user',
  COURIER = 'courier',
  MANAGER = 'manager',
  ADMIN = 'admin',
}

@Entity('users', {
  orderBy: {
    id: 'ASC',
  },
})
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: false, default: '' })
  phoneNumber: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

  @OneToOne(() => UserCoupons, (userCoupons) => userCoupons.user)
  @JoinColumn()
  coupons: UserCoupons

  @ManyToOne(() => Level, (level) => level.id, { eager: true })
  level: Level

  @Column({ default: 0 })
  points: number

  @OneToMany(() => Address, (address) => address.user, {
    eager: true,
  })
  addresses: Address[]

  @OneToOne(() => ResetToken)
  resetToken: ResetToken

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(this.password, salt)
    this.password = hashedPassword
  }
}
