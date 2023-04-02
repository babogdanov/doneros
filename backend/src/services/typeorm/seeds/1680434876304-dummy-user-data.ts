import { User } from '@entities/user.entity'
import { createInstance } from 'src/utils/class.utils'
import { getConnection, In, MigrationInterface } from 'typeorm'

const TEST_USER_DATA = [
  { email: 'dummy@gmail.com', password: 'doneros' },
  { email: 'bummy@yahoo.com', password: 'doneros' },
]
export class dummyUserData1680434876304 implements MigrationInterface {
  private connection = getConnection('seed')
  private userRepository = this.connection.getRepository(User)

  public async up(): Promise<void> {
    const TEST_USERS = TEST_USER_DATA.map((data) => createInstance(User, data))

    await this.userRepository.save(TEST_USERS)
  }

  public async down(): Promise<void> {
    const userEmails = TEST_USER_DATA.map((data) => data.email)

    const seededUsers = await this.userRepository.find({
      where: { email: In(userEmails) },
    })

    await this.userRepository.remove(seededUsers)
  }
}
