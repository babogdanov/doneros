import { ConfigService } from '@nestjs/config'
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm'

import { BaseEntity } from './base.entity'
import { User } from './user.entity' // eslint-disable-line

@Entity('reset_token')
export class ResetToken extends BaseEntity {
  @Column({ unique: true })
  token: string

  @Column()
  expiresAt: Date

  @OneToOne(() => User, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User

  @BeforeInsert()
  setExpiresAt() {
    this.expiresAt = new Date()
    const timeout = Number(
      new ConfigService().get('PASSWORD_RESET_TOKEN_EXPIRATION'),
    )
    this.expiresAt.setMinutes(this.expiresAt.getMinutes() + timeout)
  }
}
