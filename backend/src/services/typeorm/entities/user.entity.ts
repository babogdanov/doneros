import * as bcrypt from 'bcrypt'
import { Entity, Column, OneToOne, BeforeInsert, BeforeUpdate } from 'typeorm'

import { BaseEntity } from './base.entity'
import { ResetToken } from './reset-token.entity' // eslint-disable-line

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
