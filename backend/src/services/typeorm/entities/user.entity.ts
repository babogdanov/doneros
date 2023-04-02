import { Entity, Column } from 'typeorm'
import { BaseEntity } from './base.entity'

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
}
