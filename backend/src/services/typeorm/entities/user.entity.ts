import * as bcrypt from 'bcrypt'
import {
  Entity,
  Column,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm'

import { BaseEntity } from './base.entity'
import { ResetToken } from './reset-token.entity' // eslint-disable-line
// eslint-disable-next-line import/no-cycle
import { Order } from './order.entity'
// eslint-disable-next-line import/no-cycle
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

  @OneToOne(() => ResetToken)
  resetToken: ResetToken

  @OneToMany(() => Address, (address) => address.user, {
    eager: true,
  })
  addresses: Address[]

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(this.password, salt)
    this.password = hashedPassword
  }
}
