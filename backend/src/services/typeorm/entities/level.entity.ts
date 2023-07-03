import { Entity, Column, OneToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
// eslint-disable-next-line import/no-cycle
import { User } from './user.entity'

@Entity()
export class Level extends BaseEntity {
  @Column()
  name: string

  @Column()
  points: number

  @OneToOne(() => User, (user) => user.level)
  userLevel: User
}
