import { In, MigrationInterface, getConnection } from 'typeorm'

import { User, UserRole } from '@entities/user.entity'
import { createInstance } from '@utils/class.utils'

const USER_DATA: Partial<User>[] = [
  { email: 'user@doneros.com', password: 'doneros', role: UserRole.USER },
  { email: 'courier@doneros.com', password: 'doneros', role: UserRole.COURIER },
  { email: 'manager@doneros.com', password: 'doneros', role: UserRole.MANAGER },
  { email: 'admin@doneros.com', password: 'doneros', role: UserRole.ADMIN },
]

export class usersWithRoles1687025332509 implements MigrationInterface {
  private connection = getConnection('seed')
  private userRepository = this.connection.getRepository(User)

  public async up(): Promise<void> {
    const TEST_USERS = USER_DATA.map((data) => createInstance(User, data))

    await this.userRepository.save(TEST_USERS)
  }

  public async down(): Promise<void> {
    const userEmails = USER_DATA.map((data) => data.email)

    const seededUsers = await this.userRepository.find({
      where: { email: In(userEmails) },
    })

    await this.userRepository.remove(seededUsers)
  }
}
